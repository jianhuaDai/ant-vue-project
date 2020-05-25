<template>
  <ve-histogram :colors="colors" :data="chartData" height="300px" :extend="extend" :settings="chartSettings"></ve-histogram>
</template>

<script>
  import { CITY_LIST } from '@/config/constant'
  const random = require('lodash/random')

  export default {
    created () {
      CITY_LIST.forEach((v) => {
        const deal = random(8000, 12000)
        const percent = random(0.75, 0.95, true)
        const total = Math.round(deal / percent)
        const noDeal = total - deal
        this.chartData.rows.push({
          '城市': v,
          '达标数': deal,
          '未达标': noDeal,
          '达标率': percent
        })
      })
    },
    data () {
      this.colors = ['#3FD4A2', '#6885B8', '#FF6010']
      this.chartSettings = {
        axisSite: { right: ['达标率'] },
        yAxisType: ['normal', 'percent'],
        yAxisName: ['达标数', '达标率'],
        showLine: ['达标率'],
        stack: { '水质': ['达标数', '未达标'] },
        dataType: {
          '达标率': 'percent'
        }
      }
      this.extend = {
        series (v) {
          v.forEach(i => {
            i.barWidth = 18
          })
          return v
        },
        grid: {
          bottom: 0
        },
        legend: {
          right: 0
        },
        yAxis: {
          axisTick: {
            show: false,
            lineStyle: {
              opacity: 0
            }
          }
        }
      }
      return {
        chartData: {
          columns: ['城市', '达标数', '未达标', '达标率'],
          rows: [
          ]
        }
      }
    }
  }
</script>
