<template>
  <div class="body-detail">
    <div class="left-area">
      <div class="water-chart">
        <ve-histogram :data="chartData" :extend="chartExtend" :settings="chartSettings"> </ve-histogram>
        <a slot="tabBarExtraContent" style="position: absolute;right: 30px; top: -7px;">
          更多&gt;&gt;
        </a>
      </div>
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
import { rainMonitors } from '@/api/mapServer'
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
        showLine: ['diff_value'],
        labelMap: {
          diff_value: '雨量',
          sum_value: '累积量'
        },
        yAxisName: ['降水量(mm)', '']
      },
      chartExtend: {
        legend: {
          bottom: 20,
          right: '30%'
        },
        grid: {
          left: '4%',
          right: '6%'
        },
        series: {
          barWidth: 20
        }
      },
      chartData: {
        columns: ['date', 'diff_value', 'sum_value'],
        rows: []
      },
      columns: [
        {
          title: '时间',
          dataIndex: 'collect_time',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '雨量(mm)',
          className: 'diff_value',
          dataIndex: 'diff_value'
        },
        {
          title: '累积量(mm)',
          dataIndex: 'sum_value'
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
      rainMonitors(this.id).then((res) => {
        const resData = res.data
        this.tabelData = res.data.map((element) => {
          return {
            ...element,
            diff_value: element.diff_value.toFixed(2),
            sum_value: element.sum_value.toFixed(2)
          }
        })
        this.chartData.rows = resData.map((item) => {
          return {
            date: item.collect_time,
            diff_value: item.diff_value.toFixed(2),
            sum_value: item.sum_value.toFixed(2)
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
      position: relative;
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
