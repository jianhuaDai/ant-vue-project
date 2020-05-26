<template>
  <div class="main-view">
    <a-row class="row" :gutter="24">
      <a-col :span="4" class="left-tree-area">
        <a-tree
          v-model="checkedKeys"
          :tree-data="treeData"
        />
      </a-col>
      <a-col :span="20">
        <a-card :bordered="false">
          <div class="table-page-search-wrapper">
            <a-form layout="inline">
              <a-row :gutter="48">
                <a-col :md="8" :sm="24">
                  <a-form-item label="河湖名称" style="margin-bottom: 0">
                    <a-input v-model="queryParam.name" placeholder="" />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="河湖标题" style="margin-bottom: 0">
                    <a-input v-model="queryParam.title" placeholder="" />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <div style="float: right">
                    <a-button style="margin-right: 8px" @click="resetQuery">重置</a-button>
                    <a-button type="primary">查询</a-button>
                    <!-- <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button> -->
                  </div>
                </a-col>
              </a-row>
            </a-form>
          </div>
        </a-card>
        <!-- <task-module ref="taskModule"></task-module> -->
        <a-tabs v-model="activityKey" class="tabs-area">
          <a-tab-pane key="stall" tab="一河一档">
            <RiverAndStall ref="stall"/>
          </a-tab-pane>
          <a-tab-pane key="policy" tab="一河一策">
            <RiverAndPolicy ref="policy" />
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
// import { getTasks } from '@/api/task' // 接口调用
import { treeData } from './data.js'
import RiverAndStall from './components/riverAndStall'
import RiverAndPolicy from './components/riverAndPolicy'

export default {
  name: 'ArchivesInfoManagement',
  components: { STable, Ellipsis, RiverAndStall, RiverAndPolicy },
  methods: {
    goTo (record) {
      this.$router.push({ path: '/task/solution', query: { taskId: record.id, taskName: record.name } })
    },
    resetQuery () {
      this.queryParam.name = ''
      this.queryParam.title = ''
      this.$refs[this.activityKey].$refs.table.refresh(true)
    }
  },
  created () {},
  data () {
    return {
      checkedKeys: [],
      treeData: treeData,
      queryParam: {
        name: '',
        title: ''
      },
      activityKey: 'stall'
    }
  }
}
</script>
<style lang="less" scoped>
.main-view {
  height: 100%;
  .row {
    height: 100%;
    .left-tree-area {
      background: #ffffff;
      height: 100%;
      padding: 16px 0 0 16px;
    }
  }
  .tabs-area ::v-deep {
    .ant-tabs-bar {
      margin: 10px 0 0 0;
      background: #ffffff;
    }
  }
}
</style>
