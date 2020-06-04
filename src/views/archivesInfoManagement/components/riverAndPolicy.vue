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
        :showPagination="true"
      >
        <template slot="attachment_url" slot-scope="text">
          <div v-for="(item, index) in text" :key="index">
            {{ item.name }}
          </div>
        </template>
        <span slot="status" slot-scope="text, record">
          <a-badge :status="text | statusBadge" :text="text | statusName" />
        </span>
        <span slot="action" slot-scope="text, record, index">
          <template>
            <a @click="handleEditOrNew(record)">编辑</a>
            <a @click="handleDel(record)" style="margin-left: 10px;color: red">删除</a>
          </template>
        </span>
      </s-table>
      <add-module ref="taskModule" :type="2" @refreshTable="$refs.table.refresh(true)"></add-module>
    </a-card>
  </div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { getArchivesList, deleteArchivesInfo } from '@/api/infomanage' // 接口调用
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
  props: {
    queryParam: {
      type: Object,
      default: () => {
        return {
          title: '',
          water_name: ''
        }
      }
    }
  },
  data () {
    return {
      checkedKeys: [],
      columns: [
        {
          title: '河湖名称',
          dataIndex: 'water_name',
          scopedSlots: { customRender: 'water_name' }
        },
        {
          title: '标题',
          dataIndex: 'title'
        },
        {
          title: '附件',
          dataIndex: 'attachment_url',
          scopedSlots: { customRender: 'attachment_url' }
        },
        {
          title: '发布人',
          dataIndex: 'author'
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
          width: '100px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
        return getArchivesList(Object.assign(parameter, this.queryParam, { type: 2 })).then(res => {
          return res.data
        })
      },
      selectedRowKeys: [],
      selectedRows: [],
      treeData: treeData
    }
  },
  methods: {
    goTo (record) {
      this.$router.push({ path: '/task/solution', query: { taskId: record.id, taskName: record.name } })
    },
    handleEditOrNew (record = {}) {
      this.$refs.taskModule.showModal(record)
    },
    handleDel (record) {
      const _this = this
      this.$confirm({
        title: '删除操作',
        content: `确定要删除${record.water_name}吗`,
        onOk () {
          deleteArchivesInfo(record.document_id).then((res) => {
            _this.$message.success('删除成功！')
            _this.$refs.table.refresh(true)
          })
        },
        onCancel () {}
      })
    }
  },
  created () {},
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
