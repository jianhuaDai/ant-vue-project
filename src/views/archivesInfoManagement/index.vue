<template>
  <div class="main-view">
    <a-row class="row" :gutter="24">
      <a-col :span="4" class="left-tree-area">
        <a-tree
          v-model="checkedKeys"
          :tree-data="treeData"
        />
      </a-col>
      <a-col :span="20">
        <a-card :bordered="false">
          <div class="table-page-search-wrapper">
            <a-form layout="inline">
              <a-row :gutter="48">
                <a-col :md="8" :sm="24">
                  <a-form-item label="河湖名称" style="margin-bottom: 0">
                    <a-input v-model="queryParam.name" placeholder="" />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="河湖标题" style="margin-bottom: 0">
                    <a-input v-model="queryParam.title" placeholder="" />
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
        <!-- <task-module ref="taskModule"></task-module> -->
        <a-tabs default-active-key="1" class="tabs-area">
          <a-tab-pane key="1" tab="一河一档">
            <RiverAndStall/>
          </a-tab-pane>
          <a-tab-pane key="2" tab="一河一策">
            <RiverAndPolicy/>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
// import { getTasks } from '@/api/task' // 接口调用
import { treeData } from './data.js'
import RiverAndStall from './components/riverAndStall'
import RiverAndPolicy from './components/riverAndPolicy'
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
  name: 'ArchivesInfoManagement',
  components: { STable, Ellipsis, RiverAndStall, RiverAndPolicy },
  methods: {
    goTo (record) {
      this.$router.push({ path: '/task/solution', query: { taskId: record.id, taskName: record.name } })
    },
    resetQuery () {
      this.queryParam.status = ''
      this.$refs.table.refresh(true)
    },
    handleEditOrNew (record) {
      // this.$refs.taskModule.showModal(record)
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
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
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
        return [{ name: 'sss' }]
        // return getTasks(Object.assign(parameter, this.queryParam))
        //   .then(res => {
        //     return res.data
        //   })
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
  .tabs-area ::v-deep {
    .ant-tabs-bar {
      margin: 10px 0 0 0;
      background: #ffffff;
    }
  }
}
</style>
