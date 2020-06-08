<template>
  <div>
    <a-spin :spinning="confirmLoading">
      <div class="detail-info">
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">污染源编号：</div>
              <div class="value">{{ form.id }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">污染源名称：</div>
              <div class="value">{{ form.pollution_name }}</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">污染源类型：</div>
              <div class="value">{{ form.pollution_type_name }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">发现时间：</div>
              <div class="value">{{ form.discover_time }}</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">所属河道：</div>
              <div class="value">{{ form.water_name }}</div>
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
              <div class="title">关注级别：</div>
              <div class="value">{{ form.attention_level_name }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">所属河长：</div>
              <div class="value">{{ form.chief_name }}</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">详细地址：</div>
              <div class="value">{{ form.location }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">经纬度：</div>
              <div class="value">{{ form.lon_lat }}</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="24">
            <div class="detail-item">
              <div class="title">影响范围：</div>
              <div class="value">{{ form.range }}</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="24">
            <div class="detail-item">
              <div class="title">治理情况：</div>
              <div class="value">正在治理中，预计3天恢复</div>
            </div>
          </a-col>
        </a-row>

      </div>
      <div class="map-container">
        <mapbox-view
          ref="map"
          :options="mapOptions">
        </mapbox-view>
      </div>
    </a-spin>
  </div>
</template>

<script>
  import { getPollutionDetail } from '@/api/mapServer'
  import MapboxView from '@/components/Hczy/Map/MapboxView'

  export default {
    name: 'PollutionDetail',
    created () {
      this.confirmLoading = true
      getPollutionDetail(this.dataId).then(res => {
        this.form = res.data
        this.confirmLoading = false
      })
    },
    components: {
      MapboxView
    },
    props: {
      dataId: {
        type: null,
        default: null
      }
    },
    data: function () {
      return {
        mapOptions: {
          pitch: 30,
          zoom: 9,
          style: '/bright2'
        },
        form: {},
        confirmLoading: false
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
  .map-container {
    margin-top: 24px;
    padding: 0;
    height: 300px;
    width: 80%;
    border: 1px solid #eee;
  }
</style>
