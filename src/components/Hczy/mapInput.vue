<template>
  <div>
    <a-input v-model="location">
      <a-icon @click="showMap" slot="addonAfter" type="environment" :style="{ color: '#0D7DD9' }" />
    </a-input>
    <span class="tips" v-show="showTips">
      经纬度格式为: [***, ***]
    </span>
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
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      showMapDom: false,
      location: '',
      lng: '',
      lat: '',
      showTips: false
    }
  },
  created () {
    this.location = JSON.stringify(this.value)
  },
  watch: {
    location: {
      handler (val) {
        console.log(val, 'sdsadds')
        this.$emit('change', JSON.parse(val))
      }
    }
  },
  methods: {
    initMap () {
      console.log('111111111111111111111111')
      const map = new mapboxgl.Map({
        container: 'add-map',
        style: Style.chiefStyle,
        pitch: 0,
        attributionControl: false,
        center: [118.806266, 32.059868],
        zoom: 5,
        minZoom: 6,
        maxZoom: 22,
        token: MAPBOX_TOKEN
      })
      var marker = new mapboxgl.Marker({
        draggable: true
      })
      // 地图导航
      var _this = this
      var nav = new mapboxgl.NavigationControl()
      map.addControl(nav, 'top-left')
      setTimeout(() => {
        if (this.location !== '[]') {
          marker.setLngLat(JSON.parse(_this.location)).addTo(map)
        }
      }, 200)

      map.on('click', function (e) {
        _this.lng = e.lngLat.lng.toFixed(6)
        _this.lat = e.lngLat.lat.toFixed(6)
        marker.setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map)
      })
    },
    AddDraw () {
      this.location = JSON.stringify([this.lng * 1, this.lat * 1])
      this.$emit('change', [this.lng * 1, this.lat * 1])
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
.tips {
  position: absolute;
  width: 200px;
  left: 0;
  top: 30px;
  font-size: 12px;
  color: rgb(126, 120, 120);
}
</style>
