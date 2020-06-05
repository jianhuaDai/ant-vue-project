<template>
  <div style="height: 100%">
    <a-row :gutter="8" style="height: 100%">
      <a-col :span="4" style="height: 100%">
        <a-card :bordered="false" title="区域" style="height: 100%">
          <area-tree/>
        </a-card>
      </a-col>
      <a-col :span="20" style="height: 100%">
        <a-card :bordered="false">
          <div class="table-page-search-wrapper">
            <a-form layout="inline">
              <a-row :gutter="24">
                <a-col :md="9" :sm="24">
                  <a-form-item label="姓名" style="margin-bottom: 0">
                    <a-input v-model="queryParam.keyword" placeholder=""/>
                  </a-form-item>
                </a-col>
                <a-col :md="9" :sm="24">
                  <a-form-item label="河长级别" style="margin-bottom: 0">
                    <dictionary-select v-model="queryParam.chief_level" :insert-option-all="true" :select-first="true" :dictionary-type="DictionaryEnum.CHIEF_LEVEL"></dictionary-select>
                  </a-form-item>
                </a-col>
                <a-col :md="6" :sm="24">
                  <div style="float: right">
                    <a-button style="margin-right: 8px" @click="resetQuery">重置</a-button>
                    <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                  </div>
                </a-col>
              </a-row>
            </a-form>
          </div>
        </a-card>
        <a-card :bordered="false" style="margin-top: 8px;height: calc(100% - 88px)" title="查询列表">
          <a-button slot="extra" type="primary" icon="plus" @click="handleEditOrNew()">新增</a-button>
          <s-table
            ref="table"
            size="default"
            :rowKey="(record) => record.employee_id"
            :columns="columns"
            :data="loadData"
            showPagination="auto"
          >
            <span slot="serial" slot-scope="text, record, index">
              {{ index + 1 }}defaul
            </span>
            <span slot="status" slot-scope="text">
              <a-badge :status="text | statusBadge" :text="text | statusName" />
            </span>
            <span slot="action" slot-scope="text, record, index">
              <template>
                <a @click="handleEditOrNew(record)">编辑</a>
                <a @click="handleDel(record)" style="margin-left: 10px;color: red">删除</a>
              </template>
            </span>
          </s-table>
          <edit-module ref="editModule" @ok="()=>this.$refs.table.refresh(true)"></edit-module>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import { STable, Ellipsis } from '@/components'
  import { getList, delChief } from '@/api/chief'
  import EditModule from './modules/EditModule'
  import AreaTree from '../../components/Hczy/AreaTree'

  export default {
    name: 'ChiefManage',
    components: { STable, Ellipsis, EditModule, AreaTree },
    methods: {
      goTo (record) {
        this.$router.push({ path: '/task/solution', query: { taskId: record.id, taskName: record.name } })
      },
      resetQuery () {
        this.queryParam.chief_level = null
        this.queryParam.keyword = ''
        this.$refs.table.refresh(true)
      },
      handleEditOrNew (record) {
        this.$refs.editModule.showModal(record)
      },
      handleDel (record) {
        const _this = this
        this.$confirm({
          title: '删除操作',
          content: `确定要删除${record.employee_name}吗`,
          onOk () {
            delChief(record.employee_id).then(res => {
              _this.$message.success('删除成功')
            })
          },
          onCancel () {
          }
        })
      }
    },
    created () {
    },
    data () {
      return {
        queryParam: {
          keyword: '',
          chief_level: null
        },
        columns: [
          {
            title: '姓名',
            dataIndex: 'employee_name'
          },
          {
            title: '职位',
            dataIndex: 'title'
            // width: '60px'
          },
          {
            title: '所属单位',
            dataIndex: 'depts[0].dept_name'
          },
          {
            title: '级别',
            dataIndex: 'chief_level_name'
            // width: '120px'
          },
          {
            title: '上级',
            dataIndex: 'p_employee_name'
            // width: '80px'
          },
          {
            title: '联系电话',
            dataIndex: 'phone',
            width: '150px'
          },
          {
            title: '状态',
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' },
            width: '80px'
          },
          {
            title: '操作',
            dataIndex: 'action',
            width: '100px',
            scopedSlots: { customRender: 'action' }
          }
        ],
        loadData: parameter => {
          return getList(Object.assign(parameter, this.queryParam))
            .then(res => {
              return res.data
            })
        },
        selectedRowKeys: [],
        selectedRows: []

      }
    }
  }
</script>
<style scoped>

</style>
