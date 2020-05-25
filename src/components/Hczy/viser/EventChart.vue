<template>
  <ve-histogram :colors="colors" :data="chartData" height="300px" :extend="extend" :settings="chartSettings"></ve-histogram>
</template>

<script>
  import { CITY_LIST } from '@/config/constant'
  const random = require('lodash/random')
  export default {
    created () {
      CITY_LIST.forEach((v) => {
        const deal = random(80, 120)
        const percent = random(0.7, 0.9, true)
        const total = Math.round(deal / percent)
        const noDeal = total - deal
        this.chartData.rows.push({
          '城市': v,
          '已处理': deal,
          '未处理': noDeal,
          '处理率': percent
        })
      })
    },
    data () {
      this.colors = ['#3FD4A2', '#6885B8', '#FF6010']
      this.chartSettings = {
        axisSite: { right: ['处理率'] },
        yAxisType: ['normal', 'percent'],
        yAxisName: ['数量', '处理率'],
        showLine: ['处理率'],
        stack: { '事件': ['已处理', '未处理'] },
        dataType: {
          '处理率': 'percent'
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
        yAxis: [{
          axisTick: {
            show: false
          }
        }]
      }
      return {
        chartData: {
          columns: ['城市', '已处理', '未处理', '处理率'],
          rows: [
          ]
        }
      }
    }
  }
</script>
