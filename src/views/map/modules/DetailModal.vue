<template>
  <div class="body-main">
    <a-modal
      :class="className"
      v-model="visible"
      :title="title"
      :destroyOnClose="true"
      :footer="null"
      width="720px"
      @cancel="cancel"
    >
      <component :is="detailModule"></component>
    </a-modal>

  </div>
</template>

<script>
  import anxianDetail from '../../../components/Hczy/anxianDetail'
  import getWaterDialog from '../components/getWaterDialog.vue'
  import getWaterFun from '../components/getWaterFun.vue'
  export default {
    props: {
      orgData: {
        type: Object,
        default: () => null
      },
      type: {
        type: String,
        default: () => ''
      }
    },
    components: {
      anxianDetail,
      getWaterDialog,
      getWaterFun
    },
    data () {
      return {
        className: 'main-dialog',
        treeData: [],
        title: '222222',
        visible: false,
        confirmLoading: false,
        dataId: '',
        detailModule: ''
      }
    },
    created () {
      console.log(this.visible, '显示')
// 根据type类型加载对应详情模块
        const type = this.orgData ? this.orgData.type : ''
        console.log(type, 'yyyyyyy')
        switch (type) {
          case 'get_water':
            this.detailModule = 'getWaterDialog'
            this.title = '取水口详情'
            break
          case 'water_functional':
            this.detailModule = 'getWaterFun'
            this.title = '水功能区详情展示'
            break
          default:
            break
        }
    },
    watch: {
    },
    methods: {
      showModal (id = '') {
        console.log('pppppp')
        this.dataId = id
        this.visible = true
      },
      cancel () {
        console.log('关闭了')
        this.$emit('setDetailModule', false)
        this.visible = false
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

<style>
/* .main-dialog .ant-modal-close-x {
    height: 42px;
    line-height: 42px;
  }
.main-dialog .ant-modal-header {
    background: blue;
    padding: 10px 24px;
  }
.main-dialog .ant-modal-title {
      text-align: center;
      color: #ffffff
    } */
.main-dialog {
  top: 20px;
}
</style>
