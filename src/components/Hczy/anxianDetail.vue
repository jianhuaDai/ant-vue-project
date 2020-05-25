<template>
  <div class="detail-box">
    <div class="title-detail">岸线信息</div>
    <div>
      <a-row :gutter="24">
        <a-col :span="12">
          <div class="item-title">岸线范围名称:</div>
          <div class="item-content">{{ infoDetail.line_name }}</div>
        </a-col>
        <a-col :span="12">
          <div class="item-title">岸线编号:
          </div>
          <div class="item-content">{{ infoDetail.line_num }}</div>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <div class="item-title">管理单位:</div>
          <div class="item-content">{{ infoDetail.management_unit }}</div>
        </a-col>
        <a-col :span="12">
          <div class="item-title">所属区域:</div>
          <div class="item-content">{{ infoDetail.location_info }}</div>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <div class="item-title">岸线起点坐标:</div>
          <div class="item-content">{{ this.startPoint }}</div>
        </a-col>
        <a-col :span="12">
          <div class="item-title">岸线终点坐标:</div>
          <div class="item-content">{{ this.endPoint }}</div>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <div class="item-title">岸线长度(米):
          </div>
          <div class="item-content">{{ infoDetail.line_length }}</div>
        </a-col>
        <a-col :span="12">
          <div class="item-title">备注:</div>
          <div class="item-content"></div>
        </a-col>
      </a-row>
    </div>
    <div>
      <a-tabs defaultActiveKey="1">
        <a-tab-pane
          tab="工程信息"
          key="1">
          <a-table
            :dataSource="tabDatasource.proj"
            :pagination="false"
            size="small">
            <a-table-column
              title="工程类型"
              dataIndex="project_type"
              key="project_type"
              align="center"
              width="90px" />
            <a-table-column
              title="工程名称"
              key="name"
              align="center">
              <template slot-scope="text, record">
                <span class="link-to-detail">{{ record.name }}</span>
              </template>
            </a-table-column>
            <a-table-column
              title="占用岸线长度(米)"
              key="occupy_length"
              align="center">
              <template slot-scope="text, record">
                <span class="link-to-detail">{{ record.occupy_length }}</span>
              </template>
            </a-table-column>
            <a-table-column
              title="后方陆域面积（平方米）"
              key="upland_area"
              align="center">
              <template slot-scope="text, record">
                <span>{{ record.upland_area }}</span>
              </template>
            </a-table-column>
            <a-table-column
              title="陆域对应占用岸线长度（米）"
              key="upland_length"
              align="center">
              <template slot-scope="text, record">
                <span class="link-to-detail">{{ record.upland_length }}</span>
              </template>
            </a-table-column>
            <a-table-column
              title="保护范围长度（米）"
              key="protect_length"
              align="center">
              <template slot-scope="text, record">
                <span class="link-to-detail">{{ record.protect_length }}</span>
              </template>
            </a-table-column>
          </a-table>
        </a-tab-pane>
        <a-tab-pane
          tab="用地情况"
          key="2">
          <a-table
            :dataSource="tabDatasource.land"
            :pagination="false"
            size="small">
            <a-table-column
              title="所属区域"
              dataIndex="area"
              key="area"
              align="center" />
            <a-table-column
              title="所属岸线"
              dataIndex="shoreline"
              key="shoreline"
              align="center" />
            <a-table-column
              title="岸线类型"
              dataIndex="shoreline_type"
              key="shoreline_type"
              align="center" />
            <a-table-column
              title="土地类型"
              dataIndex="land_type"
              key="land_type"
              align="center" />
            <a-table-column
              title="土地编号"
              dataIndex="land_id"
              key="land_id"
              align="center" />
            <a-table-column
              title="土地面积（平方米）"
              key="land_area"
              align="center">
              <template slot-scope="text, record">
                <span class="link-to-detail">{{ record.land_area }}</span>
              </template>
            </a-table-column>
          </a-table>
        </a-tab-pane>
        <a-tab-pane
          tab="规划区域"
          key="3">
          <a-table
            :dataSource="tabDatasource.guihua"
            :pagination="false"
            size="small">
            <a-table-column
              title="所属区域"
              dataIndex="area"
              key="area"
              align="center" />
            <a-table-column
              title="所属岸线"
              dataIndex="shoreline"
              key="shoreline"
              align="center" />
            <a-table-column
              title="岸线类型"
              dataIndex="shoreline_type"
              key="shoreline_type"
              align="center" />
            <a-table-column
              title="规划信息名称"
              dataIndex="name"
              key="name"
              align="center" />
            <a-table-column
              title="行业分类"
              key="industry"
              align="center">
              <template slot-scope="text, record">
                <span class="link-to-detail">{{ record.industry_type+'-'+record.industry_type_child }}</span>
              </template>
            </a-table-column>
          </a-table>
        </a-tab-pane>
        <a-tab-pane
          tab="拟批项目"
          key="5">
          <a-table
            :dataSource="tabDatasource.proposed_project"
            :pagination="false"
            size="small">
            <a-table-column
              title="项目名称"
              dataIndex="name"
              key="name"
              align="center" />
            <a-table-column
              title="项目类型"
              dataIndex="project_type"
              key="project_type"
              align="center" />
            <a-table-column
              title="防洪标准"
              dataIndex="flood_control"
              key="flood_control"
              align="center" />
            <a-table-column
              title="报建时间"
              dataIndex="create_at"
              key="create_at"
              align="center" />
            <a-table-column
              title="建成时间"
              dataIndex="complete_at"
              key="complete_at"
              align="center" />
            <a-table-column
              title="土地类型"
              dataIndex="land_type"
              key="land_type"
              align="center" />
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
import { getHehuanxian } from '@/api/inforserve'
export default {
  components: {
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      detailList: '',
      infoDetail: {},
      tabDatasource: {},
      startPoint: '',
      endPoint: ''
    }
  },
  created () {
    this.loadDetailData()
  },
  methods: {
    loadDetailData () {
      // var reqData = {
      //   page: '1',
      //   page_size: '10',
      //   keyword: '',
      //   city_id: '3201'
      // }
      var reqData = {
        id: this.id
      }
      getHehuanxian(reqData).then(res => {
        this.infoDetail = res.data.list[0]
        this.tabDatasource = res.data.list[0].affiliate_tab[0]
        this.startPoint = this.infoDetail.geo_info.substring(1, 39)
        this.endPoint = this.infoDetail.geo_info.substring(this.infoDetail.geo_info.length - 41, this.infoDetail.geo_info.length - 1)
      })
    }
  }
}
</script>
<style scoped>
.detail-box {
  width: 100%;
}
.title-detail {
  height: 50px;
  width: 100%;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}
.item-title {
  float: left;
  width: 110px;
  margin-bottom: 10px;
}
.item-content {
  float: left;
}
</style>
