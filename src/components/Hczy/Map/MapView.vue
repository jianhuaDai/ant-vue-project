<template>
  <div id="mapView" class="map-view">
  </div>
</template>

<script>
  import { MAPBOX_TOKEN, Style } from './config'
  import mapboxgl from 'mapbox-gl'
  import { Scene } from '@antv/l7'
  import { Mapbox } from '@antv/l7-maps'
  import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
  import MapboxDraw from '@mapbox/mapbox-gl-draw'

  export default {
    name: 'MapView',
    data () {
      return {
        scene: null
      }
    },
    props: {
      options: {
        type: Object,
        default: () => {
        }
      },
      drawOptions: {
        type: Object,
        default: () => null
      }
    },
    mounted () {
      this.initMap()
    },
    methods: {
      initMap () {
        const options = {
          ...{
            center: [
              119.91202398644623,
              32.41659873015716
            ],
            style: Style.chiefStyle,
            zoom: 6.5,
            minZoom: 6,
            maxZoom: 18,
            pitch: 0,
            bearing: 0,
            attributionControl: false
          },
          ...this.options
        }
        const map = new mapboxgl.Map({ ...options, ...{ container: 'mapView', token: MAPBOX_TOKEN } })
        this.scene = new Scene({
          id: 'mapView',
          logoVisible: false,
          map: new Mapbox({
            mapInstance: map
          })
        })

        // 添加地图编辑组件
        if (this.drawOptions) {
          const drawOptions = {
            ...{
              position: 'top-right',
              displayControlsDefault: false,
              controls: { point: true, trash: true, polygon: true, line_string: true }
            },
            ...this.drawOptions
          }
          this.scene.mapDraw = new MapboxDraw({
            displayControlsDefault: drawOptions.displayControlsDefault,
            controls: drawOptions.controls
          })
          this.scene.map.addControl(this.scene.mapDraw, drawOptions.position)
          this.scene.map.on('draw.delete', (e) => {
            this.$emit('draw.delete', e)
          })
          this.scene.map.on('draw.create', (e) => {
            this.$emit('draw.create', e)
          })
        }
        // 地图加载、场景加载事件
        map.on('load', () => {
          this.$emit('mapLoad', map)
        })
        this.scene.on('loaded', () => {
          this.$emit('loaded', this.scene)
        })
      },
      getScene () {
        return this.scene
      }
    }
  }
</script>

<style scoped>
  .map-view {
    width: 100%;
    height: 100%;
  }
</style>
