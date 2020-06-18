<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="所属区域" style="margin-bottom: 0">
                <a-tree-select v-model="queryParam.regionalism_id" :treeData="treeData"> </a-tree-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="取水口名称" style="margin-bottom: 0">
                <a-input v-model="queryParam.name" placeholder="" />
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
        <span slot="is_transfer" slot-scope="text">
          {{ text | isExamineName }}
        </span>
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
      <add-module ref="getWaterModule" @refreshTable="$refs.table.refresh(true)"></add-module>
    </a-card>
  </div>
</template>

<script>
import PageView from '../../layouts/PageView'
import { STable, Ellipsis } from '@/components'
import { getWaterList, deleteWater } from '@/api/getWater'
import AddModule from './modules/addModule'
import { treeData } from '@/config/areaTreeSelectData'
export default {
  name: 'GetWaterManagement',
  data () {
    return {
      treeData,
      queryParam: {
        regionalism_id: null,
        name: ''
      },
      columns: [
        {
          title: '取水口名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '取水流量',
          dataIndex: 'ammount'
        },
        {
          title: '所属水源地',
          dataIndex: 'source_name'
        },
        {
          title: '经纬度',
          dataIndex: 'lon_lat',
          scopedSlots: { customRender: 'lon_lat' }
        },
        {
          title: '是否为引调水工程取水口',
          dataIndex: 'is_transfer',
          scopedSlots: { customRender: 'is_transfer' }
        },
        {
          title: '取水方式',
          dataIndex: 'get_water_type_name'
        },
        {
          title: '所属区域',
          dataIndex: 'regionalism_name'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '100px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
        return getWaterList(Object.assign(parameter, this.queryParam)).then(res => {
          return res.data
        })
      }
    }
  },
  components: { PageView, STable, Ellipsis, AddModule },
  methods: {
    resetQuery () {
      this.queryParam.name = ''
      this.queryParam.regionalism_id = null
      this.$refs.table.refresh(true)
    },
    handleEditOrNew (record) {
      this.$refs.getWaterModule.showModal(record)
    },
    handleDel (record) {
      const _this = this
      this.$confirm({
        title: '删除操作',
        content: `确定要删除${record.name}吗`,
        onOk () {
          deleteWater(record.get_water_id).then(() => {
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
