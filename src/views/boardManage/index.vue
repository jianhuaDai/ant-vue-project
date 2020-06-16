<template>
  <div style="height: 100%">
    <a-row :gutter="8" style="height: 100%">
      <a-col :span="4" style="height: 100%">
        <a-card :bordered="false" title="区域" style="height: 100%">
          <area-tree @sendSelectNode="areaChange" />
        </a-card>
      </a-col>
      <a-col :span="20" style="height: 100%">
        <a-card :bordered="false">
          <div class="table-page-search-wrapper">
            <a-form layout="inline">
              <a-row :gutter="24">
                <a-col :md="9" :sm="24">
                  <a-form-item label="编号" style="margin-bottom: 0">
                    <a-input v-model="queryParam.billboard_num" placeholder=""/>
                  </a-form-item>
                </a-col>
                <a-col :md="9" :sm="24">
                  <a-form-item label="河道名称" style="margin-bottom: 0">
                    <a-input v-model="queryParam.water_name" placeholder=""/>
                  </a-form-item>
                </a-col>
                <a-col :md="6" :sm="24">
                  <div style="float: right">
                    <a-button style="margin-right: 8px" @click="resetQuery">重置</a-button>
                    <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                  </div>
                </a-col>
              </a-row>
            </a-form>
          </div>
        </a-card>
        <a-card :bordered="false" style="margin-top: 8px;height: calc(100% - 88px)" title="查询列表">
          <a-button slot="extra" type="primary" icon="plus" @click="handleEditOrNew()">新增</a-button>
          <s-table
            ref="table"
            size="default"
            :rowKey="(record) => record.employee_id"
            :columns="columns"
            :data="loadData"
            showPagination="auto"
          >
            <span slot="serial" slot-scope="text, record, index">
              {{ index + 1 }}defaul
            </span>
            <span slot="action" slot-scope="text, record, index">
              <template>
                <a @click="handleEditOrNew(record)">编辑</a>
                <a @click="handleDel(record)" style="margin-left: 10px;color: red">删除</a>
              </template>
            </span>
          </s-table>
          <edit-module ref="editModule" @ok="()=>this.$refs.table.refresh(true)"></edit-module>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import { STable, Ellipsis } from '@/components'
  import { boardManageList, deleteBoard } from '@/api/boardManage'
  import EditModule from './modules/EditModule'
  import AreaTree from '../../components/Hczy/AreaTree'

  export default {
    name: 'ChiefManage',
    components: { STable, Ellipsis, EditModule, AreaTree },
    methods: {
      areaChange (areas) {
        this.queryParam.regionalism_id = areas[0]
        this.$refs.table.refresh(true)
      },
      resetQuery () {
        this.queryParam.billboard_num = ''
        this.queryParam.water_name = ''
        this.$refs.table.refresh(true)
      },
      handleEditOrNew (record) {
        this.$refs.editModule.showModal(record)
      },
      handleDel (record) {
        const _this = this
        this.$confirm({
          title: '删除操作',
          content: `确定要删除${record.billboard_num}吗`,
          onOk () {
            deleteBoard(record.billboard_id).then(res => {
              _this.$message.success('删除成功')
              _this.$refs.table.refresh(true)
            })
          },
          onCancel () {
          }
        })
      }
    },
    created () {
    },
    data () {
      return {
        queryParam: {
          water_name: '',
          billboard_num: '',
          regionalism_id: '',
          status: 1
        },
        columns: [
          {
            title: '公示牌编码',
            dataIndex: 'billboard_num'
          },
          {
            title: '河道名称',
            dataIndex: 'water_name'
            // width: '60px'
          },
          {
            title: '行政区域',
            dataIndex: 'regionalism_name'
          },
          {
            title: '二维码',
            dataIndex: 'code_url'
            // width: '120px'
          },
          {
            title: '操作',
            dataIndex: 'action',
            width: '100px',
            scopedSlots: { customRender: 'action' }
          }
        ],
        loadData: parameter => {
          return boardManageList(Object.assign(parameter, this.queryParam))
            .then(res => {
              return res.data
            })
        },
        selectedRowKeys: [],
        selectedRows: []

      }
    }
  }
</script>
<style scoped>

</style>
