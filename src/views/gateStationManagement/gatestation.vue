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
                <a-form-model-item label="闸站类型:" prop="type">
                  <dictionary-select
                    v-model="form.type"
                    :insert-option-all="false"
                    :dictionary-type="DictionaryEnum.DIC_SLUICE_GATE_STATION_TYPE"
                  >
                  </dictionary-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="8">
                <a-form-model-item label="闸站名称:" prop="namesearch">
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
    <!-- 新增闸站 -->
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
                label="闸站名称"
                prop="name"
                ref="name">
                <a-input v-model="form2.name"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="位置"
                prop="weizhi"
                ref="weizhi">
                <a-input v-model="form2.weizhi"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="过闸流量"
                prop="gzll"
                ref="gzll">
                <a-input v-model="form2.gzll">
                  <template slot="addonAfter" >
                    <span v-show="danwei1">1000m³/S</span>
                    <span v-show="danwei2">100~1000m³/S</span>
                    <span v-show="danwei3">小于100m³/S</span>
                  </template>
                  <!-- <template slot="addonAfter" v-show="danwei2">
                    100~1000m³/S
                  </template>
                  <template slot="addonAfter" v-show="danwei3">
                    小于100m³/S
                  </template> -->
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="闸站类型"
                prop="zztype"
                ref="zztype">
                <dictionary-select
                  v-model="form2.zztype"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.DIC_SLUICE_GATE_STATION_TYPE"
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
                label="所属区域"
                prop="area"
                ref="area">
                <a-tree-select v-model="form2.area" :treeData="options"> </a-tree-select>
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
    <!-- 闸站删除 -->
    <a-modal
      title="闸站删除"
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
import { getGateStationList, addGateStationList, updateGateStation, delGateStationList } from '@/api/gatestation'
import { treeData } from '@/config/areaTreeSelectData'
import moment from 'moment'
import mapboxgl from 'mapbox-gl'
import mapInput from '@/components/Hczy/mapInput.vue'
export default {
  components: {
    STable,
    mapInput
  },
  watch: {
    'form2.zztype' (value, oldvalue) {
      console.log(value)
      if (value === 1) {
        this.danwei1 = true
        this.danwei2 = false
        this.danwei3 = false
      }
      if (value === 2) {
        this.danwei1 = false
        this.danwei2 = true
        this.danwei3 = false
      }
      if (value === 3) {
        this.danwei1 = false
        this.danwei2 = false
        this.danwei3 = true
      }
    }
  },
  data () {
    return {
      title: '新增闸站',
      visible: false,
      visibledel: false,
      allowClear: false,
      danwei1: false,
      danwei2: false,
      danwei3: false,
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
        weizhi: '',
        gzll: '',
        zztype: '',
        jwd: '',
        area: ''
      },
      rules: {
        name: [
          { required: true, message: '闸站名称不能为空', trigger: 'blur' }
        ],
        zztype: [
          { required: true, message: '闸站类型不能为空', trigger: 'blur' }
        ],
        jwd: [
          { required: true, message: '经纬度不能为空', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '所属区域不能为空' }
        ]
      },
      columns: [
        {
          title: '闸站名称',
          dataIndex: 'name'
        },
        {
          title: '位置',
          dataIndex: 'location'
        },
        {
          title: '过闸流量',
          dataIndex: 'flow'
        },
        {
          title: '经纬度',
          dataIndex: 'lon_lat',
          scopedSlots: { customRender: 'lon_lat' }
        },
        {
          title: '闸站类型',
          dataIndex: 'sluice_gate_station_type_name'
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
        sluice_gate_station_type: 0
      },
      loadData: parameter => {
        // alert('123')
        return getGateStationList(Object.assign(parameter, this.queryParam)).then(res => {
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
      this.queryParam.sluice_gate_station_type = this.form.type === '' ? 0 : parseInt(this.form.type)
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
      if (this.form2.sluice_gate_station_id) {
        this.addmodifyflag = '2'
        this.title = '修改闸站信息'
        this.setFormValue(this.form2)
      } else {
        this.addmodifyflag = '1'
        this.title = '新增闸站信息'
      }
    },
    setFormValue (data) {
      console.log(data)
      this.$set(this.form2, 'name', data.name)
      this.$set(this.form2, 'weizhi', data.location)
      this.$set(this.form2, 'gzll', data.flow)
      this.$set(this.form2, 'zztype', data.sluice_gate_station_type)
      this.$set(this.form2, 'jwd', [parseFloat(data.lon_lat[0]), parseFloat(data.lon_lat[1])])
      this.$set(this.form2, 'area', data.regionalism_id)
    },
    getCurrentData () {
      return new Date().toLocaleDateString()
    },
    test (time) {
      return time.toLocaleDateString()
    },
        // name: '',
        // weizhi: '',
        // gzll: '',
        // zztype: '',
        // jwd: '',
        // area: ''
    savePopup () {
      this.$refs.form2.validate(err => {
        if (err) {
          var reqData = {
            name: this.form2.name,
            location: this.form2.weizhi,
            flow: parseInt(this.form2.gzll),
            sluice_gate_station_type: this.form2.zztype,
            lon_lat: this.form2.jwd,
            regionalism_id: this.form2.area
          }
          console.log(reqData)
          if (this.addmodifyflag === '1') {
            addGateStationList(reqData).then(res => {
              this.searchClick()
              this.visible = false
              this.$refs.form2.clearValidate()
              this.$message.success('新增闸站成功!')
            })
          } else if (this.addmodifyflag === '2') {
            reqData.sluice_gate_station_id = this.rowData.sluice_gate_station_id
            reqData.version = this.rowData.version
            console.log(reqData)
            updateGateStation(this.rowData.sluice_gate_station_id, reqData).then(res => {
              this.searchClick()
              this.visible = false
              this.$refs.form2.clearValidate()
              this.$message.success('修改闸站成功!')
            })
          }
        }
      })
    },
    // 确认删除按钮
    handleOkDel () {
      delGateStationList(this.rowData).then((res) => {
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
      this.rowData = value.sluice_gate_station_id
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
