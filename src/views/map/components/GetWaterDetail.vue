<template>
  <div>
    <a-spin :spinning="confirmLoading">
      <div class="detail-info">
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">取水口编号：</div>
              <div class="value">{{ form.get_water_id }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">取水口名称：</div>
              <div class="value">{{ form.name }}</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">位置：</div>
              <div class="value">{{ form.location }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">所属区域：</div>
              <div class="value">{{ form.regionalism_name }}</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">经纬度：</div>
              <div class="value">{{Array.isArray(form.lon_lat)?form.lon_lat[0]:form.lon_lat}}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">取水量：</div>
              <div class="value">{{ form.ammount }}m<sup>3</sup>/s</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">取水方式：</div>
              <div class="value">{{ form.get_water_type }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">取水水源类型：</div>
              <div class="value">{{ form.source_name }}</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">取水用途：</div>
              <div class="value">{{ form.get_water_purpose_name }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">规模类型：</div>
              <div class="value">{{ form.get_water_scale_name }}</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">供水范围：</div>
              <div class="value">{{ form.range }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">开始取水日期：</div>
              <div class="value">{{ form.use_time }}</div>
            </div>
          </a-col>
        </a-row>

      </div>
      <div class="chart-container">
        <div class="title">{{ form.name }}取水量同比</div>
        <div class="chart">
          <ve-histogram :data="chartData" :extend="extend" :colors="colors" height="300px"></ve-histogram>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
  import { getWaterDetail } from '@/api/mapServer'

  export default {
    name: 'GetWaterDetail',
    created () {
        console.log(this.dataId)
        this.confirmLoading = true
        getWaterDetail(this.dataId).then(res => {
          this.form = res.data
          this.confirmLoading = false
      })
    },
    props: {
      dataId: {
        type: null,
        default: null
      }
    },
    data: function () {
      return {
        form: {},
        confirmLoading: false,
        colors: ['#3FD4A2', '#6885B8', '#FF6010'],
        chartSettings: {
          labelMap: {
            value: '取水量',
            month: '月份'
          }
        },
        extend: {
          grid: {
            bottom: 0
            // top: 24
          },
          xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          },
          splitLine: {
          }
        },
        chartData: {
          columns: ['月份', '2018年', '2019年', '2020年'],
          rows: [
            { '月份': '1月', '2018年': 1393, '2019年': 1093, '2020年': 2000 },
            { '月份': '2月', '2018年': 3530, '2019年': 3230, '2020年': 3000 },
            { '月份': '3月', '2018年': 2923, '2019年': 2623, '2020年': 2000 }
          ]
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .detail-info {
    padding: 0 24px;
  }
  .detail-item {
    display: flex;
    width: 100%;
    min-height: 40px;
    font-size: 14px;
    color: rgba(0,0,0,0.7);
    align-items: baseline;
    .title {
      width: 40%;
      font-weight: bolder;
    }
    .value {
      width: 60%;
    }
    sup {
      font-size: 12px;
    }
  }
  .chart-container {
    margin-top: 24px;
    padding: 0 24px;
    .title {
      font-size: 14px;
      color: #333;
      font-weight: bold;
    }
    .chart {
      margin-top: 24px;
    }
  }
</style>
