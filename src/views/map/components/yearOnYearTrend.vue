<template>
  <div class="year-on-year-trend">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="12" :sm="24">
            <a-form-item label="时间" style="margin-bottom: 0">
              <a-range-picker :mode="queryParam.time" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="浑浊度" style="margin-bottom: 0; z-index: 110000">
              <a-select v-model="queryParam.status" placeholder="请选择">
                <a-select-option value="">全部</a-select-option>
                <a-select-option :value="1">未制定方案</a-select-option>
                <a-select-option :value="2">已制定方案</a-select-option>
                <a-select-option :value="3">已完成</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <div style="float: right">
              <a-button type="primary">查询</a-button>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div id="year-on-year-trend-chart"></div>
  </div>
</template>

<script>
var echarts = require('echarts/lib/echarts')
export default {
  data () {
    return {
      queryParam: {
        time: [],
        status: 1
      },
      myChart: null
    }
  },
  created () {
    this.$nextTick().then(() => {
      this.myChart = echarts.init(document.getElementById('year-on-year-trend-chart'))
      this.loadChart()
    })
  },
  methods: {
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
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              width: 3
            }
          },
          axisTick: {
            show: true,
            alignWithLabel: true,
            lineStyle: {
              width: 3
            }
          },
          axisLabel: {
            rotate: 45,
            fontWeight: 'bold',
            formatter: function (value) {
              return value.split(' ')[1]
            }
          },
          data: [
            '2017-09-11 16:23:34',
            '2017-09-11 16:28:34',
            '2017-09-11 16:33:34',
            '2017-09-11 16:38:34',
            '2017-09-11 16:43:34',
            '2017-09-11 16:48:34',
            '2017-09-11 16:53:34'
          ]
        },
        grid: {
          left: '2%',
          right: '4%',
          bottom: '4%',
          containLabel: true
        },
        visualMap: [
          {
            show: false,
            pieces: [
              {
                gt: 0,
                lte: 100,
                color: 'red'
              },
              {
                gt: 100,
                color: 'blue'
              }
            ],
            seriesIndex: 1
          },
          {
            show: false,
            pieces: [
              {
                gt: 0,
                lte: 80,
                color: 'yellow'
              },
              {
                gt: 80,
                color: 'blue'
              }
            ],
            seriesIndex: 0
          }
        ],
        yAxis: {
          type: 'value',
          name: 'M',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              width: 3,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'red'
                  },
                  {
                    offset: 1,
                    color: 'blue'
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            }
          },
          axisTick: {
            lineStyle: {
              width: 3
            }
          },
          axisLabel: {
            fontWeight: 'bold'
          }
        },
        series: [
          {
            type: 'line',
            symbol: 'circle',
            symbolSize: 10,
            animationDuration: 2000,
            itemStyle: {
              normal: {
                color: 'rgb(103, 99, 99)',
                shadowBlur: 2,
                shadowColor: 'rgba(0, 0, 0, .12)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
              }
            },
            lineStyle: {
              normal: {
                width: 3,
                shadowColor: 'rgba(0,0,0,0.4)',
                shadowBlur: 10,
                shadowOffsetX: 4,
                shadowOffsetY: 10
              }
            },
            data: [120, 90, 34, 65, 89, 201, 130],
            markLine: {
              silent: true,
              data: [
                {
                  yAxis: 100
                }
              ]
            },
            markPoint: {
              label: {
                normal: {
                  show: true,
                  align: 'center',
                  color: 'WHITE',
                  fontWeight: 100,
                  formatter: '{b}'
                }
              },
              itemStyle: {
                normal: {
                  color: {
                    type: 'radial',
                    x: 0.4,
                    y: 0.4,
                    r: 0.9,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#51e0a2'
                      },
                      {
                        offset: 1,
                        color: 'rgb(33,150,243)'
                      }
                    ],
                    globalCoord: false
                  },
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                  shadowBlur: 10
                }
              },
              data: [
                {
                  name: '触发',
                  value: 120,
                  coord: [0, 120]
                }
              ]
            }
          }
        ]
      }
      this.myChart.setOption(option, true)
    }
  }
}
</script>

<style lang="less" scoped>
.year-on-year-trend {
  height: 100%;
  width: 100%;
  #year-on-year-trend-chart {
    width: 100%;
    height: calc(100% - 35px);
  }
}
</style>
