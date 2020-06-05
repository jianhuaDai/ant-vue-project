<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="排口类型" style="margin-bottom: 0">
                <dictionary-select
                  v-model="queryParam.sewage_type"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.DIC_SEWAGE_TYPE"
                >
                </dictionary-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="排污口名称" style="margin-bottom: 0">
                <a-input v-model="queryParam.sewage_name" placeholder="" />
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
import { getOutfallList } from '@/api/outfall'
import AddModule from './modules/addModule'

export default {
  name: 'Outfall',
  data () {
    return {
      queryParam: {
        sewage_type: 0,
        sewage_name: ''
      },
      columns: [
        {
          title: '排污口名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '位置',
          dataIndex: 'site'
        },
        {
          title: '排污来源',
          dataIndex: 'principal'
        },
        // {
        //   title: '经纬度',
        //   dataIndex: 'create_at'
        // },
        {
          title: '排水去向',
          dataIndex: 'is1'
        },
        {
          title: '排口类型',
          dataIndex: 'is2'
        },
        {
          title: '所属区域',
          dataIndex: 'is3'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '160px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
        return getOutfallList(Object.assign(parameter, this.queryParam)).then(res => {
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
