<template>
  <div>
    <a-card>
      <a-steps :current="1">
        <a-step>
          <!-- <span slot="title">Finished</span> -->
          <template slot="title">
            采砂申报管理
          </template>
          <span slot="description">
            所有采砂申请都需要在信息填完后提交给主管单位审批。
          </span>
        </a-step>
        <a-step title="In Progress" sub-title="Left 00:00:08" description="This is a description." />
        <a-step title="Waiting" description="This is a description." />
      </a-steps>
    </a-card>
    <a-card :bordered="false" style="margin-top: 24px;">
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
        <span slot="lon_lat" slot-scope="text">
          {{ text.length > 0 ? text[0] + ',' + text[1] : '' }}
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEditOrNew(record)">编辑</a>
            <a @click="handleDel(record)" style="margin-left: 10px;color: red">删除</a>
          </template>
        </span>
      </s-table>
      <add-module ref="taskModule" @refreshTable="$refs.table.refresh(true)"></add-module>
    </a-card>
  </div>
</template>

<script>
import PageView from '../../layouts/PageView'
import { STable, Ellipsis } from '@/components'
import { getOutfallList, deleteOutfall } from '@/api/outfall'
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
          dataIndex: 'sewage_name',
          scopedSlots: { customRender: 'sewage_name' }
        },
        // {
        //   title: '位置',
        //   dataIndex: 'location'
        // },
        {
          title: '排污来源',
          dataIndex: 'come_from'
        },
        {
          title: '经纬度',
          dataIndex: 'lon_lat',
          scopedSlots: { customRender: 'lon_lat' }
        },
        {
          title: '排水去向',
          dataIndex: 'in_river_way_name'
        },
        {
          title: '排口类型',
          dataIndex: 'sewage_type_name'
        },
        {
          title: '所属区域',
          dataIndex: 'regionalism_name'
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
      }
    }
  },
  components: { PageView, STable, Ellipsis, AddModule },
  methods: {
    goTo (record) {
      this.$router.push({ path: '/task/solution', query: { taskId: record.id, taskName: record.name } })
    },
    resetQuery () {
      this.queryParam.sewage_type = 0
      this.queryParam.name = ''
      this.$refs.table.refresh(true)
    },
    handleEditOrNew (record) {
      this.$refs.taskModule.showModal(record)
    },
    handleDel (record) {
      const _this = this
      this.$confirm({
        title: '删除操作',
        content: `确定要删除${record.sewage_name}吗`,
        onOk () {
          deleteOutfall(record.sewage_id).then(() => {
            _this.$message.success('删除成功！')
            _this.$refs.table.refresh(true)
          })
        },
        onCancel () {}
      })
    }
  },
  created () {}
}
</script>
<style scoped></style>
