<template>
  <div>
    <a-row :gutter="24">
      <a-col :span="12">
        <div class="item-title">取水口编号:</div>
        <div class="item-content">{{ infoDetail.line_name }}</div>
      </a-col>
      <a-col :span="12">
        <div class="item-title">取水口名称:</div>
        <div class="item-content">{{ infoDetail.line_num }}</div>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :span="12">
        <div class="item-title">位置:</div>
        <div class="item-content">{{ infoDetail.management_unit }}</div>
      </a-col>
      <a-col :span="12">
        <div class="item-title">所属区域:</div>
        <div class="item-content">{{ infoDetail.location_info }}</div>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :span="12">
        <div class="item-title">经纬度:</div>
        <div class="item-content">{{ infoDetail.startPoint }}</div>
      </a-col>
      <a-col :span="12">
        <div class="item-title">取水量:</div>
        <div class="item-content">111T</div>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :span="12">
        <div class="item-title">取水方式:</div>
        <div class="item-content">{{ infoDetail.line_length }}</div>
      </a-col>
      <a-col :span="12">
        <div class="item-title">取水水源类型:</div>
        <div class="item-content"></div>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :span="12">
        <div class="item-title">取水用途:</div>
        <div class="item-content">{{ infoDetail.line_length }}</div>
      </a-col>
      <a-col :span="12">
        <div class="item-title">规模类型:</div>
        <div class="item-content"></div>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :span="12">
        <div class="item-title">供水范围:</div>
        <div class="item-content">{{ infoDetail.line_length }}</div>
      </a-col>
      <a-col :span="12">
        <div class="item-title">开始取水时间:</div>
        <div class="item-content"></div>
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
