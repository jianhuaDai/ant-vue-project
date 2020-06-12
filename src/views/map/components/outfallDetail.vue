<template>
  <div>
    <a-spin :spinning="confirmLoading">
      <div class="detail-info">
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">排污口编号:</div>
              <div class="value">{{ form.sewage_id }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">排污口名称:</div>
              <div class="value">{{ form.sewage_name }}</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">所属河道:</div>
              <div class="value">{{ form.water_name }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">所属区域:</div>
              <div class="value">{{ form.regionalism_name }}</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">关注级别:</div>
              <div class="value">{{ form.attention_level_name }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">所属河长:</div>
              <div class="value">{{ form.river_chief_name }}m<sup>3</sup>/s</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">详细地址:</div>
              <div class="value">{{ form.location }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">经纬度:</div>
              <div class="value">{{ form.lon_lat }}</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">水功能区:</div>
              <div class="value">{{ form.get_water_purpose_name }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">排口类型:</div>
              <div class="value">{{ form.sewage_type_name }}</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">设计入河量:</div>
              <div class="value">{{ form.in_river_plan }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">实际入河量:</div>
              <div class="value">空缺</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">是否有视频:</div>
              <div class="value">{{ form.has_video ? "是" : "否" }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">排放方式:</div>
              <div class="value">{{ form.sewage_way_name }}</div>
            </div>
          </a-col>
        </a-row>

      </div>
      <div class="chart-container">
        <a-table :columns="columns" :data-source="tableData" :pagination="false" bordered>
          <template slot="sum" slot-scope="text">
            {{ text.toFixed(2) }}t
          </template>
          <template slot="cod" slot-scope="text">
            {{ text.toFixed(2) }}t
          </template>
          <template slot="bod" slot-scope="text">
            {{ text.toFixed(2) }}t
          </template>
          <template slot="nh" slot-scope="text">
            {{ text.toFixed(2) }}t
          </template>
          <template slot="p" slot-scope="text">
            {{ text.toFixed(2) }}t
          </template>
        </a-table>
      </div>
    </a-spin>
  </div>
</template>

<script>
  import { getOutFallDetail, getOutFallAttribute } from '@/api/mapServer'

  export default {
    name: 'GetWaterDetail',
    created () {
        getOutFallAttribute(this.id).then((res) => {
          this.form = res.data
        })
        getOutFallDetail('137792483370205185').then(res => {
          this.tableData = res.data
          this.confirmLoading = false
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
        columns: [
          {
            title: '统计时间',
            dataIndex: 'collect_time'
          },
          {
            title: '入河总量',
            dataIndex: 'sum',
            scopedSlots: { customRender: 'sum' }
          },
          {
            title: 'COD',
            dataIndex: 'cod',
            scopedSlots: { customRender: 'cod' }
          },
          {
            title: 'BOD',
            dataIndex: 'bod',
            scopedSlots: { customRender: 'bod' }
          },
          {
            title: '氨氮',
            dataIndex: 'nh',
            scopedSlots: { customRender: 'nh' }
          },
          {
            title: '总磷',
            dataIndex: 'p',
            scopedSlots: { customRender: 'p' }
          }
        ],
        tableData: [],
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
