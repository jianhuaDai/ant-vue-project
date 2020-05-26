<template>
  <div class="detail-box">
    <div>
      <a-row :gutter="24">
        <a-col :span="12">
          <div class="item-title">取水口编号:</div>
          <div class="item-content">{{ infoDetail.line_name }}</div>
        </a-col>
        <a-col :span="12">
          <div class="item-title">取水口名称:</div>
          <div class="item-content">{{ infoDetail.line_num }}</div>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <div class="item-title">位置:</div>
          <div class="item-content">{{ infoDetail.management_unit }}</div>
        </a-col>
        <a-col :span="12">
          <div class="item-title">所属区域:</div>
          <div class="item-content">{{ infoDetail.location_info }}</div>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <div class="item-title">经纬度:</div>
          <div class="item-content">{{ this.startPoint }}</div>
        </a-col>
        <a-col :span="12">
          <div class="item-title">取水量:</div>
          <div class="item-content">111T</div>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <div class="item-title">取水方式:</div>
          <div class="item-content">{{ infoDetail.line_length }}</div>
        </a-col>
        <a-col :span="12">
          <div class="item-title">取水水源类型:</div>
          <div class="item-content"></div>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <div class="item-title">取水用途:</div>
          <div class="item-content">{{ infoDetail.line_length }}</div>
        </a-col>
        <a-col :span="12">
          <div class="item-title">规模类型:</div>
          <div class="item-content"></div>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <div class="item-title">供水范围:</div>
          <div class="item-content">{{ infoDetail.line_length }}</div>
        </a-col>
        <a-col :span="12">
          <div class="item-title">开始取水时间:</div>
          <div class="item-content"></div>
        </a-col>
      </a-row>
      <p></p>
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
import waterQuality from './waterQuality.vue'
import attributeTrend from './attributeTrend.vue'
import yearOnYearTrend from './yearOnYearTrend.vue'
export default {
  components: {
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
}
.title-detail {
  height: 50px;
  width: 100%;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}
.item-title {
  float: left;
  width: 110px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #232C3D;
}
.chart-title {
  margin: 0 0 0 10px;
  font-size: 14px;
  font-weight: 600;
}
</style>
