<template>
  <div>
    <a-row :gutter="24">
      <a-col :span="12">
        <div class="item-title">功能区名称:</div>
        <div class="item-content">{{ infoDetail.line_name }}</div>
      </a-col>
      <a-col :span="12">
        <div class="item-title">级别:</div>
        <div class="item-content">{{ infoDetail.line_num }}</div>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :span="12">
        <div class="item-title">分类:</div>
        <div class="item-content">{{ infoDetail.management_unit }}</div>
      </a-col>
      <a-col :span="12">
        <div class="item-title">断面名称:</div>
        <div class="item-content">{{ infoDetail.location_info }}</div>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :span="12">
        <div class="item-title">水体类型:</div>
        <div class="item-content">{{ infoDetail.startPoint }}</div>
      </a-col>
      <a-col :span="12">
        <div class="item-title">经纬度:</div>
        <div class="item-content">111T</div>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :span="12">
        <div class="item-title">水质目标:</div>
        <div class="item-content">{{ infoDetail.line_length }}</div>
      </a-col>
      <a-col :span="12">
        <div class="item-title">是否达标:</div>
        <div class="item-content"></div>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :span="12">
        <div class="item-title">长度/面积:</div>
        <div class="item-content">{{ infoDetail.line_length }}</div>
      </a-col>
    </a-row>
    <p></p>
  </div>
</template>

<script>
export default {
  props: {
    infoDetail: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="less" scoped>
</style>
