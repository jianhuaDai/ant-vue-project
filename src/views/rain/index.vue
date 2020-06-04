<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="所属区域" style="margin-bottom: 0">
                <a-input v-model="queryParam.name" placeholder="" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="取水口名称" style="margin-bottom: 0">
                <a-input v-model="queryParam.status" placeholder="" />
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
    <a-card :bordered="false" style="margin-top: 12px" title="查询列表">
      <a-button slot="extra" type="primary" icon="plus" @click="handleEditOrNew()">新增</a-button>
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

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEditOrNew(record)">编辑</a>
            <a @click="handleDel(record)" style="margin-left: 10px;color: red">删除</a>
          </template>
        </span>
      </s-table>
      <add-module ref="taskModule" :formData="rowData"></add-module>
    </a-card>
  </div>
</template>

<script>
import PageView from '../../layouts/PageView'
import { STable, Ellipsis } from '@/components'
import { getTasks } from '@/api/getWater'
import AddModule from './modules/addModule'

export default {
  name: 'Rain',
  data () {
    return {
      queryParam: {
        name: '',
        status: ''
      },
      columns: [
        {
          title: '测站名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '测站编码',
          dataIndex: 'site'
        },
        {
          title: '所属水体',
          dataIndex: 'principal'
        },
        {
          title: '所属区域',
          dataIndex: 'create_at'
        },
        {
          title: '测站类别',
          dataIndex: 'is1'
        },
        {
          title: '监测方式',
          dataIndex: 'is2'
        },
        {
          title: '监测频次',
          dataIndex: 'is3'
        },
        {
          title: '所属部门',
          dataIndex: 'is4'
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
          res.data.list = res.data.list.map((item, index) => {
            return {
              ...item,
              id: index + 1
            }
          })
          return res.data
        })
      },
      selectedRowKeys: [],
      selectedRows: [],
      rowData: {
        id: '',
        name: '',
        site: '',
        principal: '',
        participant: '',
        progress: '',
        imageUrl: '',
        location: '1, 1'
      }
    }
  },
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
      record
        ? (this.rowData = record)
        : (this.rowData = {
            id: '',
            name: '',
            site: '',
            principal: '',
            participant: '',
            progress: '',
            imageUrl: '',
            location: '1, 1'
          })
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
  created () {}
}
</script>
<style scoped></style>
