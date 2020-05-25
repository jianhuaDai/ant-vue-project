<template>
  <div>
    <a-modal
      v-model="visible"
      :title="title"
      :destroyOnClose="true"
      :footer="null"
      width="720px"
      :zIndex="10000"
    >
      <a-spin :spinning="confirmLoading">
        <anxian-detail :id="dataId" />
      </a-spin>
    </a-modal>

  </div>
</template>

<script>
  import anxianDetail from "../../../components/Hczy/anxianDetail";
  export default {
    props: {
      orgData: {
        type: Array,
        default: () => []
      }
    },
    components: {
      anxianDetail
    },
    data () {
      return {
        treeData: [],
        title: '详情',
        visible: false,
        confirmLoading: false,
        dataId: ''
      }
    },
    watch: {
    },
    methods: {
      showModal (id = '') {
        this.dataId = id
        this.visible = true
      }
    },
    computed: {
      formItemLayout () {
        const { layout } = this.form
        return layout === 'horizontal'
          ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
          }
          : {}
      },
      buttonItemLayout () {
        return this.layout === 'horizontal'
          ? {
            wrapperCol: { span: 14, offset: 4 }
          }
          : {}
      }
    }
  }
</script>

<style scoped>

</style>
