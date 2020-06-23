<template>
  <div>
    <a-spin :spinning="confirmLoading">
      <div class="detail-info">
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">河湖名称：</div>
              <div class="value">{{ this.detailData.name }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">上级河湖名称：</div>
              <div class="value">{{ this.detailData.p_name }}</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">上级编码：</div>
              <div class="value">{{ this.detailData.pid }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">行政区域编码：</div>
              <div class="value">{{ this.detailData.regionalism_id }}</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">工程等级名称：</div>
              <div class="value">{{ this.detailData.reservoir_project_level_name }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">水库类型：</div>
              <div class="value">{{ this.detailData.reservoir_type_name }}</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">河湖库层级：</div>
              <div class="value">{{ this.detailData.water_grade_name }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">起点坐标：</div>
              <div class="value">{{ this.detailData.origin }}</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">终点坐标：</div>
              <div class="value">{{ this.detailData.destination }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">面积：</div>
              <div class="value">{{ this.detailData.area }}</div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">总库容：</div>
              <div class="value">{{ this.detailData.capacity }}</div>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="map-container">
        <div
          style="width: 100%;height: 100%"
          id="pollutionMap">
        </div>
      </div>
    </a-spin>
  </div>
</template>
<script>
import { getSingleriverlake } from '@api/riverlakemanage'
export default {
  props: {
      id: {
        type: null,
        default: null
      }
    },
  data () {
    return {
      detailData: {}
    }
  },
  components: {
    getSingleriverlake
  },
  created () {
    this.confirmLoading = true
    getSingleriverlake(this.id).then(res => {
      console.log(res)
      this.detailData = res.data
      this.confirmLoading = false
    })
  },
  methods: {

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
    color: rgba(0, 0, 0, 0.7);
    align-items: baseline;

    .title {
      flex: 0 0 100px;
      font-weight: bolder;
    }

    .value {
      flex: 1 0;
    }
  }
</style>
