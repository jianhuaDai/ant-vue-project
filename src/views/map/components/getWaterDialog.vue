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
      <p class="chart-title">取水口取水量同比</p>
      <div style="width: 100%; height: 300px;" id="waterChart"></div>
    </div>
  </div>
</template>
<script>
import { getHehuanxian } from '@/api/inforserve'
var echarts = require('echarts/lib/echarts')
export default {
  components: {},
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
      myChart: null
    }
  },
  created () {
    this.loadDetailData()
    this.$nextTick(() => {
      this.loadCharts()
    })
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
    },
    loadCharts () {
      this.myChart = echarts.init(document.getElementById('waterChart'))
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '8%',
          right: '4%',
          bottom: '14%',
          top: '10%'
        },
        legend: {
          data: ['2018年', '2019年', '2020年'],
          // right: 10,
          bottom: '0',
          textStyle: {
            color: '#232C3D'
          },
          itemWidth: 12,
          itemHeight: 10
          // itemGap: 35
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
          axisLine: {
            lineStyle: {
              color: '#000'
            }
          },
          axisLabel: {
            textStyle: {
              fontFamily: 'Microsoft YaHei'
            }
          }
        },

        yAxis: {
          name: '单位/m³',
          type: 'value',
          max: '1200',
          axisLine: {
            show: false,
            lineStyle: {
              color: '#000'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.3)'
            }
          },
          axisLabel: {}
        },
        series: [
          {
            name: '2018年',
            type: 'bar',
            barWidth: '15%',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#fccb05'
                  },
                  {
                    offset: 1,
                    color: '#f5804d'
                  }
                ]),
                barBorderRadius: 12
              }
            },
            data: [400, 400, 300, 300, 300, 400, 400, 400, 300]
          },
          {
            name: '2019年',
            type: 'bar',
            barWidth: '15%',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#8bd46e'
                  },
                  {
                    offset: 1,
                    color: '#09bcb7'
                  }
                ]),
                barBorderRadius: 11
              }
            },
            data: [400, 500, 500, 500, 500, 400, 400, 500, 500]
          },
          {
            name: '2020年',
            type: 'bar',
            barWidth: '15%',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#248ff7'
                  },
                  {
                    offset: 1,
                    color: '#6851f1'
                  }
                ]),
                barBorderRadius: 11
              }
            },
            data: [400, 600, 700, 700, 1000, 400, 400, 600, 700]
          }
        ]
      }
      this.myChart.setOption(option, true)
    }
  }
}
</script>
<style lang="less" scoped>
.detail-box {
  width: 100%;
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
  font-size: 18px;
  font-weight: 600;
}
</style>
