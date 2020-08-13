<template>
  <mask-page-view>
    <div class="map">
      <div class="overlay">
        <button id="replay">Replay</button>
      </div>
      <mapbox-view
        ref="map"
        :options="mapOptions"
        @mapLoaded="mapLoaded"
        :background-color="'rgba(207, 229, 246, 1)'"
      ></mapbox-view>
      <div class="nav-map" v-show="ready">
        <div
          @click="nav(item.id)"
          :class="['nav-map-item', item.id === layerManager.currentNav ? 'active' : '']"
          :key="item.id"
          v-for="item in baseData.navs"
        >
          <a-icon :component="item.icon" v-show="item.id !== layerManager.currentNav"></a-icon>
          <a-icon :component="item.iconSelected" v-show="item.id === layerManager.currentNav"></a-icon>
          <span class="title">{{ item.title }}</span>
          <div class="line"></div>
        </div>
      </div>
      <div class="water-icons">
        <!-- 水情图例区域 -->
      </div>
      <div :class="['panel-info', showInfoPanel ? 'panel-show' : '']">
        <div class="panel-content">
          <!--          <div v-show="currentNav===1">-->
          <div class="layer-control">
            <div
              :key="item.id"
              @click="layerRadioHandle(item)"
              v-for="item in baseData.layerItems[layerManager.currentNav]"
              :class="['layer-btn', layerManager.activeLayerItem.id === item.id ? 'active' : '']"
            >
              <span style="margin-right: 6px">{{ item.name }}</span>
              <a-checkbox
                :checked="layerManager.visibleLayerIds.includes(item.id)"
                @click="layerCheckboxHandle($event, item)"
              ></a-checkbox>
            </div>
          </div>
          <!--        </div>-->
          <div class="info-area" v-show="layerManager.activeLayerItem.id !== 0" style="margin: 10px 0">
            <div style="font-weight: 500;margin: 15px 0">{{ layerManager.activeLayerItem.name }}</div>
            <a-input-search
              placeholder="请输入搜索内容"
              v-model="searchName"
              style="width: 240px;margin-bottom: 24px"
              @search="searchFilter(layerManager.activeLayerItem, searchName)"
            />
            <a-range-picker
              v-if="showRainTimeRange"
              style="width: 300px;margin-bottom: 10px;"
              :show-time="{
                hideDisabledOptions: true
              }"
              valueFormat="YYYY-MM-DD HH:mm:ss"
              format="YYYY-MM-DD HH:mm:ss"
              v-model="rainTimeRange"
              @ok="rainTimeRangeChange"
            />
            <a-table
              v-show="tableList.columns.length > 0"
              :rowKey="tableList.rowKey"
              :bordered="false"
              :columns="tableList.columns"
              :dataSource="tableList.data"
              :pagination="false"
              :customRow="customRow"
              :rowSelection="tableList.options.rowSelection"
              :scroll="{ y: 500 }"
            >
              <span slot="up_value" slot-scope="text">{{ text ? text.toFixed(2) : '' }}</span>
              <span slot="down_value" slot-scope="text">{{ text ? text.toFixed(2) : '' }}</span>
              <span slot="value" slot-scope="text">{{ text ? text.toFixed(0) : '' }}</span>
              <span slot="m3s" slot-scope="text"> {{ text }}m <sup>3</sup>/s </span>
              <span slot="hasOrNo" slot-scope="text">{{ text === 1 ? '有' : '无' }}</span>
              <span slot="in_river" slot-scope="text">{{ text.toFixed(2) }}t/a</span>
            </a-table>
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
import { Navs, LayerBtns, GetDataByLayer, GetTableRowKey, TableColumnsByLayer } from './config/base'
import DetailModal from './modules/DetailModal'
import moment from 'moment'
import * as turf from '@turf/turf'
import { loadRiverAndLake } from '@/api/mapServer'
let Map = null
export default {
  name: 'OneMap',
  data() {
    return {
      showMessage: false,
      longRiverData: [],
      searchName: '',
      rainTimeRange: ['2020-06-10 00:00:00', '2020-06-10 18:18:14'],
      showRainTimeRange: false,
      mapOptions: {
        pitch: 30,
        zoom: 10,
        center: [120.87572773715249, 31.86364835278333],
        style: '/bright'
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
  created() {},
  methods: {
    moment,
    rainTimeRangeChange() {},
    initMap() {
      var _this = this
      this.nav(1)
      fetch('data/js.geojson')
        .then(res => {
          return res.json()
        })
        .then(data => {
          var point = {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: [121.603474, 32.093615]
                }
              }
            ]
          }
          var arc = []
          var steps = 1000
          // San Francisco
          var origin = [120.91854393025727, 31.783589924576944]

          // Washington DC
          var destination = [120.75680696773281, 32.00498695993434]
          var route = {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: [origin, destination]
                }
              }
            ]
          }
          var lineDistance = turf.rhumbDistance(origin, destination, { units: 'miles' })
          for (var i = 0; i < lineDistance; i += lineDistance / steps) {
            var line = turf.lineString(route.features[0].geometry.coordinates)
            var segment = turf.along(line, i, { units: 'miles' })
            arc.push(segment.geometry.coordinates)
          }
          route.features[0].geometry.coordinates = arc
          Map.addSource('route', {
            type: 'geojson',
            data: route
          })
          Map.addSource('point', {
            type: 'geojson',
            data: point
          })
          Map.loadImage('/icons/chuan2.png', function(error, image) {
            if (error) throw error
            Map.addImage('chuan', image)

            Map.addLayer({
              id: 'points',
              type: 'symbol',
              source: 'point',
              layout: {
                'icon-image': 'chuan',
                'icon-size': 0.25
              }
            })
          })

          var counter = 0
          function animate() {
            // Update point geometry to a new position based on counter denoting
            // the index to access the arc.
            point.features[0].geometry.coordinates = route.features[0].geometry.coordinates[counter]
            // Calculate the bearing to ensure the icon is rotated to match the route arc
            // The bearing is calculate between the current point and the next point, except
            // at the end of the arc use the previous point and the current point
            point.features[0].properties.bearing = turf.bearing(
              turf.point(route.features[0].geometry.coordinates[counter >= steps ? counter - 1 : counter]),
              turf.point(route.features[0].geometry.coordinates[counter >= steps ? counter : counter + 1])
            )

            // Update the source with this new data.
            Map.getSource('point').setData(point)
            // console.log(point.features[0].geometry.coordinates, 'point', _this.longRiverData)
            const isInPolygon = _this.longRiverData.length > 0 ? turf.booleanPointInPolygon(turf.point(point.features[0].geometry.coordinates), turf.polygon(_this.longRiverData[0])) : false
            if (isInPolygon && !_this.showMessage) {
              _this.showMessage = true
              _this.$message.warning({
                content: '警告⚠️',
                duration: 5
              })
            }
            // Request the next frame of animation so long the end has not been reached.
            if (counter < steps) {
              requestAnimationFrame(animate)
            }

            counter = counter + 1
          }
          document.getElementById('replay').addEventListener('click', function() {
            // Set the coordinates of the original point back to origin
            point.features[0].geometry.coordinates = origin

            // Update the source layer
            Map.getSource('point').setData(point)

            // Reset the counter
            counter = 0
            this.showMessage = false
            // Restart the animation.
            animate(counter)
          })
          animate(counter)
          Map.addLayer({
            id: 'route',
            source: 'route',
            type: 'line',
            paint: {
              'line-width': 0,
              'line-color': '#007cbf'
            }
          })
          //
          Map.addSource('320000', {
            type: 'geojson',
            data: data
          })
          console.log('2222', turf.rhumbDistance(origin, destination, { units: 'miles' }))

          Map.addLayer(
            {
              id: 'area',
              type: 'fill',
              source: '320000',
              layout: {},
              paint: {
                'fill-color': '#fff',
                'fill-outline-color': '#ccc'
              }
            },
            'landuse-residential'
          )
        })
    },
    mapLoaded(map) {
      Map = map
      this.ready = true
      this.initMap()
      loadRiverAndLake({
        page_size: 0,
        name: '长江'
      }).then(res => {
        console.log(res, 'reshhhhh')
        if (res.data.geo_info.features[0].geometry.coordinates) {
          this.longRiverData = res.data.geo_info.features[0].geometry.coordinates
          Map.addSource('longriver', {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'MultiPolygon',
                coordinates: this.longRiverData
              }
            }
          })
          Map.addLayer({
            id: 'longriver',
            type: 'line',
            source: 'longriver',
            layout: {},
            paint: {
              'line-color': 'blue'
            }
          })
        }
      })
      map.on('click', function(e) {
        console.log(e.lngLat, 'e.lngLat')
      })
    },
    nav(navId) {
      if (this.layerManager.currentNav === navId) {
        this.showInfoPanel = !this.showInfoPanel
        return
      }
      this.layerManager.currentNav = navId
      this.showInfoPanel = true
      // if (navId !== 2 && Map.getSource('21')) {
      //   Map.removeLayer('21')
      //   Map.removeSource('21')
      // }
      this.layerRadioHandle(this.baseData.layerItems[navId][0])
    },
    layerManagerHandle(layerItem) {
      this.clearSelect()
      if (!this.layerManager.existLayerGroup[layerItem.id]) {
        this.layerManager.existLayerGroup[layerItem.id] = {
          layerItem: layerItem
        }
      }
      for (const key in this.layerManager.existLayerGroup) {
        const intLayerId = parseInt(key)
        this.toggleLayer(
          this.layerManager.existLayerGroup[key].layerItem,
          this.layerManager.visibleLayerIds.includes(intLayerId),
          layerItem.extraLayer
        )
      }
    },
    toggleLayer(layerItem, isShow = true, extraLayer = false) {
      const layerGroup = this.layerManager.existLayerGroup[layerItem.id]
      if (isShow) {
        this.loadLayer(layerItem)
      } else {
        if (layerGroup.markerGroup) {
          layerGroup.markerGroup.forEach(marker => {
            marker.remove()
          })
          layerGroup.markerGroup.clear()
        }
      }
    },
    searchFilter(layerItem, searchName) {
      GetDataByLayer(layerItem.id, { station_name: searchName, name: searchName }).then(res => {
        this.tableList.data = res.data.list
        if (res.data.geo_info) {
          res.data.geo_info.features.forEach((item, index) => {
            this.tableList.data[index].coordinates = item.geometry.coordinates[0][0][0]
            this.tableList.data[index].name = item.properties.name
          })
        }
        this.layerManager.existLayerGroup[layerItem.id].markerGroup &&
          this.layerManager.existLayerGroup[layerItem.id].markerGroup.forEach(marker => {
            marker.remove()
          })
        this.layerManager.existLayerGroup[layerItem.id].markerGroup &&
          this.layerManager.existLayerGroup[layerItem.id].markerGroup.clear()
        if (res) {
          setTimeout(() => {
            this.renderLayer(layerItem, res)
          }, 100)
        }
      })
    },
    loadLayer(layerItem) {
      GetDataByLayer(layerItem.id).then(res => {
        if (res) {
          setTimeout(() => {
            this.renderLayer(layerItem, res)
          }, 100)
        }
      })
    },
    clearSelect() {},
    layerRadioHandle(layerItem) {
      if (this.layerManager.activeLayerItem.id === layerItem.id) {
        return
      }
      this.layerManager.activeLayerItem = layerItem
      this.layerManager.visibleLayerIds = [layerItem.id]
      this.layerManagerHandle(layerItem)
      this.renderTableList()
    },
    layerCheckboxHandle(e, layerItem) {
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
    // 加载河湖图层
    renderRiverLayer(sourceName, data) {
      const _this = this
      Map.addSource(sourceName, {
        type: 'geojson',
        data: data
      })
      Map.addLayer({
        id: sourceName,
        type: 'fill',
        source: sourceName,
        layout: {},
        paint: {
          'fill-color': '#BFDBF7',
          'fill-outline-color': '#ccc'
        }
      })
      // 添加事件监听
      Map.on('click', sourceName, function(e) {
        // 河湖点击展示
        console.log(e, 'dsdsddsdsds')
        // console.log(e.features[0])
        // console.log(e.features[0].properties.id, 'eeeeeee')
        const layerItem = {
          id: 11,
          name: '污染源',
          icon: '/icons/pollution.svg',
          bgColor: '#516c85',
          detailModal: 'lakeRiverDetail',
          detailTitle: '河湖详情'
        }
        _this.markerClick(e.features[0].properties.id, layerItem)
        // this.$refs.detailModal.showModal('', { detailModal: 'lakeRiverDetail' }, 'sssss')
      })
      Map.addSource(sourceName + 'text', {
        type: 'geojson',
        data: data
      })
      Map.addLayer({
        id: sourceName + 'text',
        type: 'symbol',
        source: sourceName,
        layout: {
          'text-field': ['get', 'name'],
          'text-size': 12
        },
        paint: {
          'text-color': '#3fd4a2'
        },
        maxzoom: 22,
        minzoom: 8
      })
    },
    // 渲染Layer
    renderLayer(layerItem, res) {
      console.log(layerItem.id, 'layerItem.id')
      this.showRainTimeRange = layerItem.id === 13
      switch (layerItem.id) {
        case 11: {
          res.data.list.forEach(v => {
            this.renderMarker(
              v.lon_lat,
              layerItem,
              v.pollution_id,
              layerItem.icon,
              layerItem.bgColor,
              v.pollution_name,
              `${v.pollution_type_name}`
            )
          })
          break
        }
        case 12: {
          res.data.list.forEach(v => {
            this.renderMarker(
              v.lon_lat,
              layerItem,
              v.monitoring_id,
              layerItem.icon,
              layerItem.bgColor,
              v.station_name,
              `上游：${v.up_value.toFixed(2)}m，下游：${v.down_value.toFixed(2)}m`
            )
          })
          break
        }
        case 13: {
          res.data.list.forEach(v => {
            this.renderMarker(
              v.lon_lat,
              layerItem,
              v.monitoring_id,
              layerItem.icon,
              layerItem.bgColor,
              v.station_name,
              `雨量：${v.value.toFixed(0)}mm`
            )
          })
          break
        }
        case 14: {
          res.data.list.forEach(v => {
            this.renderMarker(
              v.lon_lat,
              layerItem,
              v.id,
              layerItem.icon,
              layerItem.bgColor,
              v.station_name,
              `${v.station_type_name}`
            )
          })
          break
        }
        case 31: {
          res.data.list.forEach(v => {
            this.renderMarker(
              v.lon_lat,
              layerItem,
              v.get_water_id,
              layerItem.icon,
              layerItem.bgColor,
              v.name,
              `取水留量：${v.ammount}m<sup>3</sup>/s`
            )
          })
          break
        }
        case 32: {
          res.data.list.forEach(v => {
            this.renderMarker(
              v.lon_lat,
              layerItem,
              v.func_id,
              layerItem.icon,
              layerItem.bgColor,
              v.func_name,
              `水质目标：${v.water_target_name}`
            )
          })
          break
        }
        case 42: {
          res.data.list.forEach(v => {
            this.renderMarker(
              v.lon_lat,
              layerItem,
              v.fracture_id,
              layerItem.icon,
              layerItem.bgColor,
              '',
              `断面名称：${v.fracture_name}`
            )
          })
          break
        }
        case 81: {
          res.data.list.forEach(v => {
            this.renderMarker(
              v.lon_lat,
              layerItem,
              v.billboard_id,
              layerItem.icon,
              layerItem.bgColor,
              '公示牌',
              `${v.billboard_num}`
            )
          })
          break
        }
        case 51: {
          res.data.list.forEach(v => {
            this.renderMarker(
              v.lon_lat,
              { ...layerItem, value: v.in_river },
              v.sewage_id,
              layerItem.icon,
              layerItem.bgColor,
              v.sewage_name,
              `${v.in_river.toFixed(2)}t/a`
            )
          })
          break
        }
        case 61: {
          res.data.list.forEach(v => {
            this.renderMarker(v.lon_lat, layerItem, v.source_num, layerItem.icon, layerItem.bgColor, v.name, '')
          })
          break
        }
        case 62: {
          res.data.list.forEach(v => {
            this.renderMarker(v.lon_lat, layerItem, v.station_id, layerItem.icon, layerItem.bgColor, v.station_name, '')
          })
          break
        }
        case 21: {
          if (this.layerManager.visibleLayerIds.includes(21) && Map.getSource('21')) {
            Map.removeLayer('21')
            Map.removeLayer('21text')
            Map.removeSource('21')
            Map.removeSource('21text')
          }
          if (!this.layerManager.visibleLayerIds.includes(22) && Map.getSource('22')) {
            Map.removeLayer('22')
            Map.removeLayer('22text')
            Map.removeSource('22')
            Map.removeSource('22text')
          }
          if (!this.layerManager.visibleLayerIds.includes(23) && Map.getSource('23')) {
            Map.removeLayer('23')
            Map.removeLayer('23text')
            Map.removeSource('23')
            Map.removeSource('23text')
          }
          const data = {
            type: 'FeatureCollection',
            name: 'js',
            crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
            features: res.data.geo_info.features
          }
          this.renderRiverLayer('21', data)
          break
        }
        case 22: {
          if (this.layerManager.visibleLayerIds.includes(22) && Map.getSource('22')) {
            Map.removeLayer('22')
            Map.removeLayer('22text')
            Map.removeSource('22')
            Map.removeSource('22text')
          }
          if (!this.layerManager.visibleLayerIds.includes(21) && Map.getSource('21')) {
            Map.removeLayer('21')
            Map.removeLayer('21text')
            Map.removeSource('21')
            Map.removeSource('21text')
          }
          if (!this.layerManager.visibleLayerIds.includes(23) && Map.getSource('23')) {
            Map.removeLayer('23')
            Map.removeLayer('23text')
            Map.removeSource('23')
            Map.removeSource('23text')
          }
          const data = {
            type: 'FeatureCollection',
            name: 'js',
            crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
            features: res.data.geo_info.features
          }
          this.renderRiverLayer('22', data)
          break
        }
        case 23: {
          if (this.layerManager.visibleLayerIds.includes(23) && Map.getSource('23')) {
            Map.removeLayer('23')
            Map.removeLayer('23text')
            Map.removeSource('23')
            Map.removeSource('23text')
          }
          if (!this.layerManager.visibleLayerIds.includes(22) && Map.getSource('22')) {
            Map.removeLayer('22')
            Map.removeLayer('22text')
            Map.removeSource('22')
            Map.removeSource('22text')
          }
          if (!this.layerManager.visibleLayerIds.includes(21) && Map.getSource('21')) {
            Map.removeLayer('21')
            Map.removeLayer('21text')
            Map.removeSource('21')
            Map.removeSource('21text')
          }
          const data = {
            type: 'FeatureCollection',
            name: 'js',
            crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
            features: res.data.geo_info.features
          }
          this.renderRiverLayer('23', data)
          break
        }
        default: {
          // geoData.features.forEach((v) => {
          //   this.renderMarker(v.geometry.coordinates, layerItem, v.properties.id, '/icons/water-env.svg', '#3FD4B4', v.properties.name, '关键信息展示')
          // })
        }
      }
    },
    markerClick(dataId, layerItem) {
      if (layerItem.detailModal) {
        this.$refs.detailModal.showModal(dataId, layerItem, layerItem.detailTitle)
      }
    },
    // 渲染marker
    renderMarker(coordinates, layerItem, dataId, icon, bgColor, name = '取水口', info = '水量: 300 m<sup>2</sup>/h') {
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
      el.addEventListener('click', e => {
        e.stopPropagation()
        this.markerClick(dataId, layerItem)
      })
    },
    renderTableList() {
      this.tableList.data = []
      this.tableList.rowKey = GetTableRowKey(this.layerManager.activeLayerItem.id)
      this.tableList.columns = TableColumnsByLayer(this.layerManager.activeLayerItem.id)
      GetDataByLayer(this.layerManager.activeLayerItem.id).then(res => {
        this.tableList.data = res.data.list
        if (res.data.geo_info) {
          res.data.geo_info.features.forEach((item, index) => {
            this.tableList.data[index].coordinates = item.geometry.coordinates
            this.tableList.data[index].name = item.properties.name
          })
        }
      })
    },
    rowSelect(record) {
      if (record.lon_lat) {
        const coordinate = record.lon_lat
        Map.flyTo({
          center: coordinate,
          zoom: 13
        })
      }
      if (record.coordinates) {
        if (Map.getSource('highLigth')) {
          Map.removeLayer('highLigth')
          Map.removeSource('highLigth')
        }
        // 高亮显示当前多边形图层
        Map.addSource('highLigth', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'MultiPolygon',
              coordinates: record.coordinates
            }
          }
        })
        Map.addLayer({
          id: 'highLigth',
          type: 'line',
          source: 'highLigth',
          layout: {},
          paint: {
            'line-color': 'blue'
          }
        })
        // 定位多边形边界线
        const boundingBox = this.getBoundingBox(record.coordinates)
        Map.fitBounds([
          [boundingBox.xMin, boundingBox.yMin],
          [boundingBox.xMax, boundingBox.yMax]
        ])
      }
    },
    getBoundingBox(data) {
      var bounds = {}
      var coords
      var latitude
      var longitude
      for (var i = 0; i < data.length; i++) {
        coords = data
        coords[i].forEach(item => {
          item.forEach(value => {
            longitude = value[0]
            latitude = value[1]
            bounds.xMin = bounds.xMin < longitude ? bounds.xMin : longitude
            bounds.xMax = bounds.xMax > longitude ? bounds.xMax : longitude
            bounds.yMin = bounds.yMin < latitude ? bounds.yMin : latitude
            bounds.yMax = bounds.yMax > latitude ? bounds.yMax : latitude
          })
        })
      }
      return bounds
    },
    customRow(record, index) {
      return {
        on: {
          click: () => {
            this.rowSelect(record)
            this.$set(this.tableList.options.rowSelection.selectedRowKeys, 0, record[this.rowKey])
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@primary-map-color: #3fd4a2;
.map {
  background-color: #fff;
  position: absolute;
  width: 100%;
  height: 100vh;
}

.map {
  .nav-map {
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
  .water-icons {
    position: absolute;
    right: 320px;
    bottom: 5%;
    // transform: translateX(50%);
    z-index: 999;
    display: flex;
    justify-content: flex-start;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.4);
    border-radius: 2px;
  }
}

.nav-map-item {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 8px 5px 5px 5px;
  font-size: 24px;
  color: #7f91a5;
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
  background-color: #ecf6ff;
}

.nav-map-item.active {
  color: @primary-color;
  background-color: #ecf6ff;
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
  border-left: 1px solid #e5e9ed;
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
  border: 1px solid #e5e9ed;
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
  background-color: #ffffff;
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
.overlay {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;
}

.overlay button {
  font: 600 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  background-color: #3386c0;
  color: #fff;
  display: inline-block;
  margin: 0;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 3px;
}
.overlay button:hover {
  background-color: #4ea0da;
}
</style>
