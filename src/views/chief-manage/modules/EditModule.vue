<template>
  <div>
    <a-modal
      v-model="visible"
      @ok="handleOk"
      width="70%"
      :title="title"
      :confirmLoading="confirmLoading"
    >
      <a-spin :spinning="confirmLoading">
        <a-form-model ref="form" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-row :gutter="24">
            <a-col :md="12" :sm="24">
              <a-form-model-item
                :label-col="{span:4}"
                :wrapper-col="{span:20}"
                label="姓名"
                prop="employee_name"
                ref="employee_name">
              <a-input v-model="form.employee_name"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-model-item
                label="河湖"
                :label-col="{span:4}"
                :wrapper-col="{span:20}"
                prop="water_ids">
                <a-tree-select
                  v-model="form.water_ids"
                  tree-data-simple-mode
                  style="width: 100%"
                  :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                  :tree-data="riverData"
                  placeholder="请选择河湖"
                  :load-data="onLoadData"/>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :md="12" :sm="24">
              <a-form-model-item
                label="职位"
                :label-col="{span:4}"
                :wrapper-col="{span:20}">
                <dictionary-select :dictionary-type="DictionaryEnum.EMPLOYEE_TITLE"></dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-model-item
                label="所属单位"
                :label-col="{span:4}"
                :wrapper-col="{span:20}">
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :md="12" :sm="24">
              <a-form-model-item
                label="上级"
                prop="pid"
                :label-col="{span:4}"
                :wrapper-col="{span:20}">
                <dictionary-select :dictionary-type="DictionaryEnum.PROJECT_LEVEL"></dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-model-item
                label="联系电话"
                :label-col="{span:4}"
                :wrapper-col="{span:20}">
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :md="12" :sm="24">
              <a-form-model-item
                style="margin-bottom: 0"
                label="区域"
                :label-col="{span:4}"
                :wrapper-col="{span:20}">
                <dictionary-select :dictionary-type="DictionaryEnum.PROJECT_LEVEL"></dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-model-item
                style="margin-bottom: 0"
                label="河长级别"
                :label-col="{span:4}"
                :wrapper-col="{span:20}">
                <dictionary-select :dictionary-type="DictionaryEnum.CHIEF_LEVEL"></dictionary-select>
              </a-form-model-item>
            </a-col>
          </a-row>
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
        treeData: [
          { id: 1, pId: 0, value: '1', title: '省河长办公室', selectable: false, isLeaf: false },
          { id: 2, pId: 0, value: '2', title: '市河长办公室', selectable: false, isLeaf: false },
          { id: 3, pId: 0, value: '3', title: '区河长办公室', selectable: false, isLeaf: false }
        ],
        riverData: [
          { id: 1, pId: 0, value: '1', title: '河流', selectable: false, isLeaf: false },
          { id: 2, pId: 0, value: '2', title: '河段', selectable: false, isLeaf: false },
          { id: 3, pId: 0, value: '3', title: '湖泊', selectable: false, isLeaf: false }
        ],
        levelData: [
          {
            id: 1,
            name: '国家级'
          }, {
            id: 2,
            name: '省级'
          }, {
            id: 3,
            name: '市级'
          }, {
            id: 4,
            name: '县级'
          }, {
            id: 5,
            name: '乡镇级'
          }, {
            id: 6,
            name: '村级'
          }
        ],
        title: '新增',
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
        status: true,
        confirmLoading: false,
        form: {
          employee_id: '',
          employee_name: '',
          phone: '',
          pid: '',
          regionalism_id: '',
          title_id: 0,
          water_ids: []
        },
        rules: {
          employee_name: [
            { required: true, message: '姓名不能为空', trigger: 'change' }
          ],
          water_ids: [
            { required: true, message: '请选择河湖', trigger: 'change' }
          ],
          pid: [
            { required: true, message: '请选择上级河湖长', trigger: 'blur' }
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
      genTreeNode (parentId, isLeaf = false) {
        const random = Math.random()
          .toString(36)
          .substring(2, 6)
        return {
          id: random,
          pId: parentId,
          value: random,
          title: isLeaf ? '秦明' : '办公室一组',
          selectable: isLeaf,
          isLeaf
        }
      },
      onLoadData (treeNode) {
        return new Promise(resolve => {
          const { id } = treeNode.dataRef
          setTimeout(() => {
            this.treeData = this.treeData.concat([
              this.genTreeNode(id, false),
              this.genTreeNode(id, true)
            ])
            resolve()
          }, 300)
        })
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
