<template>
  <div :id="id" class="map-view" :style="{backgroundColor:backgroundColor}" v-html="el">
  </div>
</template>

<script>
  import 'mapbox-gl/dist/mapbox-gl.css'
  import mapboxgl from 'mapbox-gl'

  const MAPBOX_TOKEN = 'pk.eyJ1IjoiZmFuZ25hbnh4IiwiYSI6ImNqdmU2OWVuYTF5enI0ZHBmMjVkM3V4MDEifQ.lE08N8pOvVxWtKBzNS1PUg'
  export default {
    name: 'MapboxView',
    data () {
      return {
        map: null,
        id: 'mapView',
        el: null
      }
    },
    props: {
      options: {
        type: Object,
        default: () => {
        }
      },
      backgroundColor: {
        type: String,
        default: '#FFFFFF'
      }
    },
    created () {
      this.id = `${Math.random() * 1000}`
      this.el = document.createElement('div')
      this.el.className = 'map-view'
      console.log('el:', this.el)
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
            style: '/bright',
            zoom: 6.5,
            minZoom: 6,
            maxZoom: 18,
            pitch: 0,
            bearing: 0,
            attributionControl: false
          },
          ...this.options
        }
        const map = new mapboxgl.Map({ ...options, ...{ container: this.id, token: MAPBOX_TOKEN } })
        // 地图加载、场景加载事件
        map.on('load', () => {
          this.$emit('mapLoaded', map)
        })
        map.on('resize', (eventData) => {
          if (!eventData.manualTrigger) {
            setTimeout(() => {
              map.resize({ manualTrigger: true })
            }, 1)
          }
        })
      },
      getMap () {
        return this.map
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
