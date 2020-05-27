<template>
  <div class="detail-box">
    <getWaterFunAttrbute :infoDetail="infoDetail"></getWaterFunAttrbute>
    <div>
      <a-tabs type="card">
        <a-tab-pane key="1" tab="水质详情">
          <div style="width: 100%; height: 300px;">
            <waterQuality></waterQuality>
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
import { getHehuanxian } from '@/api/inforserve'
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
      endPoint: ''
    }
  },
  created () {
    this.loadDetailData()
  },
  methods: {
    loadDetailData () {
      // var reqData = {
      //   page: '1',
      //   page_size: '10',
      //   keyword: '',
      //   city_id: '3201'
      // }
      var reqData = {
        id: this.id
      }
      getHehuanxian(reqData).then(res => {
        this.infoDetail = res.data.list[0]
        this.tabDatasource = res.data.list[0].affiliate_tab[0]
        this.startPoint = this.infoDetail.geo_info.substring(1, 39)
        this.endPoint = this.infoDetail.geo_info.substring(
          this.infoDetail.geo_info.length - 41,
          this.infoDetail.geo_info.length - 1
        )
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
