<template>
  <div>
    <a-descriptions title="" bordered>
      <a-descriptions-item label="色度">
        {{ qualityInfo.colour }}
      </a-descriptions-item>
      <a-descriptions-item label="嗅和味">
        {{ qualityInfo.smell_taste }}
      </a-descriptions-item>
      <a-descriptions-item label="浑浊度(度)">
        {{ qualityInfo.turbidity }}
      </a-descriptions-item>
      <a-descriptions-item label="肉眼可见度">
        {{ qualityInfo.visable }}
      </a-descriptions-item>
      <a-descriptions-item label="pH">
        {{ qualityInfo.ph }}
      </a-descriptions-item>
      <a-descriptions-item label="总硬度(mg/L)">
        {{ qualityInfo.total_hardness_of_water }}
      </a-descriptions-item>
      <a-descriptions-item label="溶解性总固体(mg/L)">
        {{ qualityInfo.total_dissolved_solids }}
      </a-descriptions-item>
      <a-descriptions-item label="硫酸盐(mg/L)">
        {{ qualityInfo.so_3 }}
      </a-descriptions-item>
      <a-descriptions-item label="氯化物(mg/L)">
        {{ qualityInfo.cl }}
      </a-descriptions-item>
      <a-descriptions-item label="铁(Fe)(mg/L)">
        {{ qualityInfo.fe }}
      </a-descriptions-item>
      <a-descriptions-item label="锰(Mn)(mg/L)">
        {{ qualityInfo.mn }}
      </a-descriptions-item>
      <a-descriptions-item label="铜(Cu)(mg/L)">
        {{ qualityInfo.cu }}
      </a-descriptions-item>
      <a-descriptions-item label="锌(Zn)(mg/L)">
        {{ qualityInfo.zn }}
      </a-descriptions-item>
      <a-descriptions-item label="钼(Mo)(mg/L)">
        {{ qualityInfo.mo }}
      </a-descriptions-item>
      <a-descriptions-item label="钴(Co)(mg/L)">
        {{ qualityInfo.co }}
      </a-descriptions-item>
      <a-descriptions-item label="挥发性酚类(以苯酚计)(mg/L)">
        {{ qualityInfo.volatile_phenols }}
      </a-descriptions-item>
      <a-descriptions-item label="阴离子合成洗涤剂(mg/L)">
        {{ qualityInfo.linear_alkylbezene_sulfonates }}
      </a-descriptions-item>
      <a-descriptions-item label="高锰酸盐指数(mg/L)">
        {{ qualityInfo.mn_o_4 }}
      </a-descriptions-item>
      <a-descriptions-item label="氨氮(NH4)(mg/L)">
        {{ qualityInfo.nh_4 }}
      </a-descriptions-item>
      <a-descriptions-item label="总大肠菌数(个/L)">
        {{ qualityInfo.escherichia_coli }}
      </a-descriptions-item>
      <a-descriptions-item label="细菌总数(个/L)">
        {{ qualityInfo.bacterias }}
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
export default {
  props: {
    qualityInfo: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style>

</style>
