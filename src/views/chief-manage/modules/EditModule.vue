<template>
  <div>
    <a-modal
      v-model="visible"
      @ok="handleOk"
      width="60%"
      :title="title"
      :confirmLoading="confirmLoading"
    >
      <a-spin :spinning="confirmLoading">
        <a-form-model ref="form" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-row :gutter="24">
            <a-col :md="12" :sm="24">
              <a-form-model-item
                label="姓名"
                prop="employee_name"
                ref="employee_name">
                <a-input v-model="form.employee_name"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-model-item
                label="职位">
                <dictionary-select v-model="form.title_id" :dictionary-type="DictionaryEnum.EMPLOYEE_TITLE"></dictionary-select>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :md="12" :sm="24">
              <a-form-model-item label="所属单位">
                <a-tree-select
                  showSearch
                  allowClear
                  :dropdownStyle="{ maxHeight: '600px', overflow: 'auto' }"
                  :treeData="deptData"
                  treeNodeFilterProp="title"
                  :treeIcon="true"
                  placeholder="请选择部门"
                  :replaceFields="{ title: 'dept_name', children: 'children' ,key: 'dept_id', value: 'dept_id' }"
                  treeDefaultExpandAll
                  v-model="form.dept_ids">
                  <a-icon slot="suffixIcon" type="team"/>
                </a-tree-select>
              </a-form-model-item>
              <!--              :replaceFields="{ title: 'dept_name', children: 'children' ,key: 'dept_id', value: 'dept_id' }"-->
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-model-item
                label="上级河湖长"
                prop="pid">
                <a-tree-select
                  :treeDefaultExpandedKeys="expendBook"
                  :treeIcon="true"
                  placeholder="请选择上级河湖长"
                  :treeData="bookData"
                  v-model="form.pid">
                  <a-icon slot="suffixIcon" type="user"/>
                  <template slot-scope="text" slot="title">
                    <a-icon type="user"/>
                    {{ text.value }}
                  </template>
                </a-tree-select>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :md="12" :sm="24">
              <a-form-model-item
                label="区域">
                <a-tree-select
                  :treeData="areaData"
                  :treeDefaultExpandedKeys="['32']"
                  :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                  v-model="form.regionalism_id"></a-tree-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-model-item
                label="河湖"
                prop="water_ids">
                <a-tree-select
                  showSearch
                  multiple
                  treeNodeFilterProp="title"
                  v-model="form.water_ids"
                  :allowClear="true"
                  :treeData="riverData"
                  :treeDataSimpleMode="true"
                  placeholder="请选择河湖"/>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :md="12" :sm="24">
              <a-form-model-item
                label="河长级别">
                <dictionary-select v-model="form.chief_level" :dictionary-type="DictionaryEnum.CHIEF_LEVEL"></dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-model-item
                prop="phone"
                label="联系电话">
                <a-input v-model="form.phone" placeholder="请输入电话">
                </a-input>
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
  import { treeData } from '@/config/areaTreeSelectData'
  import { getDeptList, getEnterpriseBook, getEmployee } from '@/api/orgManage'
  import { getRiverData, saveChief, getChief } from '@/api/chief'

  export default {
    props: {
      orgData: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        expendBook: ['136485248216072193'],
        areaData: treeData,
        deptData: [],
        bookData: [],
        riverData: [],
        title: '新增',
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
        status: true,
        confirmLoading: false,
        form: {
          chief_level: null,
          employee_id: '',
          employee_name: '',
          phone: '',
          pid: '',
          regionalism_id: '',
          title_id: null,
          water_ids: [],
          dept_ids: []
        },
        rules: {
          employee_name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          water_ids: [
            { required: true, message: '请选择河湖', trigger: 'change' }
          ],
          pid: [
            { required: true, message: '请选择上级河湖长', trigger: 'change' }
          ],
          phone: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '手机号格式不正确' }
          ]
        },
        layout: 'horizontal',
        visible: false
      }
    },
    watch: {},
    created () {
      this.initDeptTree()
      this.initBook()
      this.initRiverData()
    },
    methods: {
      initRiverData () {
        getRiverData({ page_size: 0 }).then(res => {
          this.riverData = res.data.ist
          this.riverData = res.data.list.map((v) => {
            return { id: v.water_id, pId: v.pid, value: v.water_id, title: v.name }
          })
        })
      },
      processBook (data = [], result = []) {
        data.forEach((dept) => {
          const deptItem = {
            key: dept.dept_id,
            value: dept.dept_id,
            title: dept.dept_name,
            // scopedSlots: {
            //   title: 'deptTitle'
            // },
            selectable: false,
            children: []
          }
          if (dept.children.length > 0) {
            this.processBook(dept.children, deptItem.children)
          }
          if (dept.employees) {
            dept.employees.forEach((employee) => {
              const employeeItem = {
                key: employee.employee_id,
                value: employee.employee_id,
                title: employee.employee_name,
                scopedSlots: {
                  title: 'title'
                },
                selectable: true
              }
              deptItem.children.push(employeeItem)
            })
          }
          result.push(deptItem)
        })
      },
      initBook (enterpriseId = '136485248216072193') {
        getEnterpriseBook({ id: enterpriseId }).then(res => {
          this.bookData.push({
            key: res.data.enterprise_id,
            value: res.data.enterprise_id,
            title: res.data.enterprise_name,
            selectable: false,
            children: []
          })
          this.processBook(res.data.depts, this.bookData[0].children)
        })
      },
      arrayToTree (list = [], findFun) {
        if (findFun === undefined) {
          findFun = function (parent, child) {
            return parent.dept_id === child.pid
          }
        }

        const tree = {}
        for (const item of list) {
          let ptr = list.find(parent => findFun(parent, item))
          if (ptr === undefined) ptr = tree
          if (!ptr.children) {
            ptr.children = []
          }
          delete item.pid
          ptr.children.push(item)
        }
        return tree.children || []
      },
      initDeptTree (enterpriseId = '136485248216072193') {
        getDeptList({ enterprise_id: enterpriseId, page_size: 0 }).then(res => {
          this.deptData = this.arrayToTree(res.data.list)
        })
      },
      showModal (data = {}) {
        this.title = data.employee_id ? '编辑' : '新建'
        this.visible = true
        if (data.employee_id) {
          this.confirmLoading = true
          getEmployee(data.employee_id).then(res => {
            this.form = { ...{}, ...res.data }
            this.form.water_ids = res.data.water_info_vo.map((v) => {
              return v.water_id
            })
            this.form.dept_ids = res.data.depts.map((v) => {
              return v.dept_id
            })
            console.log('chief: ', this.form)
          }).finally(() => {
            this.confirmLoading = false
          })
        } else {
          this.form = { ...{}, data }
        }
        setTimeout(() => {
          this.$refs.form.clearValidate()
        }, 1)

        // 传入 record
        // this.visible = true
        // this.form = { ...{}, ...data }
        // if (this.form.employee_id) {
        //   this.title = '编辑'
        // } else {
        //   this.title = '新建'
        // }
        // console.log('show:', this.form)
        // setTimeout(() => {
        //   this.$refs.form.clearValidate()
        // }, 1)
      },
      handleOk (e) {
        const _this = this
        this.$refs.form.validate(valid => {
          if (valid) {
            _this.confirmLoading = true
            const params = _this.form
            saveChief(params).then((res) => {
              _this.$message.success('保存成功')
              _this.visible = false
              _this.$refs.form.resetFields()
              _this.$emit('ok')
            }).catch((err) => {
              _this.$message.error(err.msg || '保存失败')
            }).finally(() => {
              _this.confirmLoading = false
            })
          }
        })
      }
    },
    computed: {}
  }
</script>

<style scoped>

</style>
