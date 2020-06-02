<template>
  <div class="main-view">
    <a-row class="row" :gutter="16" style="margin-left: -2px;">
      <a-col :span="4" class="left-tree-area">
        <AreaTree @sendSelectNode="getSelectNode"></AreaTree>
      </a-col>
      <a-col :span="20">
        <a-card :bordered="false">
          <div class="table-page-search-wrapper">
            <a-form layout="inline">
              <a-row :gutter="48">
                <a-col :md="8" :sm="24">
                  <a-form-item label="河湖名称" style="margin-bottom: 0">
                    <a-input v-model="queryParam.water_name" placeholder="" />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="标题" style="margin-bottom: 0">
                    <a-input v-model="queryParam.title" placeholder="" />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <div style="float: right">
                    <a-button style="margin-right: 8px" @click="resetQuery">重置</a-button>
                    <a-button type="primary" @click="search">查询</a-button>
                    <!-- <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button> -->
                  </div>
                </a-col>
              </a-row>
            </a-form>
          </div>
        </a-card>
        <!-- <task-module ref="taskModule"></task-module> -->
        <a-tabs v-model="activityKey" class="tabs-area" @change="tabsChange">
          <a-tab-pane key="stall" tab="一河一档">
            <RiverAndStall :queryParam="queryParam" ref="stall" />
          </a-tab-pane>
          <a-tab-pane key="policy" tab="一河一策">
            <RiverAndPolicy :queryParam="queryParam" ref="policy" />
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
import AreaTree from '@com/Hczy/AreaTree.vue'
export default {
  name: 'ArchivesInfoManagement',
  components: { STable, Ellipsis, RiverAndStall, RiverAndPolicy, AreaTree },
  methods: {
    getSelectNode (node) {
      this.queryParam.regionalism_id = node[0]
    },
    goTo (record) {
      this.$router.push({ path: '/task/solution', query: { taskId: record.id, taskName: record.name } })
    },
    resetQuery () {
      this.queryParam.title = ''
      this.queryParam.water_name = ''
      this.$refs[this.activityKey].$refs.table.refresh(true)
    },
    search () {
      this.$refs[this.activityKey].$refs.table.refresh(true)
    },
    tabsChange () {
      this.$nextTick(() => {
        this.$refs[this.activityKey].$refs.table.refresh(true)
      })
    }
  },
  created () {},
  data () {
    return {
      checkedKeys: [],
      treeData: treeData,
      queryParam: {
        water_name: '',
        title: '',
        regionalism_id: ''
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
