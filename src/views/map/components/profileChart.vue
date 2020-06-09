<template>
  <div class="profile-chart">
    <div id="profile-chart" style="width: 100%; height: 100%;"></div>
  </div>
</template>

<script>
import 'echarts-liquidfill'
var echarts = require('echarts/lib/echarts')
export default {
  data () {
    return {
      myChart: null,
      chartData: [],
      num: 0
    }
  },
  created () {
        this.$nextTick(() => {
      this.loadCharts()
    })
  },
  methods: {
    loadCharts () {
      this.myChart = echarts.init(document.getElementById('profile-chart'))
      var _this = this
      var option = {
    title: {
        text: '水球图练习',
        subtext: '作者 : 花自飘凌水自流'
    },
    tooltip: {
        show: true
    },
    series: [{
        type: 'liquidFill',
        name: '',
        data: [{
            value: 0.45,
            name: ''
        }, 0.45, 0.4],
        color: ['#1890ff', '#c718ff', '#181eff9e'],
        radius: '150%',
        outline: { show: false },
        // 自定义路径
        shape: 'rect',
        // shape: 'path://M836.246588 713.185882L828.235294 798.117647H210.823529L120.470588 0h783.058824l-19.877647 210.823529H1024v60.235295h-146.070588L842.691765 645.210353 963.764706 512h60.235294l-187.753412 201.185882zM963.764706 271.058824h60.235294v240.941176h-60.235294V271.058824zM0 813.176471h1024l-169.743059 210.823529H169.743059L0 813.176471z',
        center: ['50%', '50%'],
        // 文字样式
        label: {
            normal: {
                formatter: '{c}',
                textStyle: {
                    color: 'red',
                    insideColor: 'yellow',
                    fontSize: 20
                }
            }
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
.profile-chart {
  height: 350px;
  width: 100%;
}
</style>
