<template>
  <div class="main-view">
    <a-card :bordered="false" style="margin-top: 12px" title="查询列表">
      <a-button slot="extra" type="primary" icon="plus" @click="handleEditOrNew()">新增</a-button>
      <s-table
        ref="table"
        size="default"
        :rowKey="record => record.id"
        :columns="columns"
        :data="loadData"
        showPagination="true"
      >
        <span slot="name" slot-scope="text, record">
          <a @click="goTo(record)">{{ text }}</a>
        </span>

        <span slot="action" slot-scope="text, record, index">
          <template>
            <a @click="() => {}" v-show="record.publish !== '1'" v-html="'&emsp;发布'"></a>
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
import { STable, Ellipsis } from '@/components'
import { getTasks } from '@/api/task' // 接口调用
import { treeData } from '../data.js'
 import AddModule from '../modules/AddModule'
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
  name: 'RiverAndStall',
  components: { STable, Ellipsis, AddModule },
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
      checkedKeys: [],
      queryParam: {
        name: '',
        status: ''
      },
      columns: [
        {
          title: '河湖名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '标题',
          dataIndex: 'site'
        },
        {
          title: '附件',
          dataIndex: 'principal'
        },
        {
          title: '发布人',
          dataIndex: 'person'
        },
        {
          title: '时间',
          dataIndex: 'create_at'
          // sorter: true
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
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
      selectedRows: [],
      treeData: treeData
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
<style lang="less" scoped>
.main-view {
  height: 100%;
  .row {
    height: 100%;
    .left-tree-area {
      background: #ffffff;
      height: 100%;
      padding: 16px 0 0 16px;
    }
  }
}
</style>
