<template>
  <div>
    <a-modal
      v-model="visible"
      :title="title"
      :destroyOnClose="true"
      :footer="null"
      width="70%"
      :bodyStyle="{paddingBottom: '24px'}"
      @cancel="cancel"
    >
      <component :is="detailModal" :id="dataId"></component>
    </a-modal>
  </div>
</template>

<script>
  import anxianDetail from '../../../components/Hczy/anxianDetail'
  import getWaterDialog from '../components/getWaterDialog.vue'
  import getWaterFun from '../components/getWaterFun.vue'
  import GetWaterDetail from '../components/GetWaterDetail'
  import PollutionDetail from '../components/PollutionDetail'
  import waterDetail from '../components/waterDetail'
  import rainDetail from '../components/rainDetail'
  export default {
    props: {
    },
    components: {
      anxianDetail,
      getWaterDialog,
      getWaterFun,
      GetWaterDetail,
      PollutionDetail,
      waterDetail,
      rainDetail
    },
    data () {
      return {
        title: '详情',
        visible: false,
        dataId: '',
        detailModal: ''
      }
    },
    created () {
    },
    watch: {},
    methods: {
      showModal (id = '', detailModal = '', title = '详情') {
        console.log(id, 'pollution_idpollution_id')
        this.dataId = id
        this.detailModal = detailModal
        this.title = title
        this.visible = true
      },
      cancel () {
        this.visible = false
      }
    },
    computed: {}
  }
</script>

<style scoped>
</style>
