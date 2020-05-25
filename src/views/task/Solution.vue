<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="方案名称">
                <a-input v-model="queryParam.name" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="行政区划">
                <a-cascader
                  :options="city.options"
                  :defaultValue="city.defaultValue"
                  change-on-select
                  placeholder=""
                  style="width: 100%"
                  popupClassName="popup-city"
                  :popupStyle="{height: '320px'}"
                  :allow-clear="false"
                  v-model="city.value"
                  :field-names="city.fieldNames" >
                </a-cascader>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="时间范围">
                <a-range-picker v-model="queryParam.time" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="48">
            <a-col :md="24" :sm="24">
              <div style="float: right">
                <a-button style="margin-right: 8px" @click="resetQuery">重置</a-button>
                <a-button type="primary" @click="refreshTable">查询</a-button>
              </div>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card :bordered="false" style="margin-top: 12px" :title="taskName">
      <a-button slot="extra" type="primary" icon="plus" @click="handleEditOrNew()">添加方案</a-button>
      <s-table
        ref="table"
        size="default"
        :rowKey="(record) => record.id"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ getSerial(record.num) }}
        </span>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="name" slot-scope="text, record">
          <a @click="goTo(record)">{{ text }}</a>
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEditOrNew(record.id)">编辑</a>
            <a-divider type="vertical" />
            <a @click="handleDel(record)" style="color: red">删除</a>
          </template>
        </span>
      </s-table>
      <solution-module ref="solutionModel"></solution-module>
    </a-card>
  </div>
</template>

<script>
  import PageView from '../../layouts/PageView'
  import { STable, Ellipsis } from '@/components'
  import { getSolutions, delSolution } from '@/api/task'
  import City from '../map/config/City'
  import SolutionModule from './modules/SolutionModule'

  const statusMap = {
    0: {
      status: 'default',
      text: '关闭'
    },
    1: {
      status: 'processing',
      text: '运行中'
    },
    2: {
      status: 'success',
      text: '已上线'
    },
    3: {
      status: 'error',
      text: '异常'
    }
  }

  export default {
    name: 'Solution',
    components: { PageView, STable, Ellipsis, SolutionModule },
    methods: {
      refreshTable () {
        this.$refs.table.refresh(true)
      },
      getSerial (num) {
        return `S-${num}`
      },
      cityChange (value) {
        this.queryParam.area_id = this.city.value.slice(-1)[0]
      },
      goTo (record) {
        this.$router.push({ path: '/task/solution', query: { taskId: record.id } })
      },
      resetQuery () {
        this.queryParam.name = ''
        // this.queryParam.task_id = { task_id: this.queryParam.task_id }
        this.city.value = ['32']
        this.$refs.table.refresh(true)
      },
      handleEditOrNew (solutionId) {
        this.$router.push({ path: '/task/solution/detail', query: { solutionId: solutionId, taskId: this.queryParam.task_id } })
        // this.$refs.solutionModel.showModal(record)
      },
      handleDel (record) {
        this.$confirm({
          title: '删除操作',
          content: `确定要删除${record.name}吗`,
          onOk () {
            delSolution({ id: record.id }).then(res => {
              this.$refs.table.refresh()
            })
          },
          onCancel () {
          }
        })
      }
    },
    created () {
      this.queryParam.task_id = this.$route.query.taskId
      this.taskName = this.$route.query.taskName
    },
    data () {
      return {
        taskName: '方案列表',
        queryParam: {
          task_id: '',
          name: '',
          status: 0
        },
        columns: [
          {
            title: '方案序列',
            dataIndex: 'num',
            width: '200px'
            // scopedSlots: { customRender: 'serial' }
          },
          {
            title: '方案名称',
            dataIndex: 'name',
            width: '200px'
          },
          {
            title: '方案负责人',
            dataIndex: 'principal'
          },
          {
            title: '区域',
            dataIndex: 'area'
          },
          {
            title: '内容',
            dataIndex: 'context',
            width: '400px'
          },
          {
            title: '制定时间',
            dataIndex: 'create_at',
            sorter: true
          },
          {
            title: '操作',
            dataIndex: 'action',
            width: '160px',
            scopedSlots: { customRender: 'action' }
          }
        ],
        loadData: parameter => {
          return getSolutions(Object.assign(parameter, this.queryParam))
            .then(res => {
              return res.data
            })
        },
        selectedRowKeys: [],
        selectedRows: [],
        city: {
          options: City,
          fieldNames: {
            label: 'name',
            value: 'id',
            children: 'children'
          },
          value: ['32'],
          city: {
            options: City,
            fieldNames: {
              label: 'name',
              value: 'id',
              children: 'children'
            },
            value: ['32']
          }
        }

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
<style scoped>

</style>
