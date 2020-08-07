<template>
  <div>
    <a-row :gutter="8">
      <a-col :span="24">
        <a-card
          :bordered="false"
          :bodyStyle="{padding:'6px 24px 0px 24px'}">
          <a-form-model
            :form="form"
            :style="{'margin-top':'16px'}"
            labelAlign="left"
            :label-col="labelCol"
            :wrapper-col="wrapperCol">
            <a-row>
              <a-col :span="8">
                <a-form-model-item label="泵站类型:" prop="type">
                  <!-- <a-input v-model="form.namesearch"></a-input> -->
                  <!-- <a-select v-model="form.type">
                    <a-select-option value="1">雨水泵站</a-select-option>
                    <a-select-option value="2">排涝泵站</a-select-option>
                    <a-select-option value="3">污水泵站</a-select-option>
                  </a-select> -->
                  <dictionary-select
                    v-model="form.type"
                    :insert-option-all="false"
                    :dictionary-type="DictionaryEnum.DIC_PUMPSTATION_TYPE"
                  >
                  </dictionary-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="8">
                <a-form-model-item label="泵站名称:" prop="namesearch">
                  <a-input v-model="form.namesearch"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col
                :span="5"
                :offset="3"
                style="text-align:right;">
                <a-form-model-item
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
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-form-model>
        </a-card>
      </a-col>
      <a-col
        :span="24"
        style="margin-top:8px;">
        <a-card
          title="查询列表"
          :style="{height: cardHeight + 'px'}"
          :bodyStyle="{padding:'10px 10px 10px 10px'}">
          <a-button
            slot="extra"
            type="primary"
            icon="plus"
            @click="gcAddClick">新增</a-button>
          <a-button
            slot="extra"
            type="primary"
            style="margin-left:8px;">导入</a-button>
          <a-row :gutter="8">
            <a-col :span="24">
              <s-table
                ref="table"
                size="default"
                :rowKey="record => record.id"
                :columns="columns"
                :data="loadData"
                :showPagination="true">
                <span slot="lon_lat" slot-scope="text">
                  {{ text.length > 0 ? text[0] + ',' + text[1] : '' }}
                </span>
                <span
                  slot="action"
                  slot-scope="text, record, index">
                  <template>
                    <a @click="gcAddClick(record)">编辑</a>
                    <a
                      @click="handleDel(record)"
                      style="margin-left: 10px;color: red">删除</a>
                  </template>
                </span>
              </s-table>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <!-- 新增泵站 -->
    <a-modal
      :title="title"
      width="60%"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel">
      <a-spin :spinning="confirmLoading">
        <a-form-model
          ref="form2"
          :model="form2"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol">
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-model-item
                label="泵站名称"
                prop="name"
                ref="name">
                <a-input v-model="form2.name"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="泵站编码"
                prop="code"
                ref="code">
                <a-input v-model="form2.code"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="所属区域"
                prop="area"
                ref="area">
                <a-tree-select v-model="form2.area" :treeData="options"> </a-tree-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="泵站类型"
                prop="bztype"
                ref="bztype">
                <dictionary-select
                  v-model="form2.bztype"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.DIC_PUMPSTATION_TYPE"
                >
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="经纬度"
                prop="jwd"
                ref="jwd">
                <!-- <a-input v-model="form2.jwd" @change="inputChange">
                  <a-icon @click="showMap" slot="addonAfter" type="environment" :style="{ color: '#0D7DD9' }" />
                </a-input> -->
                <mapInput
                  v-model="form2.jwd"
                  v-if="visible"></mapInput>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="设计流量"
                prop="sjll"
                ref="sjll">
                <a-input v-model="form2.sjll"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="建造时间"
                prop="time"
                ref="time">
                <a-date-picker
                  style="width:100%;"
                  type="date"
                  @change="dateChange"
                  :allowClear="allowClear"
                  show-time
                  :default-value="moment(getCurrentData(),'YYYY-MM-DD HH:mm:ss')"

                  placeholder="请选择时间"></a-date-picker>
              </a-form-model-item>
            </a-col>
            <!-- <a-col :span="12">
              <a-form-model-item label="图片" prop="image_url" ref="image_url">
                <uploadSingleImg v-model="form2.image_url"></uploadSingleImg>
              </a-form-model-item>
            </a-col> -->
          </a-row>
        </a-form-model>
      </a-spin>
      <template slot="footer">
        <a-button
          @click="
            () => {
              this.visible = false
            }
          ">取消</a-button>
        <a-button
          type="primary"
          @click="savePopup">保存</a-button>
      </template>
    </a-modal>
    <!-- 泵站删除 -->
    <a-modal
      title="泵站删除"
      :visible="visibledel"
      @ok="handleOkDel"
      @cancel="handleCancelDel">
      <p>确定删除该条记录?</p>
    </a-modal>
  </div>
</template>
<script>
import { STable } from '@/components'
import { MAPBOX_TOKEN, Style } from '@/components/Hczy/Map/config'
import { getPumpList, addPumpList, updatePump, delPumpList } from '@/api/pumpStation'
import { treeData } from '@/config/areaTreeSelectData'
import moment from 'moment'
import mapboxgl from 'mapbox-gl'
import mapInput from '@/components/Hczy/mapInput.vue'
export default {
  components: {
    STable,
    mapInput
  },
  data () {
    return {
      title: '新增泵站',
      visible: false,
      visibledel: false,
      allowClear: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      confirmLoading: false,
      options: treeData,
      cardHeight: window.innerHeight - 207,
      form: {
        type: undefined,
        namesearch: ''
      },
      rowData: {},
      addmodifyflag: '1',
      time: '',
      form2: {
        name: '',
        code: '',
        area: '',
        bztype: '',
        jwd: '',
        sjll: '',
        time: ''
      },
      rules: {
        name: [
          { required: true, message: '泵站名称不能为空', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '所属区域不能为空' }
        ],
        jwd: [
          { required: true, message: '经纬度不能为空', trigger: 'blur' }
        ],
        sjll: [
          { required: true, message: '设计流量不能为空', trigger: 'blur' }
        ]
      },
      columns: [
        {
          title: '泵站名称',
          dataIndex: 'name'
        },
        {
          title: '泵站编码',
          dataIndex: 'pump_station_num'
        },
        // {
        //   title: '所属水体',
        //   dataIndex: ''
        // },
        {
          title: '经纬度',
          dataIndex: 'lon_lat',
          scopedSlots: { customRender: 'lon_lat' }
        },
        {
          title: '设计流量(m³/S)',
          dataIndex: 'plan_flow'
        },
        {
          title: '泵站类型',
          dataIndex: 'pump_station_type_name'
        },
        {
          title: '所属区域',
          dataIndex: 'regionalism_name'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '160px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      queryParam: {
        name: '',
        pump_station_type: 0
      },
      loadData: parameter => {
        // alert('123')
        return getPumpList(Object.assign(parameter, this.queryParam)).then(res => {
          console.log(res)
          return res.data
        })
      }
    }
  },
  created () {

  },
  methods: {
    moment,
    // 查询按钮触发
    searchClick () {
      this.queryParam.name = this.form.namesearch
      this.queryParam.pump_station_type = this.form.type === '' ? 0 : parseInt(this.form.type)
      this.$refs.table.refresh(true)
    },
    // 重置按钮触发
    resertClick () {
      this.form.namesearch = ''
      this.form.type = 0
    },
    dateChange (date, dateString) {
      this.time = dateString
      console.log(this.time)
    },
    // 新增按钮触发
    gcAddClick (data = {}) {
      this.visible = true
      this.form2 = { ...{}, ...data }
      this.rowData = this.form2
      if (this.form2.pump_station_id) {
        this.addmodifyflag = '2'
        this.title = '修改泵站信息'
        this.setFormValue(this.form2)
      } else {
        this.addmodifyflag = '1'
        this.title = '新增泵站信息'
      }
    },
    setFormValue (data) {
      console.log(data)
      //   name: '',
      //   code: '',
      //   area: '',
      //   bztype: '',
      //   jwd: '',
      //   sjll: '',
      //   time: ''

      // bztype: null
      // complete_time: ""
      // create_at: "2020-08-05 17:21:24"
      // delete_at: ""
      // jwd: Array(0)
      // lon_lat: Array(2)
      // name: "aaa"
      // plan_flow: 333
      // pump_station_id: "146649653360721921"
      // pump_station_num: "bbb"
      // pump_station_type: 2
      // pump_station_type_name: "排涝泵站"
      // regionalism_id: "3201"
      // regionalism_name: "江苏省-南京市"
      // status: 1
      // update_at: "2020-08-05 17:21:24"
      // version: 1
      this.$set(this.form2, 'name', data.name)
      this.$set(this.form2, 'code', data.pump_station_num)
      this.$set(this.form2, 'area', data.regionalism_id)
      this.$set(this.form2, 'bztype', data.pump_station_type)
      this.$set(this.form2, 'jwd', [parseFloat(data.lon_lat[0]), parseFloat(data.lon_lat[1])])
      this.$set(this.form2, 'sjll', data.plan_flow)
      console.log(typeof (data.complete_time))
      this.$set(this.form2, 'time', data.complete_time)
    },
    getCurrentData () {
      return new Date().toLocaleDateString()
    },
    test (time) {
      return time.toLocaleDateString()
    },
    savePopup () {
      this.$refs.form2.validate(err => {
        if (err) {
          var reqData = {
            name: this.form2.name,
            pump_station_num: this.form2.code,
            regionalism_id: this.form2.area,
            pump_station_type: this.form2.bztype,
            lon_lat: this.form2.jwd,
            plan_flow: parseInt(this.form2.sjll),
            complete_time: this.time
          }
          console.log(reqData)
          if (this.addmodifyflag === '1') {
            addPumpList(reqData).then(res => {
              this.searchClick()
              this.visible = false
              this.$refs.form2.clearValidate()
              this.$message.success('新增泵站成功!')
            })
          } else if (this.addmodifyflag === '2') {
            reqData.pump_station_id = this.rowData.pump_station_id
            reqData.version = this.rowData.version
            console.log(reqData)
            updatePump(this.rowData.pump_station_id, reqData).then(res => {
              this.searchClick()
              this.visible = false
              this.$refs.form2.clearValidate()
              this.$message.success('修改泵站成功!')
            })
          }
        }
      })
    },
    // 确认删除按钮
    handleOkDel () {
      delPumpList(this.rowData).then((res) => {
        console.log(res)
        this.$message.success('删除成功！')
        this.$refs.table.refresh(true)
        this.visibledel = false
      })
    },
    // 取消删除
    handleCancelDel () {
      this.visibledel = false
    },
    // 删除按钮触发
    handleDel (value) {
      console.log(value)
      this.rowData = value.pump_station_id
      this.visibledel = true
    },
    handleOk () {

    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
<style scoped>

</style>
