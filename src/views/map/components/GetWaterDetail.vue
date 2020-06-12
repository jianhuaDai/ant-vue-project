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
              <div class="value">{{ Array.isArray(form.lon_lat)?form.lon_lat[0]:form.lon_lat }}</div>
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
  import { getWaterDetail, getWaterChart } from '@/api/mapServer'

  export default {
    name: 'GetWaterDetail',
    created () {
      getWaterDetail(this.id).then(res => {
        this.form = res.data
      })
      getWaterChart('138203484309684001').then((res) => {
        const yearsArr = res.data[0].map((item) => {
          return item.mon_year
        })
        this.chartData.rows = res.data.map((item) => {
          const rowObj = {}
          yearsArr.forEach((element, index) => {
            rowObj[element] = item[0].value
            rowObj['月份'] = item[0].mon_month
          })
          return rowObj
        })
        this.chartData.columns = ['月份'].concat(yearsArr)
      })
    },
    props: {
      id: {
        type: null,
        default: null
      }
    },
    data: function () {
      return {
        form: {},
        qualityForm: {},
        confirmLoading: false,
        colors: ['#3FD4A2', '#6885B8', '#FF6010'],
        chartSettings: {
        },
        extend: {
          grid: {
            bottom: 0,
            right: '2%'
            // top: 24
          },
          xAxis: {
            show: true,
            type: 'category',
            data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            name: '月份'
          },
          yAxis: {
            show: true,
            name: 'm3'
          }
        },
        chartData: {
          // columns: ['月份', '2018年', '2019年', '2020年'],
          columns: [],
          rows: [
            // { '月份': '1月', '2018年': 1393, '2019年': 1093, '2020年': 2000 },
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
      flex: 0 0 100px;
      font-weight: bolder;
    }
    .value {
      flex: 1 0;
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
