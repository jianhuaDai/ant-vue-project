<template>
  <div class="body-detail">
    <div class="left-area">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="水情">
          <p style="position: absolute;">2020年5月6日9时——2020年5月6日17时</p>
          <div class="water-chart">
            <ve-line :data="chartData" :extend="chartExtend" :settings="chartSettings"> </ve-line>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="剖面图">
          剖面图
        </a-tab-pane>
        <a-button slot="tabBarExtraContent">
          更多
        </a-button>
      </a-tabs>
    </div>
    <div class="right-area">
      <div>
        <a-table :columns="columns" :data-source="data" bordered :pagination="false">
          <template slot="name" slot-scope="text">
            <a>{{ text }}</a>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/markPoint'
export default {
  data () {
    return {
      chartSettings: {
        labelMap: {
          value: '水位'
        },
        yAxisName: ['水位(m)', '']
      },
      chartExtend: {
        legend: {
          right: 30
        },
        grid: {
          left: '3%',
          right: '6%'
        },
        series: {
          markLine: {
            silent: true,
            label: {
              show: true,
              position: 'start',
              distance: -60,
              formatter: '警戒水位',
              color: 'red'
            },
            lineStyle: {
              color: 'red'
            },
            data: [
              {
                yAxis: 1200,
                name: '警戒水位'
              }
            ]
          },
          markPoint: {
            symbol: 'pin',
            symbolSize: 10,
            data: [
              {
                type: 'max',
                name: '最大值',
                label: {
                  color: 'red'
                }
              },
              {
                type: 'min',
                name: '最小值',
                label: {
                  color: 'red'
                }
              }
            ]
          }
        }
      },
      chartData: {
        columns: ['date', 'value'],
        rows: [
          { date: '9:00', value: 1393 },
          { date: '10:00', value: 3530 },
          { date: '11:00', value: 2923 },
          { date: '12:00', value: 1723 },
          { date: '13:00', value: 3792 },
          { date: '14:00', value: 4593 },
          { date: '15:00', value: 4593 },
          { date: '16:00', value: 4593 },
          { date: '17:00', value: 4593 },
          { date: '18:00', value: 4593 }
        ]
      },
      columns: [
        {
          title: '时间',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '上游(m)',
          className: 'column-money',
          dataIndex: 'money'
        },
        {
          title: '下游(m)',
          dataIndex: 'address'
        }
      ],
      data: [
        {
          key: '1',
          name: '5-20 6:00',
          money: '16.28',
          address: '12.28'
        },
        {
          key: '2',
          name: '5-20 6:00',
          money: '16.28',
          address: '12.28'
        },
        {
          key: '3',
          name: '5-20 6:00',
          money: '16.28',
          address: '12.28'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.body-detail::v-deep {
  display: flex;
  height: 400px;
  .ant-tabs-nav {
    .ant-tabs-tab {
      padding: 5px 16px;
    }
  }
  .left-area {
    width: 65%;
    height: 100%;
    .water-chart {
      height: 100%;
      width: 100%;
    }
  }
  .right-area {
    width: 35%;
    height: 100%;
    & > div {
      width: 100%;
      height: 100%;
      overflow: auto;
      padding-left: 10px;
    }
  }
}
</style>
