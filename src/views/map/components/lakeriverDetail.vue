<template>
  <div>
    <a-spin >
      <div class="detail-info">
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">污染源编号：</div>
              <div class="value">1111</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">污染源名称：</div>
              <div class="value">2222</div>
            </div>
          </a-col>
        </a-row>

      </div>
      <div class="map-container">
        <div
          style="width: 100%;height: 100%"
          id="pollutionMap">
        </div>
      </div>
    </a-spin>
  </div>
</template>
<script>
import { getSingleriverlake } from '@api/riverlakemanage'
export default {
  data () {
    return {}
  },
  components: {
    getSingleriverlake
  },
  created () {
    // this.confirmLoading = true
    getSingleriverlake(this.id).then(res => {
      console.log(res)
    })
  },
  methods: {

  }
}
</script>
