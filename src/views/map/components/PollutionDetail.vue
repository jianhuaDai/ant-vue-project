<template>
  <div>
    <a-spin :spinning="confirmLoading">
      <div class="detail-info">
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">污染源编号：</div>
              <div class="value">{{ form.pollution_num }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">污染源名称：</div>
              <div class="value">{{ form.pollution_name }}</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">污染源类型：</div>
              <div class="value">{{ form.pollution_type_name }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">发现时间：</div>
              <div class="value">{{ form.discover_time }}</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">所属河道：</div>
              <div class="value">{{ form.water_name }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">所属区域：</div>
              <div class="value">{{ form.regionalism_name }}</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">关注级别：</div>
              <div class="value">{{ form.attention_level_name }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">所属河长：</div>
              <div class="value">{{ form.chief_name }}</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">详细地址：</div>
              <div class="value">{{ form.location }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">经纬度：</div>
              <div class="value">{{ form.lon_lat&&form.lon_lat.toString() }}</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="24">
            <div class="detail-item">
              <div class="title">影响范围：</div>
              <div class="value">{{ form.range }}</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="24">
            <div class="detail-item">
              <div class="title">治理情况：</div>
              <div class="value">正在治理中，预计3天恢复</div>
            </div>
          </a-col>
        </a-row>

      </div>
      <div class="map-container">
        <div style="width: 100%;height: 100%" id="pollutionMap">
        </div>
        <!--        <mapbox-view-->
        <!--          ref="map"-->
        <!--          @mapLoaded="mapLoaded"-->
        <!--          :options="mapOptions">-->
        <!--        </mapbox-view>-->
      </div>
    </a-spin>
  </div>
</template>

<script>
  import { getPollutionDetail } from '@/api/mapServer'
  import MapboxView from '@/components/Hczy/Map/MapboxView'
  import 'mapbox-gl/dist/mapbox-gl.css'
  import mapboxgl from 'mapbox-gl'

  const MAPBOX_TOKEN = 'pk.eyJ1IjoiZmFuZ25hbnh4IiwiYSI6ImNqdmU2OWVuYTF5enI0ZHBmMjVkM3V4MDEifQ.lE08N8pOvVxWtKBzNS1PUg'

  const d3 = { ...{}, ...require('d3'), ...require('d3-geo') }
  export default {
    name: 'PollutionDetail',
    created () {
      this.confirmLoading = true
      getPollutionDetail(this.id).then(res => {
        this.form = res.data
        this.confirmLoading = false
      })
    },
    mounted () {
      this.initMap()
    },
    methods: {
      initMap () {
        this.map = new mapboxgl.Map({
          center: [
            119.91202398644623,
            32.41659873015716
          ],
          style: '/bright',
          zoom: 6.5,
          minZoom: 6,
          maxZoom: 18,
          pitch: 0,
          bearing: 0,
          attributionControl: false,
          container: 'pollutionMap',
          token: MAPBOX_TOKEN
        })
        this.map.on('load', () => {
          this.mapLoaded()
        })
      },
      mapLoaded () {
        fetch('/data/CJ_River.geojson').then(res => res.json()).then(data => {
          this.renderPollution(data)
        })
      },
      renderPollution (riverGeoData, pollutionPoint = [118.6776, 32.0352], effectRadius = 90) {
        this.map.flyTo({
          center: pollutionPoint,
          zoom: 11
        })
        const width = 400
        const gridSize = 1 // 小网格宽度
        // 计算距离
        function distance (p1, p2) {
          return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2))
        }

        const projection = d3.geoIdentity().reflectY(true).fitWidth(width, riverGeoData)
        const path = d3.geoPath(projection)
        const height = Math.ceil(d3.geoPath(projection).bounds(riverGeoData)[1][1])
        const pointXY = projection(pollutionPoint)
        const colors = ['#800026', '#bd0026', '#e31a1c', '#fc4e2a', '#fd8d3c', '#feb24c', 'rgba(254,217,118,0.5)']
        const pollutionDomain = [0, effectRadius]
        const mesh = [width / gridSize, Math.ceil((height - pointXY[1]) / gridSize)]
        const pointScale = d3.scaleLinear()
          .domain(pollutionDomain)
          .range([0, 1])
        const linearColorScale = d3.scaleLinear()
          .domain(d3.range(0, 1, 1 / colors.length))
          .range(colors)
          .interpolate(d3.interpolateLab)
        const meshData = []
        // 构造网格数据
        for (let n = 0; n < mesh[1]; n++) {
          for (let m = 0; m < mesh[0]; m++) {
            const point = [m * gridSize, n * gridSize + pointXY[1]]
            const distancePollution = distance(pointXY, point)
            const color = distancePollution > effectRadius ? 'transparent' : linearColorScale(pointScale(distancePollution))
            meshData.push({
              x: point[0],
              y: point[1],
              color: color,
              distance: distancePollution
            })
          }
        }
        // canvas 绘制
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const context = canvas.getContext('2d')
        context.canvas.style.background = 'transparent'
        context.beginPath()
        path.context(context)
        path(riverGeoData)
        context.lineWidth = 0
        context.fillStyle = 'transparent'
        context.strokeStyle = 'transparent'
        context.fill()
        context.stroke()
        context.clip()
        context.closePath()
        // 绘制污染源
        // context.beginPath()
        // context.arc(pointXY[0], pointXY[1], 4, 0, (Math.PI / 180) * 360)
        // context.fillStyle = 'pink'
        // context.fill()
        // context.stroke()
        // context.closePath()
        context.beginPath()
        meshData.forEach((d, i) => {
          context.fillStyle = d.color
          context.fillRect(d.x, d.y, gridSize, gridSize)
        })
        context.closePath()
        // canvas render to map
        this.map.addSource('canvas-source', {
          type: 'canvas',
          canvas: canvas,
          coordinates: [projection.invert([0, 0]), projection.invert([width, 0]), projection.invert([width, height]), projection.invert([0, height])]
        })
        this.map.addLayer({
          id: 'canvas-layer',
          type: 'raster',
          source: 'canvas-source'
        })
      }
    },
    components: {
      MapboxView
    },
    props: {
      id: {
        type: null,
        default: null
      }
    },
    data: function () {
      return {
        Map: null,
        mapOptions: {
          pitch: 0,
          zoom: 9,
          style: '/bright2'
        },
        form: {},
        confirmLoading: false
      }
    }
  }
</script>

<style lang="less" scoped>
  .detail-info {
    padding: 0 24px;
  }

  .detail-item {
    display: flex;
    width: 100%;
    min-height: 40px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.7);
    align-items: baseline;

    .title {
      flex: 0 0 100px;
      font-weight: bolder;
    }

    .value {
      flex: 1 0;
    }

    sup {
      font-size: 12px;
    }
  }

  .map-container {
    /*margin-top: 24px;*/
    padding: 0;
    height: 300px;
    width: 80%;
    border: 1px solid #eee;
  }
</style>
