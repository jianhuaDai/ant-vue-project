<template>
  <div>
    <a-spin :spinning="confirmLoading">
      <div class="detail-info">
        <a-row :gutter="100">
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">污染源编号：</div>
              <div class="value">{{ form.pollution_num }}</div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="detail-item">
              <div class="title">污染源名称：</div>
              <div class="value">{{ form.pollution_name }}</div>
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
export default {
  data () {

  },
  created () {

  },
  methods: {

  }
}
</script>
