<template>
  <div>
    <a-modal
      v-model="visible"
      @ok="handleOk"
      width="40%"
      :title="title"
      :confirmLoading="confirmLoading"
    >
      <a-spin :spinning="confirmLoading">
        <a-form-model ref="form" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item
            label="河湖名称"
            prop="name"
            ref="name"
            @blur="() => {$refs.name.onFieldBlur()}">
            <a-input v-model="form.name"/>
          </a-form-model-item>
          <a-form-model-item label="标题" prop="site" ref="address">
            <a-input v-model="form.site"/>
          </a-form-model-item>
          <a-form-model-item label="上传文件" prop="file" ref="leader">
            <a-upload
              :customRequest="customRequest"
              :fileList="fileList"
            >
              <a-button> <a-icon type="upload" /> Upload </a-button>
            </a-upload>
          </a-form-model-item>
          <a-form-model-item label="发布人">
            <a-input v-model="form.progress"/>
          </a-form-model-item>
        </a-form-model>
      </a-spin>

      <template slot="footer">
        <a-button @click="()=>{this.visible=false}">取消</a-button>
        <a-button type="primary" @click="handleOk">保存</a-button>
      </template>
    </a-modal>

  </div>
</template>

<script>
  // import { saveEmploy } from '../../../../api/manage'

  export default {
    props: {
      orgData: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        title: '新增',
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
        status: true,
        confirmLoading: false,
        form: {
          id: '',
          name: '',
          site: '',
          principal: '',
          participant: '',
          progress: '',
          formData: null
        },
        rules: {
          name: [
            { required: true, message: '任务名称不能为空', trigger: 'blur' }
          ],
          site: [
            { required: true, message: '地点不能为空', trigger: 'blur' }
          ],
          file: [
          ],
          participant: [
            { required: true, message: '参与人不能为空', trigger: 'blur' }
          ]
        },
        layout: 'horizontal',
        visible: false,
        fileList: []
      }
    },
    watch: {
      orgData (value) {
        this.treeData = this.buildTreeData(value, [])
      }
    },
    methods: {
      customRequest (data) {
          this.form.formData = new FormData()
          this.form.formData.append('file', data.file)
          this.fileList = [data.file]
          console.log(data)
      },
      showModal (data = {}) {
        this.visible = true
        this.form = { ...{}, ...data }
        if (this.form.id) {
          this.title = '编辑'
        } else {
          this.title = '新建'
        }
        setTimeout(() => {
          this.$refs.form.clearValidate()
        }, 1)
      },
      handleOk (e) {
        const _this = this
        this.$refs.form.validate(valid => {
          if (valid) {
            _this.confirmLoading = true
            let params = _this.form
            let isEdit = true
            if (!_this.form.employee_id) {
              isEdit = false
              params = {
                employee_form_list: [
                  _this.form
                ]
              }
            }
            _this.visible = false
            // saveEmploy(params, isEdit).then((res) => {
            //   _this.$message.success('保存成功')
            //   _this.visible = false
            //   _this.$refs.userForm.resetFields()
            //   _this.$emit('ok')
            // }).catch((err) => {
            //   _this.$message.error(err.msg || '保存失败')
            // }).finally(() => {
            //   _this.confirmLoading = false
            // })
          }
        })
      }
    },
    computed: {}
  }
</script>

<style scoped>

</style>
