<template>
  <div style="padding:0px 0px 10px 0px;">
    <a-row>
      <a-col :span="24">
        <div style="height:45px;background:#0D7DD9;">
          <span style="line-height:45px;color:white;margin-left:16px;font-size:16px;">{{ name }}</span>
        </div>
        <a-tabs defaultActiveKey="1">
          <a-tab-pane key="1">
            <span slot="tab">
              水情
            </span>
            <div style="padding: 0 10px">
              <div
                id="echartdiv"
                style="height:200px;"></div>
              <div class="centerdiv">
                <span class="span_content">闸上水位:</span>
                <span class="span_content2">9m</span>
                <span class="span_content3">闸下水位:</span>
                <span class="span_content2">5m</span>
                <span class="span_centent4">04-26 11:00</span>
              </div>
              <div class="bottomdiv">
                <table
                  class="table"
                  border="36"
                  cellpadding="8">
                  <tr>
                    <th
                      colspan="2"
                      class="title">水位</th>
                    <th class="title">发生时间</th>
                    <th
                      colspan="2"
                      class="title">水位</th>
                    <th class="title">发生时间</th>
                  </tr>
                  <tr>
                    <td class="title">今日最高</td>
                    <td class="table_content">---m</td>
                    <td class="table_content">-- -- -- ---</td>
                    <td class="title">今日最低</td>
                    <td class="table_content">---m</td>
                    <td class="table_content">-- -- -- ---</td>
                  </tr>
                  <tr>
                    <td class="title">历史最高</td>
                    <td class="table_content">15m</td>
                    <td class="table_content">2019-12-26 05:55</td>
                    <td class="title">历史最低</td>
                    <td class="table_content">7.12m</td>
                    <td class="table_content">2019-12-17 15:20</td>
                  </tr>
                </table>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane
            tab="剖面图"
            key="2"
            forceRender>Content of Tab Pane 2</a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { getArea, getGongshipai } from '@/api/gongshpaimanage'
// import details from '@/views/gongshipaimanage/gongshipaimanage/detailView.vue'
var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
export default {
  components: {
    getArea,
    getGongshipai
  },
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  created () {
    this.loadEchart()
  },
  mounted () {
    // this.$store.commit('changeBreaderList', ['岸线开发', '规划信息'])
  },
  methods: {
    detailRow () {
      this.visible5 = true
      setTimeout(() => {
        this.loadEchart()
      }, 500)
    },
    handleCancelDetail () {
      this.visible5 = false
    },
    loadEchart () {
      this.$nextTick(() => {
        this.myChart = echarts.init(document.getElementById('echartdiv'))
        const option = {
          title: {
            text: '折线图堆叠'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['今日降水及水位过程线'],
            textStyle: { // 图例文字的样式
              color: '#0D7DD9',
              fontSize: 12
            }
          },
          // grid: {
          //   left: '3%',
          //   right: '4%',
          //   bottom: '3%',
          //   containLabel: true
          // },
          grid: {
            // 显示数据的图表位于当前canvas的坐标轴
            x: 50,
            y: 30,
            x2: 20,
            y2: 25,
            borderWidth: 1
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00'],
            axisLine: {
              lineStyle: {
                color: '#138ACD',
                width: 1 // 这里是为了突出显示加上的
              }
            },
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#138ACD',
                width: 2 // 这里是为了突出显示加上的
              }
            },
            splitLine: {
              show: false
            }
          },
          series: [
            {
              name: '今日降水及水位过程线',
              type: 'line',
              stack: '总量',
              data: [11, 12, 13, 13.5, 14, 14.5, 15],
              itemStyle: {
                normal: {
                  color: '#8cd5c2', // 改变折线点的颜色
                  lineStyle: {
                    color: '#138ACD' // 改变折线颜色
                  }
                }
              }
            }
          ]
        }
        this.myChart.setOption(option)
      }
      )
    }
  }
}
</script>
<style lang="less" scoped>
/* .duty-statis {
  .duty-statis-cont {
    .cont-pad();
  }
} */
.centerdiv {
  height: 50px;
  margin-top: 15px;
  text-align: center;
  background: #f5f7fa;
  border-top: dashed;
  border-bottom: dashed;
  border-color: #dddddd;
  .span_content {
    line-height: 45px;
    font-size: 14px;
    border-radius: 8px;
  }
  .span_content2 {
    margin-left: 15px;
    background: #82c869;
    font-size: 14px;
    color: white;
    padding: 4px 10px 4px 10px;
    border-radius: 5px;
  }
  .span_content3 {
    line-height: 45px;
    font-size: 14px;
    border-radius: 8px;
    margin-left: 20px;
  }
  .span_centent4 {
    line-height: 45px;
    font-size: 14px;
    margin-left: 30px;
  }
  .btndiv {
    background: #82c869;
    width: 80px;
    text-align: center;
  }
}
.bottomdiv {
  margin-top: 15px;
}
.table {
  border: 2px solid #dddddd;
  width: 100%;
  text-align: center;
  font-size: 12px;
  .title {
    background: #f5f7fa;
  }
  .table_content {
    font-size: 11px;
  }
  th {
    width: 25%;
  }
}
</style>
