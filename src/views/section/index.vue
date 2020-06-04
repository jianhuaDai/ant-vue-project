<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="断面名称" style="margin-bottom: 0">
                <a-input v-model="queryParam.fracture_name" placeholder="" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="断面编号" style="margin-bottom: 0">
                <a-input v-model="queryParam.fracture_id" placeholder="" />
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
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEditOrNew(record)">编辑</a>
            <a @click="handleDel(record)" style="margin-left: 10px;color: red">删除</a>
          </template>
        </span>
      </s-table>
      <add-module ref="taskModule" :isAdd="isAdd" @refreshTable="$refs.table.refresh(true)"></add-module>
    </a-card>
  </div>
</template>

<script>
import PageView from '../../layouts/PageView'
import { STable, Ellipsis } from '@/components'
import { getSectionList } from '@/api/section'
import AddModule from './modules/addModule'

export default {
  name: 'Section',
  data () {
    return {
      queryParam: {
        fracture_name: '',
        fracture_id: ''
      },
      columns: [
        {
          title: '断面名称',
          dataIndex: 'fracture_name',
          scopedSlots: { customRender: 'fracture_name' }
        },
        {
          title: '断面编码',
          dataIndex: 'fracture_id'
        },
        {
          title: '所属水体',
          dataIndex: 'water_name'
        },
        {
          title: '所属区域',
          dataIndex: 'is1'
        },
        {
          title: '经纬度',
          dataIndex: 'lon_lat'
        },
        {
          title: '属性',
          dataIndex: 'fracture_property'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '100px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
        return getSectionList(Object.assign(parameter, this.queryParam)).then(res => {
          return res.data
        })
      },
      isAdd: false
    }
  },
  components: { PageView, STable, Ellipsis, AddModule },
  methods: {
    resetQuery () {
      this.queryParam.status = ''
      this.$refs.table.refresh(true)
    },
    handleEditOrNew (record) {
      if (record) {
        this.isAdd = false
      } else {
        this.isAdd = true
      }
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
