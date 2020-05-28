<template>
  <div>
    <a-modal
      v-model="visible"
      @ok="handleOk"
      width="80%"
      :title="title"
      :confirmLoading="confirmLoading"
    >
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
        participantData: [
          {
            id: 1,
            name: '李明'
          }, {
            id: 2,
            name: '方楠'
          }, {
            id: 3,
            name: '史青'
          }
        ],
        title: '方案制定',
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
        status: true,
        confirmLoading: false,
        form: {
          id: '',
          name: '',
          area_id: '',
          participant: '',
          principal: '',
          time: '',
          context: ''
        },
        rules: {
          name: [
            { required: true, message: '任务名称不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '地点不能为空', trigger: 'blur' }
          ],
          leader: [
            { required: true, message: '负责人不能为空', trigger: 'blur' }
          ],
          participant: [
            { required: true, message: '参与人不能为空', trigger: 'blur' }
          ]
        },
        layout: 'horizontal',
        visible: false
      }
    },
    watch: {
      orgData (value) {
        this.treeData = this.buildTreeData(value, [])
      }
    },
    methods: {
      showModal (data = {}) {
        this.visible = true
        this.form = { ...{}, ...data }
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
