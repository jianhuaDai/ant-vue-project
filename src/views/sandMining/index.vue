<template>
  <div>
    <a-card>
      <a-steps :current="mainMenu">
        <a-step>
          <!-- <span slot="title">Finished</span> -->
          <template slot="title">
            采砂申报管理
          </template>
          <span slot="description">
            所有采砂申请都需要在信息填完后提交给主管单位审批。
          </span>
        </a-step>
        <a-step>
          <!-- <span slot="title">Finished</span> -->
          <template slot="title">
            采砂审批管理
          </template>
          <span slot="description">
            内容核实有误的数据需要驳回重新修改，审批完成的信息方可正常使用
          </span>
        </a-step>
        <a-step>
          <!-- <span slot="title">Finished</span> -->
          <template slot="title">
            审批后数据管理
          </template>
          <span slot="description">
            显示并管理审核通过后的数据
          </span>
        </a-step>
      </a-steps>
    </a-card>
    <a-card :bordered="false" style="margin-top: 24px;">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="所属区域" style="margin-bottom: 0">
                <a-tree-select v-model="queryParam.regionalism_id" :treeData="treeData"> </a-tree-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="所属岸线" style="margin-bottom: 0">
                <a-input v-model="queryParam.river_line_id" placeholder="" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="审批状态" style="margin-bottom: 0">
                <a-select v-model="queryParam.approval_status">
                  <a-select-option v-for="item in approvalStatus" :key="item.value" :value="item.value">
                    {{ item.label }}
                  </a-select-option>
                </a-select>
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
        <span slot="approval_status" slot-scope="text">
          {{ text | approvalStatus }}
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a v-if="record.approval_status == 0 && mainMenu == 0">
              <a-popconfirm title="确定提交?" ok-text="是" cancel-text="否" @confirm="confirm(record)">
                <a href="#">提交</a>
              </a-popconfirm>
            </a>
            <a v-if="record.approval_status == 1 && mainMenu == 1">
              <a-popconfirm title="确定提交?" ok-text="通过" cancel-text="驳回" @confirm="confirmAprove(record)" @cancel="cancelAprove(record)">
                <a href="#">审批</a>
              </a-popconfirm>
            </a>
            <!-- <a v-if="record.approval_status != 0" @click="handleEditOrNew(record)">详情</a> -->
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
import { getSendMingList, deleteSendMing, editSendMing } from '@/api/sendMing'
import AddModule from './modules/addModule'
import { treeData } from '@/config/areaTreeSelectData'
import { mapState } from 'vuex'
export default {
  name: 'Outfall',
  data () {
    return {
      treeData,
      queryParam: {
        regionalism_id: null,
        river_line_id: '',
        approval_status: null
      },
      approvalStatus: [
        {
          label: '保存',
          value: 0
        },
        {
          label: '提交待审批',
          value: 1
        },
        {
          label: '通过',
          value: 2
        },
        {
          label: '驳回',
          value: 3
        }
      ],
      columns: [
        {
          title: '所属区域',
          dataIndex: 'regionalism_name',
          scopedSlots: { customRender: 'regionalism_name' }
        },
        // {
        //   title: '位置',
        //   dataIndex: 'location'
        // },
        {
          title: '所属岸线',
          dataIndex: 'line_name'
        },
        {
          title: '岸线类型',
          dataIndex: 'line_type_name',
          scopedSlots: { customRender: 'line_type_name' }
        },
        {
          title: '采砂单位',
          dataIndex: 'company'
        },
        {
          title: '采砂船号',
          dataIndex: 'hull_no'
        },
        {
          title: '采砂船主',
          dataIndex: 'ship_owner'
        },
        {
          title: '审批状态',
          dataIndex: 'approval_status',
          scopedSlots: { customRender: 'approval_status' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '160px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
        return getSendMingList(Object.assign(parameter, this.queryParam)).then(res => {
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
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => (state.user.roles.role === 'province' ? 0 : 1)
    })
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
    confirm (rowData) {
      const params = Object.assign(rowData, {
        approval_status: 1
      })
      editSendMing(params.sand_mining_id, params)
        .then(res => {
          this.$message.success('提交成功!')
          this.$refs.table.refresh(true)
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    confirmAprove (rowData) {
      const params = Object.assign(rowData, {
        approval_status: 2
      })
      editSendMing(params.sand_mining_id, params)
        .then(res => {
          this.$message.success('审批成功!')
          this.$refs.table.refresh(true)
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    cancelAprove (rowData) {
      const params = Object.assign(rowData, {
        approval_status: 3
      })
      editSendMing(params.sand_mining_id, params)
        .then(res => {
          this.$message.success('审批成功!')
          this.$refs.table.refresh(true)
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    handleDel (record) {
      const _this = this
      this.$confirm({
        title: '删除操作',
        content: `确定要删除${record.sewage_name}吗`,
        onOk () {
          deleteSendMing(record.sewage_id).then(() => {
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
