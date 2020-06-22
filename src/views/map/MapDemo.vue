<template>
  <mask-page-view>
    <div class="map">
      <map-view ref="map" @loaded="sceneLoaded" @mapLoad="mapLoad"></map-view>
      <div v-show="sceneReady" class="area-select">
        <a-cascader
          :options="city.options"
          :defaultValue="city.defaultValue"
          change-on-select
          placeholder=""
          @change="cityChange"
          style="width: 200px"
          popupClassName="popup-city"
          :popupStyle="{height: '320px'}"
          :allow-clear="false"
          v-model="city.value"
          :field-names="city.fieldNames" >
        </a-cascader>
      </div>
      <div class="nav-map" v-show="sceneReady">
        <div
          @click="nav(item.id)"
          :class="['nav-map-item',item.id===currentNav?'active':'']"
          :key="item.id"
          v-for="item in navs">
          <a-icon :component="item.icon" v-show="item.id!==currentNav"></a-icon>
          <a-icon :component="item.iconSelected" v-show="item.id===currentNav"></a-icon>
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
              @click="layerClick(item)"
              v-for="item in layerBtn[currentNav]"
              :class="['layer-btn',layerData.activeLayerBtn.id===item.id?'active':'']">
              <span style="margin-right: 6px">{{ item.name }}</span>
              <a-checkbox
                :checked="layerData.showLayerBtns.includes(item.id)"
                @click="layerControl($event,item)"></a-checkbox>
            </div>
          </div>
          <!--        </div>-->
          <div class="info-area" v-show="layerData.activeLayerBtn.id!==0" style="margin: 10px 0">
            <div style="font-weight: 500;margin: 15px 0">{{ layerData.activeLayerBtn.name }}</div>
            <a-input-search placeholder="请输入搜索内容" style="width: 240px;margin-bottom: 24px" @search="onSearch"/>
            <a-table
              v-show="columns.length>0"
              :rowKey="rowKey"
              :columns="columns"
              :dataSource="tableData"
              :pagination="false"
              :customRow="customRow"
              :rowSelection="tableOption.rowSelection"
              :scroll="{ y: 500 }"
            />
            <!--            <span class="marker-info">-->
            <!--              <img src="/icons/rain.svg"/>-->
            <!--              <span style="background-color: #2c92d9">-->
            <!--                <span class="data-info">水位: 7.2m</span>-->
            <!--                <span>长江监测站</span>-->
            <!--              </span>-->
            <!--            </span>-->
          </div>
        </div>
      </div>
      <div id="test">
        <a-input/>
      </div>
    </div>
    <DetailModal v-if="showDetail" :orgData="orgData" ref="detailModal" @setDetailModule="setDetailModule"/>
  </mask-page-view>
</template>

<script>
  import { MaskPageView } from '@/layouts'
  import MapView from '@com/Hczy/Map/MapView'
  // import mapboxgl from 'mapbox-gl'
  import { loadWFS, loadNJWFS } from '../../api/mapServer'
  import { PolygonLayer, PointLayer, LineLayer, Popup, Marker, MarkerLayer } from '@antv/l7'
  import waterDetail from '@/components/Hczy/waterDetail'
  import VideoDetail from '@/components/Hczy/videoDetail'
  import Vue from 'vue'
  import { debounce } from 'throttle-debounce'
  import City from './config/City'
  import DetailModal from './modules/DetailModal'
  import {
    Navs,
    LayerBtns,
    TableColumnsByLayer,
    GetDataByLayer,
    GetTableRowKey,
    // LakeLabel,
    buildGeoJSON
  } from './config/base'
  let MapScene = null
  let popup = null
  let SelectedLayer = null
  const LOD_LEVEL = 10.5
  // eslint-disable-next-line no-unused-vars
  let LAST_ZOOM = 0
  export default {
    name: 'MapDemo',
    data () {
      return {
        city: {
          options: City,
          fieldNames: {
            label: 'name',
            value: 'id',
            children: 'children'
          },
          value: ['32'],
          lastArea: ''
        },
        tableOption: {
          rowSelection: {
            type: 'radio',
            columnWidth: 0,
            selectedRowKeys: []
          }
        },
        rowKey: 'id',
        columns: [],
        tableData: [],
        navs: Navs(),
        sceneReady: false,
        currentNav: 0,
        showInfoPanel: false,
        layerData: {
          showLayerBtns: [11],
          existLayers: new Set(),
          activeLayerBtn: {},
          existLayerGroup: {}
        },
        layerBtn: LayerBtns(),
        orgData: null,
        showDetail: false
      }
    },
    components: { MapView, MaskPageView, DetailModal },
    methods: {
      setDetailModule (value) {
        this.showDetail = value
      },
      cityChange (value) {
        // console.log('city change:', this.city.value)
        this.selectArea(this.city.value.slice(-1)[0])
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
      },
      clearSelect () {
        if (SelectedLayer) {
          MapScene.removeLayer(SelectedLayer)
          SelectedLayer = null
        }
      },
      setSelectLayer (data, type = 'Polygon') {
        this.clearSelect()
        if (type === 'Polygon') {
          SelectedLayer = new LineLayer({ name: 'CurrentSelect' })
            .source(data)
            // .scale('female', {
            //   type: 'quantile'
            // })
            .color('#000')
            .size(0.6)
            .style({
              // lineType: 'dash',
              // dashArray: [2, 2],
              opacity: 1
            })
          SelectedLayer.fitBounds()
          MapScene.addLayer(SelectedLayer)
        } else {
          SelectedLayer = new PointLayer({ name: 'CurrentSelect', zIndex: 20 })
            .source(data)
            .shape('selected')
            .size(20)
          MapScene.addLayer(SelectedLayer)
        }
      },
      rowSelect (record) {
        // console.log('click:', record)
        if (record.lat_lon) {
          MapScene.setZoomAndCenter(12, JSON.parse(record.lat_lon))
          // this.setSelectLayer(buildGeoJSON(JSON.parse(record.lat_lon), 'Point', { 'name': '点' }), 'Point')
        } else if (record.location) {
          const geoData = buildGeoJSON(JSON.parse(record.location))
          this.setSelectLayer(geoData)
        }
      },
      onSearch (v) {
        // console.log(v)
      },
      // 图层marker点击事件集合type="get_water"取水口 "water_functional"水功能区
      markerLayerClick (v, layerId) {
        this.showDetail = true
        console.log(v, 'cccccc')
        MapScene.panTo(v.lngLat)
        // 显示详情弹框
        this.orgData = v.data
        this.$nextTick().then(() => {
          this.$refs.detailModal.showModal()
        })
        switch (layerId) {
          case 12 : {
            popup = new Popup({
              closeButton: false,
              className: 'hc-detail-popup',
              anchor: 'right',
              offsets: [-10, 12]
            }).setLnglat(v.lngLat)
            const el = document.createElement('div')
            el.style.width = '480px'
            const Detail = Vue.extend(waterDetail)
            popup.setDOMContent(el)
            new Detail({
              propsData: {
                name: v.data._name
              }
            }).$mount(el)
            this.showInfoPanel = false
            MapScene.addPopup(popup)
            break
          }
          case 14 : {
            popup = new Popup({
              closeButton: false,
              className: 'hc-detail-popup',
              anchor: 'right',
              offsets: [-10, 12]
            }).setLnglat(v.lngLat)
            const el = document.createElement('div')
            el.style.width = '480px'
            const Detail = Vue.extend(VideoDetail)
            popup.setDOMContent(el)
            new Detail({
              propsData: {
                videoPath: 'https://river-chief.susinnovation.com/river-chief/mp4/7327a81b10ecaa7781c98c8fe9bb52cd.mp4'
              }
            }).$mount(el)
            this.showInfoPanel = false
            MapScene.addPopup(popup)
            break
          }
        }
      },
      clusterLayerClick (v, layerId) {
        // console.log('map layer:', v, layerId)
        // console.log(MapScene.getLayerByName(layerId).getSource().getClustersLeaves(v.feature.cluster_id))
        //
        if (v.feature.cluster) {
          const targetZoom = MapScene.getZoom() >= 11 ? (MapScene.getZoom() + 1) : 11
          MapScene.setZoomAndCenter(targetZoom, v.feature.coordinates)
        } else {
          MapScene.map.easeTo({
            center: v.feature.coordinates,
            zoom: 11
          })
          // this.setSelectLayer(buildGeoJSON(v.feature.coordinates, 'Point', { 'id': '' }), 'Point')
          // MapScene.panTo(v.feature.coordinates)
        }
      },
      renderMarkerLayer (layerId, data, iconUrl, backgroundColor) {
        if (!this.layerData.existLayerGroup[layerId].markerLayer) {
          this.layerData.existLayerGroup[layerId].markerLayer = new MarkerLayer()
        } else {
          this.layerData.existLayerGroup[layerId].markerLayer.clear()
        }
        // const markerLayer = new MarkerLayer()
        const originIconUrl = iconUrl
        const originBackgroundColor = backgroundColor
        const isHide = MapScene.getZoom() < LOD_LEVEL
        data.features.forEach((v) => {
          if (v.properties._isWarn === 1) {
                iconUrl = '/icons/warn.svg'
                backgroundColor = '#ff2c1b'
          } else {
                iconUrl = originIconUrl
                backgroundColor = originBackgroundColor
          }
          // if ([12, 13].includes(layerId)) {
          //   if ((Math.random() * 10) < 2) {
          //     iconUrl = '/icons/warn.svg'
          //     backgroundColor = '#ff2c1b'
          //   } else {
          //     iconUrl = originIconUrl
          //     backgroundColor = originBackgroundColor
          //   }
          // }
          const el = document.createElement('span')
          el.className = 'marker-info'
          if (isHide) {
            el.className += ' hide'
          }
          const icon = document.createElement('img')
          icon.src = `${iconUrl}`
          el.appendChild(icon)
          const info = document.createElement('span')
          info.style.backgroundColor = backgroundColor
          if (v.properties._info) {
            const dataInfo = document.createElement('span')
            dataInfo.className = 'data-info'
            dataInfo.style.color = backgroundColor
            dataInfo.textContent = v.properties._info
            info.appendChild(dataInfo)
          }
          const name = document.createElement('span')
          name.className = 'marker-name'
          name.textContent = v.properties._name
          info.appendChild(name)
          el.appendChild(info)
          const marker = new Marker({
            element: el,
            extData: v.properties
          }).setLnglat({ lng: v.geometry.coordinates[0], lat: v.geometry.coordinates[1] })
          marker.on('click', (e) => {
            this.markerLayerClick(e, layerId)
          })
          this.layerData.existLayerGroup[layerId].markerLayer.addMarker(marker)
        })
        // markerLyaer.set
        MapScene.addMarkerLayer(this.layerData.existLayerGroup[layerId].markerLayer)
        this.renderPointLayer(layerId, data, iconUrl)
      },
      renderPointLayer (layerId, data) {
        if (this.layerData.existLayerGroup[layerId].pointLayer) {
          return
        }
        const pointLayer = new PointLayer({ name: layerId, zIndex: 11 })
          .source(data, {
            cluster: true,
            clusterOptions: { radius: 16 }
          })
          .shape(layerId)
          .scale('point_count', {
            type: 'quantile'
          })
          .setMaxZoom(LOD_LEVEL)
          // .size(12)
          .size('point_count', pointCount => {
            if (pointCount > 1) {
              return 16
            } else {
              return 12
            }
          })
        pointLayer.on('click', (e) => {
          this.clusterLayerClick(e, layerId)
        })
        this.layerData.existLayerGroup[layerId].pointLayer = pointLayer
        MapScene.addLayer(pointLayer)
      },
      renderLayer (layerId, res) {
        const geoData = res.data.geo_info
        console.log(layerId, 'dddd')
        switch (layerId) {
          case 11: {
            geoData.features.forEach((v, index) => {
              v.properties._name = res.data.list[index].pollution_name
              v.properties._info = res.data.list[index].location
            })
            this.renderMarkerLayer(layerId, geoData, '/icons/pollution.svg', '#516c85')
            break
          }
          case 12: {
            geoData.features.forEach((v, index) => {
              v.properties._name = res.data.list[index].station_name
              v.properties._info = `水位：${res.data.list[index].rain_amount}米`
              if (Math.random() * 10 < 2) {
                v.properties._isWarn = 1
              }
            })
            this.renderMarkerLayer(layerId, geoData, '/icons/water.svg', '#2c92d9')
            break
          }
          case 13: {
            geoData.features.forEach((v, index) => {
              v.properties._name = res.data.list[index].station_name
              v.properties._info = `雨量：${res.data.list[index].rain_amount}mm`
              if (Math.random() * 10 < 2) {
                v.properties._isWarn = 1
              }
            })
            this.renderMarkerLayer(layerId, geoData, '/icons/rain.svg', '#13c7ff')
            break
          }
          case 14: {
            geoData.features.forEach((v, index) => {
              v.properties._name = res.data.list[index].video_monitor_name
            })
            this.renderMarkerLayer(layerId, geoData, '/icons/video.svg', '#3677fe')
            break
          }
          case 21: {
            const colors = [
              '#5E69C9',
              '#5680FF',
              '#2192EF',
              '#23B1F8',
              '#3cf1f8'
            ]
            const layer = new PolygonLayer({ name: layerId, zIndex: 9 })
              .source(res.data.geo_info)
              // .scale('female', {
              //   type: 'quantile'
              // })
              .color('id', colors)
              .shape('fill')
              .active(true)
              .style({
                opacity: 0.5
              })

            const layer2 = new LineLayer({
              zIndex: 11,
              name: layerId
            })
              .source(res.data.geo_info)
              .color('#fff')
              .size(0.8)
              .style({
                opacity: 1
              })
            MapScene.addLayer(layer)
            MapScene.addLayer(layer2)
            layer.setMinZoom(7)
            layer2.setMinZoom(7)
            layer.on('click', e => {
              console.log(e)
              this.setSelectLayer(buildGeoJSON(e.feature.geometry.coordinates))
              this.$set(this.tableOption.rowSelection.selectedRowKeys, 0, e.feature.properties.id)
              // MapScene.getLayerByName(layerId).setSelect(e.featureId)
              // layer.setSelect(e.featureId)
              // layer.fitBounds()
              // layer.setActive({ x: e.x, y: e.y })
            })
            layer.on('mousemove', e => {
              popup = new Popup({
                offsets: [0, 0],
                className: 'hc-popup',
                closeButton: false
              })
                .setLnglat(e.lngLat)
                .setHTML(`<span style="color: rgba(0,0,0,0.65);font-weight: 500">${e.feature.properties.name}</span><br/><span style="font-size: 12px;color: rgba(0,0,0,0.65)">负责人：${e.feature.properties.leader}`)
              MapScene.addPopup(popup)
            })
            layer.on('mouseout', e => {
              if (popup) {
                popup.close()
              }
            })
            this.layerData.existLayerGroup[layerId].baseLayer = layer
            this.layerData.existLayerGroup[layerId].extraLayer = [layer2]
            break
          }
          case 31: {
            geoData.features.forEach((v, index) => {
              v.properties._name = res.data.list[index].get_water_name
              v.properties._info = `流量：${res.data.list[index].ammount}`
            })
            this.renderMarkerLayer(layerId, geoData, '/icons/intake.svg', '#3677fe')
            // this.renderPointLayer(layerId, res.data.geo_info, 'rain')
            break
          }
          case 32: {
            geoData.features.forEach((v, index) => {
              v.properties._name = res.data.list[index].func_name
              // v.properties._info = `${res.data.list[index].remark}`
            })
            this.renderMarkerLayer(layerId, geoData, '/icons/water-function.svg', '#1391d9')
            // this.renderPointLayer(layerId, res.data.geo_info, 'rain')
            break
          }
          case 33: {
            geoData.features.forEach((v, index) => {
              v.properties._name = res.data.list[index].station_name
              v.properties._info = `${res.data.list[index].remark}`
            })
            this.renderMarkerLayer(layerId, geoData, '/icons/water-env.svg', '#3FD4B4')
            // this.renderPointLayer(layerId, res.data.geo_info, 'rain')
            break
          }
          case 41: {
            const lineLayer = new LineLayer({
              name: layerId,
              zIndex: 9
            }).source(geoData).shape('line').size(1).color('#0D7DD9')
            lineLayer.on('click', (e) => {
              this.$refs.detailModal.showModal(e.feature.properties.id)
            })
            MapScene.addLayer(lineLayer)
            this.layerData.existLayerGroup[layerId].baseLayer = lineLayer
            break
          }
          case 51: {
            geoData.features.forEach((v, index) => {
              v.properties._name = res.data.list[index].sewage_name
              // v.properties._info = `${res.data.list[index].remark}`
            })
            this.renderMarkerLayer(layerId, geoData, '/icons/outfall.svg', '#516c85')
            break
          }
          case 61: {
            geoData.features.forEach((v, index) => {
              v.properties._name = res.data.list[index].river_name
              // v.properties._info = `${res.data.list[index].remark}`
            })
            this.renderMarkerLayer(layerId, geoData, '/icons/black-water.svg', '#1c345b')
            break
          }
          case 71: {
            geoData.features.forEach((v, index) => {
              v.properties._name = res.data.list[index].note
              v.properties._info = `${res.data.list[index].project}`
            })
            this.renderMarkerLayer(layerId, geoData, '/icons/project.svg', '#ffb70d')
            break
          }
          case 81: {
            geoData.features.forEach((v, index) => {
              v.properties._name = res.data.list[index].name
            })
            this.renderMarkerLayer(layerId, geoData, '/icons/board.svg', '#ff6614')
            break
          }
          case 82: {
            geoData.features.forEach((v, index) => {
              v.properties._name = res.data.list[index].name
            })
            this.renderMarkerLayer(layerId, geoData, '/icons/event.svg', '#ff2c1b')
            break
          }
          case 83: {
            geoData.features.forEach((v, index) => {
              v.properties._name = res.data.list[index].name
            })
            this.renderMarkerLayer(layerId, geoData, '/icons/complaint.svg', '#6f25c9')
            break
          }
        }
      },
      loadLayer (layerId) {
        GetDataByLayer(layerId).then(res => {
          if (res) {
            console.log('===res:333')
            setTimeout(() => {
              this.renderLayer(layerId, res)
            }, 200)
          }
        })
      },
      toggleLayer (layerId, isShow = true, externalLayer = false) {
        console.log('toggle:', layerId, isShow)
        const layerGroup = this.layerData.existLayerGroup[layerId]
        if (isShow) {
          if (!layerGroup.baseLayer && !layerGroup.markerLayer) {
              this.loadLayer(layerId)
          } else {
            if (layerGroup.pointLayer) {
              layerGroup.pointLayer.show()
            }
            if (layerGroup.baseLayer) {
              layerGroup.baseLayer.show()
            }
            if (layerGroup.extraLayer && Array.isArray(layerGroup.extraLayer)) {
              layerGroup.extraLayer.forEach((v) => {
                v.show()
              })
            }
            if (layerGroup.markerLayer) {
              this.loadLayer(layerId)
            }
          }
          if (externalLayer && Array.isArray(externalLayer)) {
            externalLayer.forEach((v) => {
              const externalLayer = MapScene.getLayerByName(v)
              if (externalLayer) {
                externalLayer.show()
              }
            })
          }
        } else {
          // console.log('hide:', layerGroup)
          if (layerGroup.pointLayer) {
            layerGroup.pointLayer.hide()
          }
          if (layerGroup.baseLayer) {
            layerGroup.baseLayer.hide()
          }
          if (layerGroup.markerLayer) {
            MapScene.removeMarkerLayer(layerGroup.markerLayer)
          }
          if (layerGroup.extraLayer && Array.isArray(layerGroup.extraLayer)) {
            layerGroup.extraLayer.forEach((v) => {
              v.hide()
            })
          }
          if (externalLayer && Array.isArray(externalLayer)) {
            externalLayer.forEach((v) => {
              const externalLayer = MapScene.getLayerByName(v)
              if (externalLayer) {
                externalLayer.hide()
              }
            })
          }
        }
      },
      layerManager (layer) {
        this.clearSelect()
        if (!this.layerData.existLayerGroup[layer.id]) {
          this.layerData.existLayerGroup[layer.id] = {}
        }
        for (const key in this.layerData.existLayerGroup) {
          this.toggleLayer(parseInt(key), this.layerData.showLayerBtns.includes(parseInt(key)), layer.externalLayer)
        }

        // if (layerId && !this.layerData.existLayers.has(layerId)) {
        //   this.layerData.existLayers.add(layerId)
        // }
        // this.layerData.existLayers.forEach((v) => {
        //   this.toggleLayer(v, this.layerData.showLayerBtns.includes(v))
        // })
      },
      layerClick (layer) {
        if (this.layerData.activeLayerBtn.id === layer.id) {
          return
        }
        this.layerData.activeLayerBtn = layer
        this.layerData.showLayerBtns = [layer.id]
        this.layerManager(layer)
        this.renderTableList()
      },
      layerControl (e, layer) {
        e.stopPropagation()
        if (this.layerData.activeLayerBtn.id === layer.id) {
          return
        }
        const index = this.layerData.showLayerBtns.indexOf(layer.id)
        if (index >= 0) {
          this.layerData.showLayerBtns.splice(index, 1)
        } else {
          this.layerData.showLayerBtns.push(layer.id)
        }
        this.layerManager(layer)
      },
      nav (id) {
        if (this.currentNav === id) {
          this.showInfoPanel = !this.showInfoPanel
          return
        }
        this.showInfoPanel = true
        this.currentNav = id
        this.layerClick(this.layerBtn[id][0])
      },
      renderTableList () {
        this.tableData = []
        this.rowKey = GetTableRowKey(this.layerData.activeLayerBtn.id)
        this.columns = TableColumnsByLayer(this.layerData.activeLayerBtn.id)
        GetDataByLayer(this.layerData.activeLayerBtn.id).then(res => {
          if (res) {
            this.tableData = res.data.list
          }
        })
      },
      initScene (scene) {
        MapScene = scene
        this.sceneReady = true
        this.addImage(scene)
        LAST_ZOOM = scene.getZoom()
        // init Scene Event
        scene.on('zoomend', () => {
          debounce(200, this.zoomHandler)()
        })
        this.nav(1)
      },
      zoomHandler () {
        const zoom = MapScene.getZoom()
        // throttle(500, this.markerLod)
        this.markerLod(zoom)
        if (zoom > 9) {
          this.loadCountry()
        }
      },
      markerLod (zoom) {
        const hideMarker = zoom < LOD_LEVEL
        document.querySelectorAll('.marker-info').forEach((v) => {
          if (hideMarker) {
            v.classList.add('hide')
          } else {
            v.classList.remove('hide')
          }
        })
      },
      loadCountry () {
        // console.log(MapScene.map.getBounds().toArray())
        const bounds = MapScene.map.getBounds().toArray()
        loadNJWFS({
          service: 'WFS',
          version: '1.0.0',
          request: 'GetFeature',
          typename: 'njdemo:全国市辖区2019',
          bbox: `${bounds[0].toString()},${bounds[1].toString()}`,
          outputFormat: 'application/json'
          // cql_filter: '"省代码"=320000'
        }).then(res => {
          const areaBoundaryLine = new LineLayer({
            zIndex: 2,
            name: 'countryBoundary'
          })
            .source(res.data)
            .color('#000')
            .size(0.3)
            .style({
              opacity: 0.15
            })
          areaBoundaryLine.setMinZoom(9)
          MapScene.addLayer(areaBoundaryLine)
        })
      },
      addImage (scene) {
        Object.keys(this.layerBtn).forEach((key) => {
          this.layerBtn[key].forEach((v) => {
            if (v.icon) {
              scene.addImage(v.id, v.icon)
            }
          })
        })
      },
      sceneLoaded (scene) {
        this.initScene(scene)

        setTimeout(() => {
          loadNJWFS({
            service: 'WFS',
            version: '1.0.0',
            request: 'GetFeature',
            typename: 'njdemo:地级市2019',
            outputFormat: 'application/json',
            cql_filter: '"省代码"=320000'
          }).then(res => {
            const cityBoundaryLine = new LineLayer({
              zIndex: 2
            })
              .source(res.data)
              .color('#000')
              .size(0.3)
              .style({
                opacity: 0.15
              })
            cityBoundaryLine.setMaxZoom(9)
            scene.addLayer(cityBoundaryLine)
          })
          // todo 删除 选中南京
          // loadNJWFS({
          //   service: 'WFS',
          //   version: '1.0.0',
          //   request: 'GetFeature',
          //   typename: 'njdemo:地级市2019',
          //   outputFormat: 'application/json',
          //   cql_filter: '"市代码"=320100'
          // }).then(res => {
          //   scene.map.addSource('nj-area', {
          //     'type': 'geojson',
          //     'data': res.data
          //   })
          //   scene.map.addLayer({
          //     'id': 'nj',
          //     'type': 'fill',
          //     'source': 'nj-area',
          //     'layout': {},
          //     'paint': {
          //       'fill-color': '#197DD9'
          //     }
          //   }, 'place_label_city')
          //   // const cityBoundaryLine = new PolygonLayer({
          //   //   zIndex: 20
          //   // })
          //   //   .source(res.data)
          //   //   .color('#197DD9')
          //   //   .shape('fill')
          //   //   .style({
          //   //     opacity: 1
          //   //   })
          //   // cityBoundaryLine.setMaxZoom(9)
          //   // scene.addLayer(cityBoundaryLine)
          // })

          loadNJWFS({
            service: 'WFS',
            version: '1.0.0',
            // maxFeatures: 100,
            // bbox: '118.64959716796874,31.316101383495624,120.18218994140626,32.54218257955074',
            request: 'GetFeature',
            typename: 'njdemo:js_water_polygon',
            outputFormat: 'application/json',
            cql_filter: "name like '%湖%'"
            // cql_filter: "name IN('滆湖','长荡湖','太湖','淀山湖','里下河腹部地区湖泊湖荡','骆马湖','邵伯湖','高邮湖','宝应湖','白马湖','洪泽湖','石臼湖','固城湖','玄武湖')"
          }).then(res => {
            const features = res.data
            const layer = new PolygonLayer({
              name: 'lake',
              visible: true
            })
              .source(features)
              .color('#b3eeff')
              .shape('fill')
              .active(true)
              .style({
                opacity: 1
              })
            scene.addLayer(layer)
            layer.on('mousemove', e => {
              popup = new Popup({
                offsets: [0, 0],
                className: 'hc-popup',
                closeButton: false
              })
                .setLnglat(e.lngLat)
                .setHTML(`<span style="display: block;text-align: center">${e.feature.properties.name}</span>`)
              scene.addPopup(popup)
            })
            layer.on('mouseout', e => {
              if (popup) popup.close()
            })
            const textLayer = new PointLayer({
              name: 'lakeText',
              zIndex: 100
            }).source()
              .color('#0e0030')
              .shape('name', 'text')
              .size(12)
              .style({
                textAnchor: 'center', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
                textOffset: [0, 0], // 文本相对锚点的偏移量 [水平, 垂直]
                spacing: 2, // 字符间距
                padding: [1, 1], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
                stroke: '#ffffff', // 描边颜色
                strokeWidth: 0.3, // 描边宽度
                strokeOpacity: 0.5,
                opacity: 0.65
              })
            textLayer.setMinZoom(8)
            scene.addLayer(textLayer)
          })
          loadNJWFS({
            service: 'WFS',
            version: '1.0.0',
            // maxFeatures: 100,
            // bbox: '118.64959716796874,31.316101383495624,120.18218994140626,32.54218257955074',
            request: 'GetFeature',
            typename: 'njdemo:js_water_polygon',
            outputFormat: 'application/json',
            // bbox: '118.5431671142578,31.777796240436775,119.14466857910156,32.210477226433824',
            cql_filter: "name LIKE '%水库%'"
          }).then(res => {
            const features = res.data
            const layer = new PolygonLayer({
              name: 'dam',
              visible: true
            })
              .source(features)
              .color('#A1ECDB')
              .shape('fill')
              .active(true)
              .style({
                opacity: 1
              })
            scene.addLayer(layer)
            layer.on('mousemove', e => {
              popup = new Popup({
                offsets: [0, 0],
                className: 'hc-popup',
                closeButton: false
              })
                .setLnglat(e.lngLat)
                .setHTML(`<span style="display: block;text-align: center">${e.feature.properties.name}</span>`)
              scene.addPopup(popup)
            })
            layer.on('mouseout', e => {
              if (popup) popup.close()
            })
          })
        }, 500)
      },
      selectArea (areaId) {
        if (this.city.lastArea === areaId) { return }
        if (MapScene.map.getLayer(areaId)) {
          MapScene.map.setLayoutProperty(areaId, 'visibility', 'visible')
          MapScene.map.setLayoutProperty(this.city.lastArea, 'visibility', 'none')
          if (MapScene.map.getSource(areaId)._data instanceof Object) {
            MapScene.map.fitBounds(MapScene.map.getSource(areaId)._data.bbox, {
              padding: { top: 50, bottom: 150, left: 150, right: 350 }
            })
          } else {
             MapScene.map.easeTo({
               zoom: 6.5,
               center: [
                 119.91202398644623,
                 32.41659873015716
               ]
             })
          }
          this.city.lastArea = areaId
        } else {
          let _areaId = areaId
          if (areaId.length === 2) {
           MapScene.map.addSource(areaId, {
              'type': 'geojson',
              'data': '/JiangSuBoundary.json'
            })
            MapScene.map.addLayer({
              'id': areaId,
              'type': 'fill',
              'source': areaId,
              'layout': {},
              'paint': {
                'fill-color': '#fff'
              }
            }, 'water')
            if (this.city.lastArea) {
              MapScene.map.setLayoutProperty(this.city.lastArea, 'visibility', 'none')
            }
            this.city.lastArea = areaId
          } else if (areaId.length === 4) {
            _areaId += '00'
            loadNJWFS({
              service: 'WFS',
              version: '1.0.0',
              request: 'GetFeature',
              typename: 'njdemo:地级市2019',
              outputFormat: 'application/json',
              cql_filter: `"市代码"=${_areaId}`
            }).then(res => {
              MapScene.map.addSource(areaId, {
                'type': 'geojson',
                'data': res.data
              })
              MapScene.map.addLayer({
                'id': areaId,
                'type': 'fill',
                'source': areaId,
                'layout': {},
                'paint': {
                  'fill-color': '#fff'
                }
              }, 'water')
              MapScene.map.fitBounds(res.data.bbox, {
                padding: { top: 50, bottom: 150, left: 150, right: 350 }
              })
              MapScene.map.setLayoutProperty(this.city.lastArea, 'visibility', 'none')
              this.city.lastArea = areaId
            })
          } else {
            loadNJWFS({
              service: 'WFS',
              version: '1.0.0',
              request: 'GetFeature',
              typename: 'njdemo:全国市辖区2019',
              outputFormat: 'application/json',
              cql_filter: `PAC=${areaId}`
            }).then(res => {
              MapScene.map.addSource(areaId, {
                'type': 'geojson',
                'data': res.data
              })
              MapScene.map.addLayer({
                'id': areaId,
                'type': 'fill',
                'source': areaId,
                'layout': {},
                'paint': {
                  'fill-color': '#fff'
                }
              }, 'water')
              MapScene.map.fitBounds(res.data.bbox, {
                padding: { top: 50, bottom: 150, left: 150, right: 350 }
              })
              MapScene.map.setLayoutProperty(this.city.lastArea, 'visibility', 'none')
              this.city.lastArea = areaId
            })
          }
        }
      },
      mapLoad (map) {
        // console.log('map loaded')
        // MapScene.map.addSource('32', {
        //   'type': 'geojson',
        //   'data': '/JiangSuBoundary.json'
        // })
        // MapScene.map.addLayer({
        //   'id': '32',
        //   'type': 'fill',
        //   'source': '32',
        //   'layout': {},
        //   'paint': {
        //     'fill-color': '#fff'
        //   }
        // }, 'water')
        this.selectArea(this.city.value[0])
        // Map = map
      }
    },
    mounted () {
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

  .marker-info {
    height: 24px;
    display: inline-block;
    line-height: 24px;
    color: #fff;
    font-size: 12px;
    padding-right: 10px;
    border-radius: 5px;
    position: relative;
  }
  .marker-info>span {
    height: 20px;
    display: inline-block;
    line-height: 20px;
    color: #fff;
    font-size: 12px;
    padding-right: 10px;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    padding-left: 15px;
  }

  .marker-info img {
    height: 100%;
    font-size: 12px;
    color: #fff;
    position: absolute;
    left: -12px;
  }
  .marker-info.hide {
    display: none !important;
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
