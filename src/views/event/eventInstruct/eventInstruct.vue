<template>
  <div class="duty-statis">
    <div class="duty-statis-cont">
      <a-row>
        <a-col :span="24">
          <a-row :gutter="8">
            <a-col :span="24">
              <a-card :bodyStyle="{padding:'10px 20px 10px 10px'}">
                <a-form :form="form" :style="{'margin-top':'16px'}">
                  <a-row>
                    <a-col :span="7">
                      <a-form-item label="事件名称:" :label-col="{span:9}" :wrapper-col="{span:15}">
                        <a-input v-decorator="['event_name']"></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="7">
                      <a-form-item label="事件分类:" :label-col="{span:9}" :wrapper-col="{span:15}">
                        <!-- <a-input v-decorator="['type']"></a-input> -->
                        <a-select
                          placeholder="全部"
                          @change="areaSelectClick"
                          v-decorator="['type']">
                          <a-select-option value="水资源保护">水资源保护</a-select-option>
                          <a-select-option value="岸线管理">岸线管理</a-select-option>
                          <a-select-option value="水污染">水污染</a-select-option>
                          <a-select-option value="水环境">水环境</a-select-option>
                          <a-select-option value="生态修复">生态修复</a-select-option>
                          <a-select-option value="河道违法">河道违法</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="5" :offset="5" style="text-align:right;">
                      <a-form-item label :label-col="{span:0}" :wrapper-col="{span:24}">
                        <a-button type="primary" @click="searchClick">查询</a-button>
                        <a-button type="default" class="resertBtn" @click="resertClick">重置</a-button>
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-form>
              </a-card>
            </a-col>
            <a-col :span="24" style="margin-top:8px;">
              <a-card :bodyStyle="{padding:'16px'}" :style="{height: listHeight + 'px'}">
                <!-- <a-table
            :dataSource="data"
            :style="{height:tableHeight + 'px'}"
            :pagination="false"
            bordered
            :loading="dataLoad"
                >-->

                <a-tabs defaultActiveKey="1" @change="callback">
                  <a-tab-pane tab="被批示列表" key="1">
                    <a-col :span="24">
                      <a-table
                        :dataSource="data"
                        :pagination="false"
                        :scroll="{x:860,y:tableHeight }"
                        :loading="dataLoad"
                        :columns="columns"
                      >
                        <!-- <span slot="status" slot-scope="status">
                          <a-tag
                            :color="status === '受理中' ? 'orange' : status === '待办中' ? 'green':status==='跟踪中'?'cyan':status==='批示中'?'blue':status==='已完成'?'purple':'geekblue'"
                            :key="status"
                          >
                            {{ status.toUpperCase() }}
                          </a-tag>
                        </span> -->
                        <template
                        slot="status"
                        slot-scope="text, record">
                        <div v-if="record.status == '受理中'">
                          <span class="lixiangID"></span>
                          受理中
                        </div>
                        <div v-if="record.status == '待办中'">
                          <span class="banliID"></span>
                          待办中
                        </div>
                        <div v-if="record.status == '跟踪中'">
                          <span class="hechaID"></span>
                          跟踪中
                        </div>
                        <div v-if="record.status == '批示中'">
                          <span class="guidangID"></span>
                          批示中
                        </div>
                        <div v-if="record.status == '已完成'">
                          <span class="guidangID1"></span>
                          已完成
                        </div>
                      </template>
                        <!-- <a-table-column title="序号" data-index="key" key="key" align="center" width="65px"></a-table-column> -->
                        <template slot="action" slot-scope="text, record">
                          <span class="btnGroup1">
                            <a-button
                              size="small"
                              class="modifyClass"
                              @click="viewDetail(record,1)"
                            >批示</a-button>&nbsp;
                            <!-- <a-button size="small" class="modifyClass" @click="viewDetail(record,1)">处理</a-button>&nbsp; -->
                          </span>
                        </template>
                      </a-table>
                    </a-col>
                    <a-col :span="24" style="text-align:right;margin-top:10px;">
                      <a-pagination
                        showQuickJumper
                        :defaultCurrent="1"
                        :total="10"
                        :pageSizeOptions="pageSizeOptions"
                        showSizeChanger
                      />
                    </a-col>
                  </a-tab-pane>
                  <a-tab-pane tab="已批示列表" key="2" forceRender>
                    <a-col :span="24">
                      <a-table
                        :dataSource="data"
                        :pagination="false"
                        :scroll="{x:860,y:tableHeight }"
                        :loading="dataLoad"
                        :columns="columns"
                      >
                        <span slot="status" slot-scope="status">
                          <a-tag
                            :color="status === '受理中' ? 'orange' : status === '待办中' ? 'green':status==='跟踪中'?'cyan':status==='批示中'?'blue':status==='已完成'?'purple':'geekblue'"
                            :key="status"
                          >
                            {{ status.toUpperCase() }}
                          </a-tag>
                        </span>
                        <!-- <a-table-column title="序号" data-index="key" key="key" align="center" width="65px"></a-table-column> -->
                        <template slot="action" slot-scope="text, record">
                          <span class="btnGroup1">
                            <a-button
                              size="small"
                              class="modifyClass"
                              @click="viewDetail(record,1)"
                            >详情</a-button>&nbsp;
                            <!-- <a-button size="small" class="modifyClass" @click="viewDetail(record,1)">处理</a-button>&nbsp; -->
                          </span>
                        </template>
                      </a-table>
                    </a-col>
                    <a-col :span="24" style="text-align:right;margin-top:10px;">
                      <a-pagination
                        showQuickJumper
                        :defaultCurrent="1"
                        :total="10"
                        :pageSizeOptions="pageSizeOptions"
                        showSizeChanger
                      />
                    </a-col>
                  </a-tab-pane>
                </a-tabs>
              </a-card>
            </a-col>
          </a-row>
        </a-col>
      </a-row>

      <!-- 事件批示详情 -->
      <a-modal title="事件批示详情" :visible="visible" width="45%" @cancel="handleCancel" footer>
        <a-form :form="form2">
          <a-row :gutter="8">
            <a-col :span="24">
              <h4>基本信息</h4>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :span="12">
              <a-form-item label="事件标题:" :label-col="{span:8}" :wrapper-col="{span:16}">
                <!-- <a-input v-decorator="['target',{ rules: [{ required: true,message:'名称不能为空' }] }]" disabled></a-input> -->
                <span>{{this.detail.event_name}}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="河流名称:" :label-col="{span:8}" :wrapper-col="{span:16}">
                <!-- <a-input v-decorator="['person']" disabled></a-input> -->
                <span>{{this.detail.river_name}}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="河段名称:" :label-col="{span:8}" :wrapper-col="{span:16}">
                <!-- <a-date-picker :defaultValue="moment(this.detail.start_time)" disabled /> -->
                <span>{{this.detail.reach_name}}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="事件状态:" :label-col="{span:8}" :wrapper-col="{span:16}">
                <!-- <a-date-picker :defaultValue="moment(this.detail.end_time)" disabled /> -->
                <span>{{this.detail.status}}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="上报时间:" :label-col="{span:8}" :wrapper-col="{span:16}">
                <!-- <a-input v-decorator="['start_site']" disabled></a-input> -->
                <span>{{this.detail.up_time}}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="历时:" :label-col="{span:8}" :wrapper-col="{span:16}">
                <!-- <a-input v-decorator="['end_site']" disabled></a-input> -->
                <span>{{this.detail.spend_time}}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="内容:" :label-col="{span:8}" :wrapper-col="{span:16}">
                <!-- <a-input v-decorator="['end_site']" disabled></a-input> -->
                <span>{{this.detail.event_name}}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12" v-if="this.detail.location_info">
              <a-form-item label="所属区域:" :label-col="{span:8}" :wrapper-col="{span:16}">
                <!-- <a-input v-decorator="['end_site']" disabled></a-input> -->
                <span>{{this.detail.location_info}}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="河长:" :label-col="{span:8}" :wrapper-col="{span:16}">
                <!-- <a-input v-decorator="['end_site']" disabled></a-input> -->
                <span>{{this.detail.leader}}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="事件来源:" :label-col="{span:8}" :wrapper-col="{span:16}">
                <!-- <a-input v-decorator="['end_site']" disabled></a-input> -->
                <span>{{this.detail.source}}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="事件分类:" :label-col="{span:8}" :wrapper-col="{span:16}">
                <!-- <a-input v-decorator="['end_site']" disabled></a-input> -->
                <span>{{this.detail.type}}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="受理意见:" :label-col="{span:8}" :wrapper-col="{span:16}">
                <!-- <a-input v-decorator="['end_site']" disabled></a-input> -->
                <span>{{this.detail.advice}}</span>
              </a-form-item>
            </a-col>
            <!-- </a-col> -->
            <!-- <a-col :span="24">
              <a-form-item label="移动轨迹:" :label-col="{span:4}" :wrapper-col="{span:20}">
                <img src="@/assets/travel/moveRoute.png" class="moveroute-img" />
              </a-form-item>
            </a-col>-->
          </a-row>
          <a-row>
            <a-col :span="24">
              <h4>处理信息</h4>
            </a-col>
          </a-row>
          <!-- <div v-for="item in detail.questions">
            {{item.id}}
          </div>-->
          <a-row>
            <a-table :dataSource="detail.handles" :pagination="false" :columns="columns1"></a-table>
          </a-row>
          <a-row v-if="handleStatus==1">
            <a-col :span="24">
              <a-form-item label="批示意见:" :label-col="{span:4}" :wrapper-col="{span:16}">
                <a-input v-decorator="['advice']"></a-input>
              </a-form-item>
            </a-col>
            <!-- <a-col :span="24">
              <a-form-item label="处理人:" :label-col="{span:4}" :wrapper-col="{span:16}">
                <a-select :defaultValue="provinceData[0]" style="width: 120px" @change="handleProvinceChange">
                  <a-select-option v-for="province in provinceData" :key="province">{{
                    province
                  }}</a-select-option>
                </a-select>
                <a-select v-model="secondCity" style="width: 120px">
                  <a-select-option v-for="city in cities" :key="city">{{ city }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>-->
          </a-row>
          <a-row>
            <a-col :span="24" style="text-align:right;margin-top:10px;">
              <a-button type="primary" @click="submitPopup">确定</a-button>
              <!-- <a-button style="margin-left:32px;">取消</a-button> -->
            </a-col>
          </a-row>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>
<script>
import { getEventInstruct } from '@/api/event'
const provinceData = ['自己', '协同','上报'];
const cityData = {
  "自己": [],
  "协同": ['王文', '李思', '郭德'],
  "上报": ['凯多', '香克斯', '玲玲','蒂奇'],
};
export default {
  data() {
    return {
      provinceData,
      cityData,
      cities: cityData[`${provinceData[0]}`],
      secondCity: cityData[`${provinceData[0]}`][0],
      handleWay: '待核实',
      detail: {
        start_time: '',
        end_time: '',
        start_site: '',
        end_site: '',
        handles: []
      },
      handleStatus: 0,
      tableHeight: window.innerHeight - 420,
      listHeight: window.innerHeight - 225,
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      // cardHeight: window.innerHeight > 657 ? window.innerHeight - 240 : 670,
      form: this.$form.createForm(this),
      form2: this.$form.createForm(this),
      form3: this.$form.createForm(this),
      dataLoad: true,
      visible: false,
      pageSize: 10,
      is_approve:"否",
      data: [
        // {
        //   index: '1',
        //   riverName: '南京玄武湖',
        //   riverPartName: '玄武湖西支流',
        //   question: '河水水质',
        //   uploadTime: '2019-02-01 12:23:32',
        //   status:'已处理',
        //   time: '2019-02-01 12:23:32',
        //   questionFrom: '化工厂污染'
        // }
      ],
      columns1: [
        {
          align: 'center',
          title: '处理人',
          dataIndex: 'conductor',
          width: 120
        },
        {
          align: 'center',
          title: '处理意见',
          dataIndex: 'advice',
          width: 120
        },
        {
          align: 'center',
          title: '时间',
          dataIndex: 'create_at',
          width: 80
        }
      ],
      columns: [
        // {
        //   align: 'center',
        //   title: '序号',
        //   dataIndex: 'id',
        //   width: 80
        // },
        {
          align: 'center',
          title: '事件标题',
          dataIndex: 'event_name',
          width: 240
        },
        {
          align: 'center',
          title: '河流名称',
          dataIndex: 'river_name',
          width: 110
        },
        {
          align: 'center',
          title: '事件来源',
          dataIndex: 'source',
          width: 100
        },
        {
          align: 'center',
          title: '事件状态',
          dataIndex: 'status',
          width: 100,
          scopedSlots: { customRender: 'status' }
        },
        {
          align: 'center',
          title: '上报时间',
          dataIndex: 'up_time',
          width: 160
        },
        {
          align: 'center',
          title: '河长',
          dataIndex: 'leader',
          width: 100
        },

        {
          align: 'center',
          title: '事件分类',
          dataIndex: 'type',
          width:120
        },
        {
          align: 'center',
          title: '操作',
          dataIndex: 'action',
          width: 160,
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  created() {
    this.searchData({
      page: 1,
      page_size: this.pageSize,
      model: '事件批示',
      is_approve:this.is_approve
    })
  },
  mounted() {
    // this.$store.commit('changeBreaderList', ['岸线开发', '规划信息'])
  },
  methods: {
    callback(value){
      // console.log("====callbackvalue====")
      // console.log(value)
      var reqData = {
        page: 1,
        page_size: this.pageSize,
        model: '事件批示',
        event_name: this.form.getFieldValue('event_name'),
        type: this.form.getFieldValue('type'),
        is_approve:this.is_approve=value==2?"是":"否"
      }
      //chaxun
      this.searchData(reqData)
    },
    handleProvinceChange(value) {
      this.cities = cityData[value]
      this.secondCity = cityData[value][0]
    },
    // 查询按钮触发
    searchClick() {
      this.dataLoad = true
      // console.log(`name=${this.form.getFieldValue('name')}`);
      // console.log(`person=${this.form.getFieldValue('person')}`);
      var reqData = {
        page: 1,
        page_size: this.pageSize,
        model: '事件批示',
        event_name: this.form.getFieldValue('event_name'),
        type: this.form.getFieldValue('type'),
        is_approve:this.is_approve
      }
      //chaxun
      this.searchData(reqData)
    },
    // 重置按钮触发
    resertClick() {
      this.form.setFields({ event_name: '' })
      this.form.setFields({ type: '' })
    },
    onChange(date, dateString) {
      console.log(date, dateString)
    },
    //查询调用该方法
    searchData(reqData) {
      this.dataLoad = true
      getEventInstruct(reqData)
        .then(res => {
          console.log('===getEventInstruct success ====')
          this.dataLoad = false
          this.data = res.data.list
          // this.$notification['success']({
          //   message: '提示',
          //   description: '获取任务列表成功',
          //   duration: 8
          // })
        })
        .catch(err => {
          console.log('===getEventInstruct err ====')
          this.dataLoad = false
        })
    },
    // 表格新增
    viewDetail(record, handleStatus) {
      this.handleStatus = handleStatus
      this.visible = true
      console.log('record====')
      console.log(record)
      this.detail = {
        event_name: record.event_name,
        river_name: record.river_name,
        reach_name: record.reach_name,
        status: record.status,
        up_time: record.up_time,
        spend_time: record.spend_time,
        event_name: record.event_name,
        city_id: record.city_id,
        leader: record.leader,
        source: record.source,
        type: record.type,
        advice: record.advice,
        handles: record.handle_info
      }
    },
    // 弹框确定按钮
    submitPopup() {
      this.form2.validateFields(err => {
        if (!err) {
          this.visible = false
          // this.form2.setFields({ area2: "" });
          // this.form2.setFields({ shoreline_type2: "" });
          // this.form2.setFields({ shoreline2: "" });
          // this.form2.setFields({ ghxxfl: "" });
          // this.form2.setFields({ axghq: "" });
          // this.form2.setFields({ axghq2: "" });
          var name = this.form2.getFieldValue('name')
          var code = this.form2.getFieldValue('code')
          var shangjiname = this.form2.getFieldValue('shangjiname')
          // var project_type = this.form2.getFieldValue("gclx");
          // var occupy_length = this.form2.getFieldValue("area2");
          // console.log()
          // var lon = this.form2.getFieldValue("area2");
          console.log(name)
          console.log(code)
          console.log(shangjiname)

          const addParams = {
            // key: this.data.length + 1,
            name
          }
          this.data.push(addParams)
          // this.$message.success('新增成功！')
          this.form2.resetFields()
        }
        console.log(err)
      })
    },
    uploadVerify() {
      this.form2.validateFields(err => {
        if (!err) {
          this.visible = false
          // this.form2.setFields({ area2: "" });
          // this.form2.setFields({ shoreline_type2: "" });
          // this.form2.setFields({ shoreline2: "" });
          // this.form2.setFields({ ghxxfl: "" });
          // this.form2.setFields({ axghq: "" });
          // this.form2.setFields({ axghq2: "" });
          var name = this.form2.getFieldValue('name')
          var code = this.form2.getFieldValue('code')
          var shangjiname = this.form2.getFieldValue('shangjiname')
          // var project_type = this.form2.getFieldValue("gclx");
          // var occupy_length = this.form2.getFieldValue("area2");
          // console.log()
          // var lon = this.form2.getFieldValue("area2");
          console.log(name)
          console.log(code)
          console.log(shangjiname)

          const addParams = {
            // key: this.data.length + 1,
            name
          }
          this.data.push(addParams)
          // this.$message.success('新增成功！')
          this.form2.resetFields()
        }
        console.log(err)
      })
    },

    handleCancel() {
      this.form2.resetFields()
      this.visible = false
      // this.form2.setFields({ ghxxfl: "" });
      // this.form2.setFields({ area2: "" });
      // this.form2.setFields({ shoreline_type2: "" });
      // this.form2.setFields({ shoreline2: "" });
      // this.form2.setFields({ axghq: "" });
      // this.form2.setFields({ axghq2: "" });
    }
  }
}
</script>
<style lang="less" scoped>
/* .duty-statis {
  .duty-statis-cont {
    .cont-pad();
  }
} */
.duty-statis-cont {
  /* margin: 24px; */
  /* margin-top: -8px; */
}
.resertBtn {
  margin-left: 8px;
}
.detailClass {
  color: #409eff;
  background-color: #f5f5f5;
}
.detailClass:hover {
  background-color: #409eff;
  color: white;
}
.modifyClass {
  color: #67c23a;
  background-color: #f5f5f5;
}
.modifyClass:hover {
  background-color: #67c23a;
  color: white;
}
.delClass {
  color: #ff4d4f;
  background-color: #f5f5f5;
}
.delClass:hover {
  background-color: #ff4d4f;
  color: white;
}
.process-img {
  display: block;
  width: 100%;
}

.lixiangID {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 3px;
  background-color: #10f0f0;
}
.banliID {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 3px;
  background-color: #3aa0ff;
}
.hechaID {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 3px;
  background-color: #ffba3a;
}
.guidangID {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 3px;
  background-color: #67c23a;
}
.guidangID1 {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 3px;
  background-color: #0eff52;
}
</style>
