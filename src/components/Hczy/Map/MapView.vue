<template>
  <div id="mapView" class="map-view">
  </div>
</template>

<script>
  import { MAPBOX_TOKEN, Style } from './config'
  import mapboxgl from 'mapbox-gl'
  import { Scene, Zoom, Scale, PointLayer, PolygonLayer } from '@antv/l7'
  import { Mapbox } from '@antv/l7-maps'

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
        default: () => {}
      }
    },
    mounted () {
      this.initMap()
    },
    methods: {
      initMap () {
        const options = { ...{
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
          ...this.options }

        // {
        //   container: 'mapView',
        //     style: this.options.styleUrl,
        //   pitch: this.options.pitch,
        //   bearing: this.options.bearing,
        //   center: this.options.center,
        //   zoom: this.options.zoom,
        //   minZoom: this.options.minZoom,
        //   maxZoom: this.options.maxZoom,
        //   token: MAPBOX_TOKEN
        // }
        const map = new mapboxgl.Map({ ...options, ...{ container: 'mapView', token: MAPBOX_TOKEN } })
        this.scene = new Scene({
          id: 'mapView',
          logoVisible: false,
          map: new Mapbox({
            mapInstance: map
          })

        })
        // this.scene.addControl(new Zoom({
        //   position: 'topleft'
        // }))
        // this.scene.addControl(new Scale({
        //   position: 'bottomleft'
        // }))
        map.on('load', () => {
          this.$emit('mapLoad', map)
        })
        this.scene.on('loaded', () => {
          this.$emit('loaded', this.scene)
        })

        // const nav = new mapboxgl.NavigationControl()
        // this.scene.map.addControl(nav, 'bottom-right')
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
