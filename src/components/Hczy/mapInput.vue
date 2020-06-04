<template>
  <div>
    <a-input v-model="location" disabled>
      <a-icon @click="showMap" slot="addonAfter" type="search" :style="{ color: '#0D7DD9' }" />
    </a-input>
    <div id="distance" class="distance-container" v-show="showMapDom"></div>
    <div class="add-mask" v-show="showMapDom"></div>
    <div class="add-map-box" v-if="showMapDom">
      <div id="add-map" class="map-view" style="width:100%;height:428px"></div>
      <div class="add-map-submit">
        <a-button class="add-map-submit-btn" type="primary" @click="AddDraw" :disabled="!lat">确定</a-button>
        <a-button class="add-map-submit-btn" @click="cancelAddDraw">取消</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { MAPBOX_TOKEN, Style } from '@/components/Hczy/Map/config'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
export default {
  name: 'MapInput',
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      showMapDom: false,
      location: '',
      lng: '',
      lat: ''
    }
  },
  created () {
    this.location = ''
  },
  methods: {
    initMap () {
      const map = new mapboxgl.Map({
        container: 'add-map',
        style: Style.chiefStyle,
        pitch: 0,
        attributionControl: false,
        center: [118.806266, 32.059868],
        zoom: 5,
        minZoom: 6,
        maxZoom: 10,
        token: MAPBOX_TOKEN
      })
      var marker = new mapboxgl.Marker({
        draggable: true
      })
      // 地图导航
      var _this = this
      var nav = new mapboxgl.NavigationControl()
      map.addControl(nav, 'top-left')
      map.on('click', function (e) {
        console.log(e.lngLat.lng, 'e.lngLat.lng.')
        _this.lng = e.lngLat.lng.toFixed(6)
        _this.lat = e.lngLat.lat.toFixed(6)
        marker.setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map)
      })
    },
    AddDraw () {
      this.location = this.lng + ', ' + this.lat
      this.$emit('change', this.location)
      this.showMapDom = false
    },
    cancelAddDraw () {
      this.showMapDom = false
    },
    showMap () {
      this.showMapDom = true
      setTimeout(() => {
        this.initMap()
      }, 500)
    }
  }
}
</script>

<style scoped>
.add-map-box {
  position: fixed;
  width: 648px;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px 20px 0;
  z-index: 4000;
}
.add-map-submit {
  height: 52px;
  padding: 10px 0 0;
}
.add-map-submit-btn {
  float: right;
  margin-left: 20px;
}
</style>
