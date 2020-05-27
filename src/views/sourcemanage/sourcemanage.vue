<template>
  <div>
    <a-row :gutter="8">
      <a-col :span="24">
        <a-card :bordered="false" :bodyStyle="{padding:'6px 24px 0px 0px'}">
          <a-form
            :form="form"
            :style="{'margin-top':'16px'}">
            <a-row>
              <a-col :span="8">
                <a-form-item
                  label="污染源名称:"
                  :label-col="{span:9}"
                  :wrapper-col="{span:15}">
                  <a-input></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="污染源类型:"
                  :label-col="{span:9}"
                  :wrapper-col="{span:15}">
                  <a-select
                    placeholder="全部"
                    @change="cjjgChange"
                    style="width: 100%;">
                    <a-select-option value="1">工业污染源</a-select-option>
                    <a-select-option value="5">农业污染源</a-select-option>
                    <a-select-option value="10">城镇污染源</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col
                :span="5"
                :offset="3"
                style="text-align:right;">
                <a-form-item
                  label
                  :label-col="{span:0}"
                  :wrapper-col="{span:24}">
                  <a-button
                    type="primary"
                    @click="searchClick">查询</a-button>
                  <a-button
                    type="default"
                    class="resertBtn"
                    style="margin-left:8px;"
                    @click="resertClick">重置</a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-card>
      </a-col>
      <a-col
        :span="24"
        style="margin-top:16px;">
        <a-card
          title="查询列表"
          :style="{height: cardHeight + 'px'}"
          :bodyStyle="{padding:'10px 20px 10px 10px'}">
          <!-- <a-button
            slot="extra"
            type="primary"
            @click="gcAddClick">新增</a-button> -->
          <a-row :gutter="8">
            <a-col :span="24">
              <s-table
                ref="table"
                size="default"
                :rowKey="record => record.id"
                :columns="columns"
                :data="loadData"
                showPagination="true"
              >
                <span slot="serial" slot-scope="text, record, index">
                  {{ index + 1 }}
                </span>
                <span slot="status" slot-scope="text">
                  <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
                </span>
                <span slot="name" slot-scope="text, record">
                  <a @click="goTo(record)">{{ text }}</a>
                </span>

                <span slot="action" slot-scope="text, record, index">
                  <template>
                    <a @click="() => {}" v-show="record.publish !== '1'" v-html="'&emsp;发布'"></a>
                    <span style="font-size: 14px" v-show="record.publish === '1'">已发布</span>
                    <a-divider type="vertical" />
                    <a @click="handleEditOrNew(record)">编辑</a>
                    <a @click="handleDel(record)" style="margin-left: 10px;color: red">删除</a>
                  </template>
                </span>
              </s-table>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { STable } from '@/components'
// import { getSourceList } from '@/api/task' // 接口调用
export default {
  components: {
    STable
  },
  data () {
    return {
      cardHeight: window.innerHeight - 215,
      form: this.$form.createForm(this),
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '区域',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '污染源名称',
          dataIndex: 'site'
        },
        {
          title: '位置',
          dataIndex: 'principal'
        },
        {
          title: '经纬度',
          dataIndex: 'person'
        },
        {
          title: '污染源类型',
          dataIndex: 'create_at'
          // sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '160px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
        // alert('123')
        return [{ name: 'sss' }]
        // return getTasks(Object.assign(parameter, this.queryParam))
        //   .then(res => {
        //     return res.data
        //   })
      }
    }
  },
  created () {

  },
  methods: {
    // 污染源类型触发
    cjjgChange () {

    },
    searchClick () {

    },
    resertClick () {

    }
  }
}
</script>
<style scoped>
</style>
