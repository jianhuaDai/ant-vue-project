<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="功能区名称" style="margin-bottom: 0">
                <a-input v-model="queryParam.name" placeholder="" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="级别类型" style="margin-bottom: 0">
                <a-cascader :options="options" placeholder=""/>
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
        :rowKey="record => record.id"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
      >
        <span slot="name" slot-scope="text, record">
          <a @click="goTo(record)">{{ text }}</a>
        </span>

        <span slot="action" slot-scope="text, record, index">
          <template>
            <a @click="handleEditOrNew(record)">修改</a>
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
import { getTasks } from '@/api/getWater'
import AddModule from './modules/addModule'
import { options } from './data.js'
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
        onOk () {},
        onCancel () {}
      })
    }
  },
  created () {},
  data () {
    return {
      queryParam: {
        name: '',
        status: ''
      },
      columns: [
        {
          title: '功能区名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '级别',
          dataIndex: 'site'
        },
        {
          title: '类型',
          dataIndex: 'principal'
        },
        {
          title: '经纬度',
          dataIndex: 'create_at'
        },
        {
          title: '是否为考核水功能区',
          dataIndex: 'a1'
        },
        {
          title: '水质目标',
          dataIndex: 'a2'
        },
        {
          title: '所属区域',
          dataIndex: 'a3'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '160px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
        return getTasks(Object.assign(parameter, this.queryParam)).then(res => {
          return res.data
        })
      },
      selectedRowKeys: [],
      selectedRows: [],
      options: options
    }
  },
  filters: {}
}
</script>
<style scoped></style>
