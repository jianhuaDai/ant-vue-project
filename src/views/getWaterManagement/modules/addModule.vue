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
            label="任务名称"
            prop="name"
            ref="name"
            @blur="() => {$refs.name.onFieldBlur()}">
            <a-input v-model="form.name"/>
          </a-form-model-item>
          <a-form-model-item label="任务地点" prop="site" ref="address" @blur="() => {$refs.address.onFieldBlur()}">
            <a-input v-model="form.site"/>
          </a-form-model-item>
          <a-form-model-item label="负责人" prop="principal" ref="leader" @blur="() => {$refs.leader.onFieldBlur()}">
            <a-input v-model="form.principal"/>
          </a-form-model-item>
          <a-form-model-item
            label="参与人员"
            prop="participant"
            ref="participant"
            @blur="() => {$refs.participant.onFieldBlur()}">
            <!--            <a-input v-model="form.participant"/>-->
            <a-select
              mode="multiple"
              v-model="form.participant"
              style="width: 100%"
              placeholder="请选择参与人员"
            >
              <a-select-option :key="item.id" v-for="item in participantData">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="任务进展">
            <a-input v-model="form.progress"/>
          </a-form-model-item>
        </a-form-model>
      </a-spin>

      <template slot="footer">
        <a-button @click="()=>{this.visible=false}">取消</a-button>
        <a-button type="primary" @click="handleOk">保存</a-button>
        <a-button type="danger" @click="handleOk">发布</a-button>
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
        title: '新建',
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
          progress: ''
        },
        rules: {
          name: [
            { required: true, message: '任务名称不能为空', trigger: 'blur' }
          ],
          site: [
            { required: true, message: '地点不能为空', trigger: 'blur' }
          ],
          principal: [
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
