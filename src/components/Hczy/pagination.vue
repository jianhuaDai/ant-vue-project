<template>
  <div class="pagination">
    <div class="info">
      第 {{ pageNo }} 页 &nbsp; / &nbsp; 共 {{ Math.ceil(total/pageSize) }} 页
    </div>
    <a-pagination :current="pageNo" :pageSize="pageSize" @change="change" :total="total" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Pagination } from 'ant-design-vue'
Vue.use(Pagination)
export default {
    props: {
       pageNo: {
           type: Number,
           default: 1
       },
       pageSize: {
           type: Number,
           default: 15
       },
       total: {
           type: Number,
           default: 0
       }
    },
    methods: {
        change (val) {
            this.$emit('change', val)
        }
    }
}
</script>

<style scoped lang="less">
.pagination{
    // margin-top:15px;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
}
</style>
