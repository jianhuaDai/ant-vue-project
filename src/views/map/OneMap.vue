<template>
  <mask-page-view>
    <div class="map">
      <mapbox-view ref="map" :options="mapOptions" @mapLoaded="mapLoaded" :background-color="'rgba(207, 229, 246, 1)'"></mapbox-view>
      <div class="nav-map" v-show="ready">
        <div
          @click="nav(item.id)"
          :class="['nav-map-item',item.id===layerManager.currentNav?'active':'']"
          :key="item.id"
          v-for="item in baseData.navs">
          <a-icon :component="item.icon" v-show="item.id!==layerManager.currentNav"></a-icon>
          <a-icon :component="item.iconSelected" v-show="item.id===layerManager.currentNav"></a-icon>
          <span class="title">{{ item.title }}</span>
          <div class="line"></div>
        </div>
      </div>
      <div :class="['panel-info',showInfoPanel?'panel-show':'']">
        <div class="panel-content">
          <!--          <div v-show="currentNav===1">-->
          <div class="layer-control">
            <div
              :key="item.id"
              @click="layerRadioHandle(item)"
              v-for="item in baseData.layerItems[layerManager.currentNav]"
              :class="['layer-btn',layerManager.activeLayerItem.id===item.id?'active':'']">
              <span style="margin-right: 6px">{{ item.name }}</span>
              <a-checkbox
                :checked="layerManager.visibleLayerIds.includes(item.id)"
                @click="layerCheckboxHandle($event,item)"></a-checkbox>
            </div>
          </div>
          <!--        </div>-->
          <div class="info-area" v-show="layerManager.activeLayerItem.id!==0" style="margin: 10px 0">
            <div style="font-weight: 500;margin: 15px 0">{{ layerManager.activeLayerItem.name }}</div>
            <a-input-search placeholder="请输入搜索内容" style="width: 240px;margin-bottom: 24px" @search="()=>{}"/>
            <a-table
              v-show="tableList.columns.length>0"
              :rowKey="tableList.rowKey"
              :columns="tableList.columns"
              :dataSource="tableList.data"
              :pagination="false"
              :customRow="customRow"
              :rowSelection="tableList.options.rowSelection"
              :scroll="{ y: 500 }"
            />
          </div>
        </div>
      </div>
    </div>
    <detail-modal ref="detailModal"></detail-modal>
  </mask-page-view>
</template>

<script>
  import Vue from 'vue'
  import MapboxView from '../../components/Hczy/Map/MapboxView'
    import mapboxgl from 'mapbox-gl'
    import HcMarker from './components/HcMarker'
    import { MaskPageView } from '@/layouts'
    import {
      Navs,
      LayerBtns,
      GetDataByLayer,
      GetTableRowKey
    } from './config/base'
  import DetailModal from './modules/DetailModal'
    let Map = null
    export default {
        name: 'OneMap',
        data () {
          return {
            mapOptions: {
              pitch: 30,
              zoom: 7,
              style: '/bright2'
            },
            ready: false,
            baseData: {
              navs: Navs(),
              layerItems: LayerBtns()
            },
            showInfoPanel: false,
            layerManager: {
              currentNav: 0,
              activeLayerItem: {},
              visibleLayerIds: [],
              existLayerGroup: {} // 已存在的对应图层相关group
            },
            tableList: {
              options: {
                rowSelection: {
                  type: 'radio',
                  columnWidth: 0,
                  selectedRowKeys: []
                }
              },
              columns: [],
              data: [],
              rowKey: 'id'
            }
          }
        },
        components: { DetailModal, MapboxView, MaskPageView },
        methods: {
          initMap () {
            this.nav(1)
            fetch('/data/js.geojson').then(res => res.json()).then(data => {
              Map.addSource('320000', {
                'type': 'geojson',
                'data': data
              })
              Map.addLayer({
                'id': 'area',
                'type': 'fill',
                'source': '320000',
                'layout': {},
                'paint': {
                  'fill-color': '#fff',
                  'fill-outline-color': '#ccc'
                }
              }, 'landuse-residential')
            })
            // this.renderMarker()
          },
          mapLoaded (map) {
            Map = map
            this.ready = true
            this.initMap()
          },
          nav (navId) {
            if (this.layerManager.currentNav === navId) {
              this.showInfoPanel = !this.showInfoPanel
              return
            }
            this.layerManager.currentNav = navId
            this.showInfoPanel = true
            this.layerRadioHandle(this.baseData.layerItems[navId][0])
          },
          layerManagerHandle (layerItem) {
            this.clearSelect()
            if (!this.layerManager.existLayerGroup[layerItem.id]) {
              this.layerManager.existLayerGroup[layerItem.id] = {}
            }
            for (const key in this.layerManager.existLayerGroup) {
              const intLayerId = parseInt(key)
              this.toggleLayer(layerItem, this.layerManager.visibleLayerIds.includes(intLayerId), layerItem.extraLayer)
            }
          },
          toggleLayer (layerItem, isShow = true, extraLayer = false) {
            const layerGroup = this.layerManager.existLayerGroup[layerItem.id]
            if (isShow) {
              this.loadLayer(layerItem)
            } else {
              if (layerGroup.markerGroup) {
               layerGroup.markerGroup.forEach((marker) => {
                  marker.remove()
                })
                layerGroup.markerGroup.clear()
              }
            }
          },
          loadLayer (layerItem) {
            GetDataByLayer(layerItem.id).then(res => {
              if (res) {
                setTimeout(() => {
                  this.renderLayer(layerItem, res)
                }, 200)
              }
            })
          },
          clearSelect () {
          },
          layerRadioHandle (layerItem) {
            if (this.layerManager.activeLayerItem.id === layerItem.id) {
              return
            }
            this.layerManager.activeLayerItem = layerItem
            this.layerManager.visibleLayerIds = [layerItem.id]
            this.layerManagerHandle(layerItem)
          },
          layerCheckboxHandle (e, layerItem) {
            e.stopPropagation()
            if (this.layerManager.activeLayerItem.id === layerItem.id) {
              return
            }
            const index = this.layerManager.visibleLayerIds.indexOf(layerItem.id)
            if (index < 0) {
              this.layerManager.visibleLayerIds.push(layerItem.id)
            } else {
              this.layerManager.visibleLayerIds.splice(index, 1)
            }
            this.layerManagerHandle(layerItem)
          },
          // 渲染Layer
          renderLayer (layerItem, res) {
            const geoData = res.data.geo_info
            switch (layerItem.id) {
              case 31: {
                geoData.features.forEach((v) => {
                  this.renderMarker(v.geometry.coordinates, layerItem, v.properties.id, '/icons/intake.svg', '#3677fe', v.properties.name, v.properties.info)
                })
                break
              }
              default: {
                geoData.features.forEach((v) => {
                  this.renderMarker(v.geometry.coordinates, layerItem, v.properties.id, '/icons/water-env.svg', '#3FD4B4', v.properties.name, '关键信息展示')
                })
              }
            }
          },
          markerClick (dataId, layerItem) {
            console.log(dataId, layerItem)
            if (layerItem.detailModal) {
              this.$refs.detailModal.showModal(dataId, layerItem.detailModal, layerItem.detailTitle)
            }
          },
          // 渲染marker
          renderMarker (coordinates, layerItem, dataId, icon, bgColor, name = '取水口', info = '水量: 300 m<sup>2</sup>/h') {
            if (!this.layerManager.existLayerGroup[layerItem.id].markerGroup) {
              this.layerManager.existLayerGroup[layerItem.id].markerGroup = new Set()
            }
            const el = document.createElement('div')
            el.className = 'hc-marker-container'
            const child = document.createElement('div')
            el.appendChild(child)
            const MarkerInstance = Vue.extend(HcMarker)
            new MarkerInstance({
              propsData: {
                dataId: dataId,
                icon: icon,
                bgColor: bgColor,
                name: name,
                info: info
              }
            }).$mount(child)
            const marker = new mapboxgl.Marker({
              element: el
            })
              .setLngLat(coordinates)
              .addTo(Map)
            this.layerManager.existLayerGroup[layerItem.id].markerGroup.add(marker)
            el.addEventListener('click', (e) => {
              e.stopPropagation()
              this.markerClick(dataId, layerItem)
            })
          },
          customRow (record, index) {
            return {
              on: {
                click: () => {
                  this.rowSelect(record)
                  this.$set(this.tableOption.rowSelection.selectedRowKeys, 0, record[this.rowKey])
                }
              }
            }
          }
        }
    }
</script>

<style lang="less" scoped>
  @primary-map-color: #3FD4A2;
  .map {
    background-color: #fff;
    position: absolute;
    width: 100%;
    height: 100vh;
  }

  .map .nav-map {
    position: absolute;
    right: 50%;
    bottom: 5%;
    transform: translateX(50%);
    z-index: 999;
    display: flex;
    justify-content: flex-start;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.4);
    border-radius: 2px;
  }

  .nav-map-item {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 8px 5px 5px 5px;
    font-size: 24px;
    color: #7F91A5;
    box-sizing: border-box;
    background: #fff;
    position: relative;
  }

  .nav-map .nav-map-item:first-child {
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  .nav-map .nav-map-item:last-child {
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }

  .nav-map-item:hover {
    cursor: pointer;
    background-color: #ECF6FF;
  }

  .nav-map-item.active {
    color: @primary-color;
    background-color: #ECF6FF;

  }

  .nav-map-item .title {
    font-size: 12px;
    margin-top: 2px;
    transform: scale(0.8);
  }

  .nav-map-item .line {
    position: absolute;
    right: 0;
    height: 80%;
    z-index: 999;
    transform: scaleX(0.8);
    border-left: 1px solid #E5E9ED;
  }

  .panel-info {
    width: 320px;
    z-index: 10;
    position: fixed;
    overflow: auto;
    right: -320px;
    top: 0;
    bottom: 0;
    background-color: #fff;
    transition: right 1s;
    box-shadow: 2px 0px 8px 0px rgba(29, 35, 41, 0.05);
  }

  .panel-info.panel-show {
    right: 0;
  }

  .panel-content {
    padding: 24px 10px;
  }

  .panel-info .layer-control {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .layer-btn {
    min-width: 80px;
    text-align: center;
    border: 1px solid #E5E9ED;
    border-radius: 2px;
    color: rgba(0, 0, 0, 0.65);
    font-weight: 500;
    font-size: 12px;
    padding: 2px 5px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .layer-btn:hover {
    /*background-color: #fff;*/
    /*border-color: #3FD4A2;*/
    /*color: #fff;*/
    opacity: 0.7;
  }

  .layer-btn.active {
    background-color: @primary-map-color;
    border-color: @primary-map-color;
    color: #fff;
  }

  .layer-btn /deep/ .ant-checkbox-inner {
    border-radius: 50%;
  }

  .layer-btn /deep/ .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: @primary-map-color;
  }

  .layer-btn /deep/ .ant-checkbox-input:hover + .ant-checkbox-inner {
    border-color: @primary-map-color;
  }

  .layer-btn /deep/ .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #FFFFFF;
    border-color: @primary-map-color;
    color: @primary-map-color;
  }

  .layer-btn /deep/ .ant-checkbox-inner::after {
    border-color: @primary-map-color;
  }

  .layer-btn /deep/ .ant-checkbox-checked::after {
    border-color: @primary-map-color;
    border-radius: 50%;
  }

  .nav-map::selection {
    user-select: none;
  }

  .info-area /deep/ .ant-table-selection-column > span {
    display: none;
  }

  .info-area /deep/ tr.ant-table-row-selected td {
    background-color: rgba(63, 212, 162, 0.25);
  }

  .map .area-select {
    position: absolute;
    left: 24px;
    top: 24px;
    /*transform: translateX(50%);*/
    z-index: 999;
    /*display: none;*/
  }

</style>
