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
                <a-tree-select v-model="queryParam.functional_type" :allowClear="true" :treeData="treeData" :treeDataSimpleMode="true" placeholder="" />
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
      <a-button slot="extra" type="primary" icon="plus" @click="handleEditOrNew()">新增</a-button>
      <s-table
        ref="table"
        size="default"
        :rowKey="record => record.id"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
      >
        <span slot="action" slot-scope="text, record, index">
          <template>
            <a @click="handleEditOrNew(record)">编辑</a>
            <a @click="handleDel(record)" style="margin-left: 10px;color: red">删除</a>
          </template>
        </span>
      </s-table>
      <add-module ref="waterFunModule" :treeData="treeData" @refreshTable="$refs.table.refresh(true)"></add-module>
    </a-card>
  </div>
</template>

<script>
import { getDictionary } from '@/api/dictionary'
import { getWaterFunList } from '@/api/waterfun'
import { STable, Ellipsis } from '@/components'
import AddModule from './modules/addModule'
import { options } from './data.js'
import { columns } from './columns.js'
export default {
  name: 'WaterFunManagement',
  components: { STable, Ellipsis, AddModule },
  data () {
    return {
      queryParam: {
        name: '',
        functional_type: null
      },
      columns,
      treeData: [],
      loadData: parameter => {
        return getWaterFunList(Object.assign(parameter, this.queryParam)).then(res => {
          return res.data
        })
      },
      selectedRowKeys: [],
      selectedRows: [],
      options: options,
      showAddModule: false
    }
  },
  created () {
    this.getTreeData()
  },
  methods: {
    getTreeData () {
      getDictionary('functional_type').then((res) => {
        this.treeData = res.data.map((item) => {
          return {
            ...item,
            label: item.name,
            pId: item.pid,
            id: item.value
          }
        })
      })
    },
    resetQuery () {
      this.queryParam.functional_type = null
      this.queryParam.name = ''
      this.$refs.table.refresh(true)
    },
    handleEditOrNew (record) {
      this.$refs.waterFunModule.showModal(record)
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
  filters: {}
}
</script>
<style scoped></style>
