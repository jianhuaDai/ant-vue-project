<template>
  <div>
    <a-modal v-model="visible" @ok="handleOk" width="60%" :title="title" :confirmLoading="confirmLoading">
      <a-spin :spinning="confirmLoading">
        <a-form-model ref="form" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-row>
            <a-col :md="24" :sm="24">
              <a-form-model-item label="模版名称" prop="template_name" ref="template_name">
                <a-input v-model="form.template_name"></a-input>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="24" :sm="24">
              <a-form-model-item label="模版内容" prop="template_name" ref="template_name">
                <a-row class="edit-body">
                  <div ref="toolbar" id="toolbar"></div>
                  <div ref="editor" id="editor"></div>
                </a-row>
              </a-form-model-item>
            </a-col>
          </a-row>

        </a-form-model>
      </a-spin>

      <template slot="footer">
        <a-button
          @click="
            () => {
              this.visible = false
            }
          "
        >取消</a-button
        >
        <a-button type="primary" @click="handleOk">保存</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { treeData } from '@/config/areaTreeSelectData'
import uploadSingleImg from '@/components/Hczy/Upload/uploadSingleImg.vue'
import { getRiverlakeList } from '@/api/riverlakemanage'
import { editBoard, addBoard, getBoardById } from '@/api/boardManage'
import { editTemplate, addTemplate, oneTemplate } from '@/api/template'
import mapInput from '@/components/Hczy/mapInput.vue'
import E from 'wangeditor'
export default {
  props: {
    orgData: {
      type: Array,
      default: () => []
    }
  },
  components: { uploadSingleImg, mapInput },
  data () {
    return {
      regionalismTree: treeData,
      title: '新增',
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      confirmLoading: false,
      form: {},
      rules: {
        billboard_num: [{ required: true, message: '公示牌编号不能为空', trigger: 'blur' }],
        water_id: [{ required: true, message: '请选择河道', trigger: 'change' }],
        lon_lat: [{ required: true, message: '请输入经纬度', trigger: 'change' }],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '手机号格式不正确' }
        ]
      },
      layout: 'horizontal',
      visible: false,
      editor: null
    }
  },
  watch: {},
  created () {
    console.log(E, 'dsdsdsd')
  },
  methods: {
    setEditor () {
      // this.editor = new E(this.$refs.toolbar, this.$refs.editor)
      this.editor = new E('#toolbar', '#editor')
      // 配置菜单
      this.editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'justify', // 对齐方式
        'image', // 插入图片
        'table', // 表格
        'fullscreen' // 全屏
      ]
      this.editor.create()
    },
    showModal (data = {}) {
      this.title = data.template_id ? '编辑' : '新建'
      this.visible = true
      this.$nextTick().then(() => {
        this.setEditor()
        if (data.template_id) {
          oneTemplate(data.template_id)
            .then(res => {
              this.form = { ...{}, ...res.data }
              this.editor.txt.html(this.form.content)
            })
            .finally(() => {
            })
        } else {
          this.form = { ...{}, data }
          this.editor.txt.html(null)
        }
      })
      setTimeout(() => {
        this.$refs.form.clearValidate()
      }, 1)
    },
    handleOk (e) {
      const _this = this
      this.$refs.form.validate(valid => {
        if (valid) {
          const params = Object.assign(_this.form, { content: this.editor.txt.html() })
          if (params.template_id) {
            editTemplate(params.template_id, params)
              .then(res => {
                _this.$message.success('编辑成功！')
                _this.visible = false
                _this.$emit('ok')
              })
              .catch(err => {
                _this.$message.error(err.msg || '编辑失败！')
              })
          } else {
            addTemplate(params)
              .then(res => {
                _this.$message.success('新增成功！')
                _this.visible = false
                _this.$emit('ok')
              })
              .catch(err => {
                _this.$message.error(err.msg || '新增失败！')
              })
          }
        }
      })
    }
  },
  computed: {}
}
</script>

<style lang="less" scoped>
.edit-body {
  border: 1px solid #ddd;
  height: 400px;
  overflow: auto;
}
</style>
