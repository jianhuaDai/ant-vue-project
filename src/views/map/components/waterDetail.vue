<template>
  <div class="body-detail">
    <div class="left-area">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="水情">
          <div class="water-chart">
            <ve-line :data="chartData" :extend="chartExtend" :settings="chartSettings"> </ve-line>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="剖面图">
          <profileChart></profileChart>
        </a-tab-pane>
        <a slot="tabBarExtraContent" style="position: absolute;right: 0; top: -7px;">
          更多&gt;&gt;
        </a>
      </a-tabs>
    </div>
    <div class="right-area">
      <div>
        <a-table :columns="columns" :data-source="tabelData" bordered :pagination="false">
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import 'echarts/lib/component/markLine'
import profileChart from './profileChart.vue'
import { waterMonitors } from '@/api/mapServer'
export default {
  components: { profileChart },
  props: {
    id: {
      type: null,
      default: null
    }
  },
  data () {
    return {
      chartSettings: {
        labelMap: {
          down_value: '下游',
          up_value: '上游'
        },
        yAxisName: ['水位(m)', '']
      },
      chartExtend: {
        legend: {
          right: 30
        },
        grid: {
          left: '4%',
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
                yAxis: 100,
                name: '警戒水位'
              }
            ]
          }
        }
      },
      chartData: {
        columns: ['date', 'down_value', 'up_value'],
        rows: []
      },
      columns: [
        {
          title: '时间',
          dataIndex: 'collect_time',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '上游(m)',
          className: 'up_value',
          dataIndex: 'up_value'
        },
        {
          title: '下游(m)',
          dataIndex: 'down_value'
        }
      ],
      tabelData: [
      ]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      waterMonitors(this.id).then((res) => {
        console.log(res.data, 'dsdsdsdsds')
        const resData = res.data
        this.tabelData = res.data.map((element) => {
          return {
            ...element,
            down_value: element.down_value.toFixed(2),
            up_value: element.up_value.toFixed(2)
          }
        })
        this.chartData.rows = resData.map((item) => {
          return {
            date: item.collect_time,
            down_value: item.down_value.toFixed(2),
            up_value: item.up_value.toFixed(2)
          }
        }).reverse()
      })
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
    width: 61%;
    height: 100%;
    .water-chart {
      height: 100%;
      width: 100%;
    }
  }
  .right-area {
    width: 39%;
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
