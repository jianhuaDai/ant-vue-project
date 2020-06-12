<template>
  <div class="detail-box">
    <getWaterFunAttrbute :infoDetail="infoDetail"></getWaterFunAttrbute>
    <div>
      <a-tabs type="card">
        <a-tab-pane key="1" tab="水质详情">
          <div style="width: 100%; height: 300px;">
            <waterQuality :qualityInfo="qualityInfo"></waterQuality>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="属性趋势图">
          <div style="width: 100%; height: 300px;">
            <attributeTrend></attributeTrend>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="同比趋势图">
          <div style="width: 100%; height: 300px;">
            <yearOnYearTrend></yearOnYearTrend>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
import { oneWaterFun } from '@/api/waterfun'
import { waterQualityDetail } from '@/api/mapServer'
import getWaterFunAttrbute from './getWaterFunAttribute.vue'
import waterQuality from './waterQuality.vue'
import attributeTrend from './attributeTrend.vue'
import yearOnYearTrend from './yearOnYearTrend.vue'
export default {
  components: {
    getWaterFunAttrbute,
    waterQuality,
    attributeTrend,
    yearOnYearTrend
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      detailList: '',
      infoDetail: {},
      tabDatasource: {},
      startPoint: '',
      endPoint: '',
      qualityInfo: {}
    }
  },
  created () {
    this.loadDetailData()
  },
  methods: {
    loadDetailData () {
      oneWaterFun(this.id).then(res => {
        this.infoDetail = res.data
      })
      waterQualityDetail(this.id).then((res) => {
        this.qualityInfo = res.data
      })
    }
  }
}
</script>
<style lang="less" scoped>
.detail-box ::v-deep {
  width: 100%;
  .ant-descriptions-bordered {
    .ant-descriptions-item-label {
      padding: 5px 3px;
      width: 100px;
      white-space: pre-wrap;
      background: rgb(233, 235, 236);
    }
    .ant-descriptions-item-content {
      padding: 5px 3px;
      width: 50px;
      white-space: pre-wrap;
    }
  }
  .item-title {
    float: left;
    width: 110px;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
    color: #232c3d;
  }
}
</style>
