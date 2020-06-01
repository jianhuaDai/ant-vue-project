<template>
  <div style="height: 100%">
    <a-row :gutter="8" style="height: 100%">
      <a-col :span="6" style="height: 100%">
        <a-card :bordered="false" title="区域" style="height: 100%">
          <area-tree/>
        </a-card>
      </a-col>
      <a-col :span="18" style="height: 100%">
        <a-card :bordered="false">
          <div class="table-page-search-wrapper">
            <a-form layout="inline">
              <a-row :gutter="24">
                <a-col :md="9" :sm="24">
                  <a-form-item label="姓名" style="margin-bottom: 0">
                    <a-input v-model="queryParam.name" placeholder=""/>
                  </a-form-item>
                </a-col>
                <a-col :md="9" :sm="24">
                  <a-form-item label="河湖长类型" style="margin-bottom: 0">
                    <a-select v-model="queryParam.status" placeholder="请选择" :default-value="0">
                      <a-select-option value="">全部</a-select-option>
                      <a-select-option :value="1">未制定方案</a-select-option>
                      <a-select-option :value="2">已制定方案</a-select-option>
                      <a-select-option :value="3">已完成</a-select-option>
                    </a-select>
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
            :rowKey="(record) => record.id"
            :columns="columns"
            :data="loadData"
            showPagination="auto"
          >
            <span slot="serial" slot-scope="text, record, index">
              {{ index + 1 }}
            </span>
            <span slot="status" slot-scope="text">
              <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
            </span>
            <span slot="action" slot-scope="text, record, index">
              <template>
                <a @click="handleEditOrNew(record)">编辑</a>
                <a @click="handleDel(record)" style="margin-left: 10px;color: red">删除</a>
              </template>
            </span>
          </s-table>
          <edit-module ref="taskModule"></edit-module>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import PageView from '../../layouts/PageView'
  import { STable, Ellipsis } from '@/components'
  import { getTasks } from '@/api/task'
  import EditModule from './modules/EditModule'
  import AreaTree from '../../components/Hczy/AreaTree'

  const statusMap = {
    1: {
      status: 'default',
      text: '未制定方案'
    },
    2: {
      status: 'processing',
      text: '已制定方案'
    },
    3: {
      status: 'success',
      text: '已完成'
    }
  }

  export default {
    name: 'Task',
    components: { PageView, STable, Ellipsis, EditModule, AreaTree },
    methods: {
      goTo (record) {
        this.$router.push({ path: '/task/solution', query: { taskId: record.id, taskName: record.name } })
      },
      resetQuery () {
        this.queryParam.status = ''
        this.$refs.table.refresh(true)
      },
      handleEditOrNew (record) {
        this.$refs.taskModule.showModal(record)
      },
      handleDel (record) {
        this.$confirm({
          title: '删除操作',
          content: `确定要删除${record.name}吗`,
          onOk () {
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
          name: '',
          status: ''
        },
        columns: [
          {
            title: '姓名',
            dataIndex: 'name'
          },
          {
            title: '职位',
            dataIndex: 'site'
          },
          {
            title: '所属单位',
            dataIndex: 'principal'
          },
          {
            title: '级别',
            dataIndex: 'level',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '联系电话',
            dataIndex: 'create_at',
            sorter: true
          },
          {
            title: '状态',
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            dataIndex: 'action',
            width: '120px',
            scopedSlots: { customRender: 'action' }
          }
        ],
        loadData: parameter => {
          return getTasks(Object.assign(parameter, this.queryParam))
            .then(res => {
              return res.data
            })
        },
        selectedRowKeys: [],
        selectedRows: []

      }
    },
    filters: {
      statusFilter (type) {
        return statusMap[type].text
      },
      statusTypeFilter (type) {
        return statusMap[type].status
      }
    }
  }
</script>
<style scoped>

</style>
