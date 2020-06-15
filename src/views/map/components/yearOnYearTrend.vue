<template>
  <div class="attribute-trend">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item label="时间" style="margin-bottom: 0">
              <a-select v-model="queryParam.start_time" @change="drawStartLine">
                <a-select-option v-for="item in years" :key="item" :value="item">
                  {{ item }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="" style="margin-bottom: 0">
              <a-select v-model="queryParam.end_time" @change="drawEndLine">
                <a-select-option v-for="item in years" :key="item" :value="item">
                  {{ item }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="维度" style="margin-bottom: 0; z-index: 110000">
              <dictionary-select
                v-model="queryParam.indicator"
                :insert-option-all="false"
                :select-first="true"
                :dictionary-type="DictionaryEnum.FUNC_INDICATOR">
              </dictionary-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div id="year-on-year-chart"></div>
  </div>
</template>

<script>
import { waterFunTrend } from '@/api/mapServer'
var echarts = require('echarts/lib/echarts')
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      queryParam: {
        start_time: '',
        end_time: '',
        indicator: 1
      },
      myChart: null,
      lineTimeData: [],
      lineDataOne: [],
      lineDataTwo: [],
      years: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020']
    }
  },
  watch: {
    'queryParam.indicator': {
      handler (v) {
        this.drawStartLine()
        this.drawEndLine()
      },
      deep: true
    }
  },
  created () {
    this.$nextTick().then(() => {
      this.myChart = echarts.init(document.getElementById('year-on-year-chart'))
      this.loadChart()
    })
  },
  methods: {
    drawStartLine () {
      const params = {
        id: this.id,
        indicator: this.queryParam.indicator,
        start_time: `${this.queryParam.start_time}-01-01`,
        end_time: `${this.queryParam.start_time}-12-31`
      }
      waterFunTrend(params).then((res) => {
        if (res.data.length > 0) {
          this.lineTimeData = res.data.map(item => item.collect_time.split('-')[1])
          this.lineDataOne = res.data.map(item => item.value)
        } else {
          this.lineDataOne = []
        }
        this.loadChart()
      })
    },
    drawEndLine () {
      const params = {
        id: this.id,
        indicator: this.queryParam.indicator,
        start_time: `${this.queryParam.end_time}-01-01`,
        end_time: `${this.queryParam.end_time}-12-31`
      }
      waterFunTrend(params).then((res) => {
        if (res.data.length > 0) {
          this.lineTimeData = res.data.map(item => item.collect_time.split('-')[1])
          this.lineDataTwo = res.data.map(item => item.value)
        } else {
          this.lineDataTwo = []
        }
        this.loadChart()
      })
    },
    loadChart () {
      var option = {
        title: {
          text: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          padding: [2, 10],
          textStyle: {
            fontSize: 16
          },
          formatter: (params) => {
            console.log(params, 'params')
            let str = ''
            params.forEach((item) => {
              if (item.seriesIndex === 0) {
                str += '<p>' + this.queryParam.start_time + ': ' + item.data + '</p>'
              } else {
                str += '<p>' + this.queryParam.end_time + ': ' + item.data + '</p>'
              }
            })
            return str
          }
        },
        xAxis: {
          type: 'category',
          name: '月份',
          splitLine: {
            show: false
          },
          data: this.lineTimeData
        },
        grid: {
          left: '2%',
          right: '4%',
          bottom: '4%',
          containLabel: true
        },
        yAxis: {
          type: 'value',
          name: '数值',
          splitLine: {
            show: false
          },
          axisTick: {
            lineStyle: {
              width: 1
            }
          },
          axisLabel: {
            fontWeight: 'bold'
          }
        },
        series: [
          {
            type: 'line',
            data: this.lineDataOne
          },
          {
            type: 'line',
            data: this.lineDataTwo
          }
        ]
      }
      this.myChart.setOption(option, true)
    }
  }
}
</script>

<style lang="less" scoped>
.attribute-trend {
  height: 100%;
  width: 100%;
  #year-on-year-chart {
    width: 100%;
    height: calc(100% - 35px);
  }
}
</style>
