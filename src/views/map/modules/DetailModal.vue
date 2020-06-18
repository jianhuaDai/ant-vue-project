<template>
  <div>
    <a-modal
      v-model="visible"
      :title="title"
      :destroyOnClose="true"
      :footer="null"
      :width="modelWidth"
      :bodyStyle="{paddingBottom: '24px'}"
      @cancel="cancel"
    >
      <component :is="detailModal" :id="dataId" :outfallValue="outfallValue"></component>
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
  import outFallDetail from '../components/outfallDetail'
  export default {
    props: {
      modelWidth: {
        type: String,
        default: '70%'
      }
    },
    components: {
      anxianDetail,
      getWaterDialog,
      getWaterFun,
      GetWaterDetail,
      PollutionDetail,
      waterDetail,
      rainDetail,
      outFallDetail
    },
    data () {
      return {
        title: '详情',
        visible: false,
        dataId: '',
        detailModal: '',
        outfallValue: 0
      }
    },
    created () {
    },
    watch: {},
    methods: {
      showModal (id = '', detailModal = '', title = '详情') {
        console.log(id, 'pollution_idpollution_id')
        this.dataId = id
        this.detailModal = detailModal.detailModal
        this.outfallValue = detailModal.value
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
