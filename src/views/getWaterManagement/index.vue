<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="任务名称" style="margin-bottom: 0">
                <a-input v-model="queryParam.name" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="任务状态" style="margin-bottom: 0">
                <a-select v-model="queryParam.status" placeholder="请选择" :default-value="0">
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option :value="1">未制定方案</a-select-option>
                  <a-select-option :value="2">已制定方案</a-select-option>
                  <a-select-option :value="3">已完成</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <div style="float: right">
                <a-button style="margin-right: 8px" @click="resetQuery">重置</a-button>
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              </div>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card :bordered="false" style="margin-top: 12px" title="任务列表">
      <a-button slot="extra" type="primary" icon="plus" @click="handleEditOrNew()">添加任务</a-button>
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
        <span slot="name" slot-scope="text, record">
          <a @click="goTo(record)">{{ text }}</a>
        </span>

        <span slot="action" slot-scope="text, record, index">
          <template>
            <a @click="()=>{}" v-show="record.publish !== '1'" v-html="'&emsp;发布'"></a>
            <span style="font-size: 14px" v-show="record.publish === '1'">已发布</span>
            <a-divider type="vertical" />
            <a @click="handleEditOrNew(record)">编辑</a>
            <a @click="handleDel(record)" style="margin-left: 10px;color: red">删除</a>
          </template>
        </span>
      </s-table>
      <add-module ref="taskModule"></add-module>
    </a-card>
  </div>
</template>

<script>
  import PageView from '../../layouts/PageView'
  import { STable, Ellipsis } from '@/components'
  import { getTasks } from '@/api/task'
  import AddModule from './modules/addModule'

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
    components: { PageView, STable, Ellipsis, AddModule },
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
            title: '#',
            scopedSlots: { customRender: 'serial' }
          },
          {
            title: '任务名称',
            dataIndex: 'name',
            scopedSlots: { customRender: 'name' }
          },
          {
            title: '任务地点',
            dataIndex: 'site'
          },
          {
            title: '负责人',
            dataIndex: 'principal'
          },
          {
            title: '任务状态',
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '创建时间',
            dataIndex: 'create_at',
            sorter: true
          },
          {
            title: '操作',
            dataIndex: 'action',
            width: '160px',
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
