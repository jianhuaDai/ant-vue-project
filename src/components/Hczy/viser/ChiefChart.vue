<template>
  <ve-histogram :data="chartData" height="300px" :extend="extend" :settings="chartSettings"></ve-histogram>
</template>

<script>
  import { CITY_LIST } from '@/config/constant'
  const random = require('lodash/random')
  export default {
    created () {
      CITY_LIST.forEach((v) => {
        const check = random(15, 25)
        const deal = random(40, 70)
        this.chartData.rows.push({
          '城市': v,
          '巡河次数': check,
          '事件完成': deal
        })
      })
    },
    data () {
      this.chartSettings = {
        yAxisType: ['normal'],
        yAxisName: ['数量']
        // showLine: ['达标率'],
        // stack: { '水质': ['达标数', '未达标'] },
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
          columns: ['城市', '巡河次数', '事件完成'],
          rows: [
          ]
        }
      }
    }
  }
</script>
