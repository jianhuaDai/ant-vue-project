<template>
  <div style="height: 100%">
    <a-row :gutter="8" style="height: 100%">
      <a-col :span="24" style="height: 100%">
        <a-card :bordered="false" style="margin-top: 8px;height: calc(100% - 88px)" title="模版列表">
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
  import { templateList, deleteTemplate } from '@/api/template'
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
          content: `确定要删除${record.template_name}吗`,
          onOk () {
            deleteTemplate(record.template_id).then(res => {
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
            title: '模版名称',
            dataIndex: 'template_name'
          },
          {
            title: '创建人',
            dataIndex: 'user_name'
            // width: '60px'
          },
          {
            title: '创建时间',
            dataIndex: 'create_at'
          },
          {
            title: '操作',
            dataIndex: 'action',
            width: '100px',
            scopedSlots: { customRender: 'action' }
          }
        ],
        loadData: parameter => {
          return templateList(Object.assign(parameter, this.queryParam))
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
