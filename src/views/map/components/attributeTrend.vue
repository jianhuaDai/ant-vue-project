<template>
  <div class="attribute-trend">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="12" :sm="24">
            <a-form-item label="时间" style="margin-bottom: 0">
              <a-range-picker v-model="queryParam.time" @change="timeChange" valueFormat="YYYY-MM-DD">
              </a-range-picker>
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
    <div id="attribute-trend-chart"></div>
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
        time: [],
        indicator: 1
      },
      myChart: null,
      lineData: [],
      lineTimeData: []
    }
  },
  watch: {
    'queryParam.indicator': {
      handler (v) {
        this.timeChange()
      }
    }
  },
  created () {
    this.$nextTick().then(() => {
      this.myChart = echarts.init(document.getElementById('attribute-trend-chart'))
      this.loadChart()
    })
  },
  methods: {
    timeChange () {
      console.log(this.queryParam.time, 'time')
      const params = {
        id: this.id,
        indicator: this.queryParam.indicator,
        start_time: this.queryParam.time[0],
        end_time: this.queryParam.time[1]
      }
      waterFunTrend(params).then((res) => {
        this.lineTimeData = res.data.map((item) => {
          return item.collect_time
        })
        this.lineData = res.data.map(res => res.value)
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
            data: this.lineData
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
  #attribute-trend-chart {
    width: 100%;
    height: calc(100% - 35px);
  }
}
</style>
