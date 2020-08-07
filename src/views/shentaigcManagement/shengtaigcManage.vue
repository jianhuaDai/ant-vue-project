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
                <a-form-model-item label="生态工程名称:" prop="namesearch">
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
          <!-- <a-button
            slot="extra"
            type="primary"
            style="margin-left:8px;">导入</a-button> -->
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
    <!-- 新增生态工程 -->
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
                label="生态工程名称"
                prop="name"
                ref="name">
                <a-input v-model="form2.name"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="生态工程编码"
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
                label="项目名称"
                prop="xmmb"
                ref="xmmb">
                <a-input v-model="form2.xmmb"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="经纬度"
                prop="jwd"
                ref="jwd">
                <mapInput
                  v-model="form2.jwd"
                  v-if="visible"></mapInput>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="工程地址"
                prop="address"
                ref="address">
                <a-input v-model="form2.address"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="所属河湖"
                prop="sshh"
                ref="sshh">
                <a-input v-model="form2.sshh"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="范围面积"
                prop="fwmj"
                ref="fwmj">
                <a-input v-model="form2.fwmj"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="河湖长"
                prop="hhz"
                ref="hhz">
                <a-input v-model="form2.hhz"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="进度"
                prop="jindu"
                ref="jindu">
                <a-input v-model="form2.jindu"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="职务"
                prop="zhiwu"
                ref="zhiwu">
                <a-input v-model="form2.zhiwu"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="水质"
                prop="shuizhi"
                ref="shuizhi">
                <a-select v-model="form2.shuizhi">
                  <a-select-option value="1">I类</a-select-option>
                  <a-select-option value="2">II类</a-select-option>
                  <a-select-option value="3">III类</a-select-option>
                  <a-select-option value="4">IV类</a-select-option>
                  <a-select-option value="5">V类</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="目标"
                prop="mubiao"
                ref="mubiao">
                <a-input v-model="form2.mubiao"></a-input>
              </a-form-model-item>
            </a-col>
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
    <!-- 生态工程删除 -->
    <a-modal
      title="生态工程删除"
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
import { getShengTaiList, addShengTaiList, updateShengTai, delShentTaiList } from '@/api/shengtaigc'
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
      title: '新增生态工程',
      visible: false,
      visibledel: false,
      allowClear: false,
      danwei1: false,
      danwei2: false,
      danwei3: false,
      namevalue: [],
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      confirmLoading: false,
      options: treeData,
      cardHeight: window.innerHeight - 207,
      form: {
        namesearch: ''
      },
      rowData: {},
      addmodifyflag: '1',
      time: '',
      form2: {
        name: '',
        ggfmxh: '',
        ggfmcz: '',
        ggfmyl: '',
        ggfmsl: '',
        fggfmxh: '',
        fggfmsl: '',
        zgfmcz: '',
        zgfmyl: ''
      },
      rules: {
        name: [
          { required: true, message: '工程名称不能为空', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '所属区域不能为空' }
        ],
        jwd: [
          { required: true, message: '经纬度不能为空', trigger: 'blur' }
        ]
      },
      columns: [
        {
          title: '工程名称',
          dataIndex: 'name'
        },
        {
          title: '工程地址',
          dataIndex: 'value_type'
        },
        {
          title: '河湖长',
          dataIndex: 'branch_value_num'
        },
        {
          title: '职务',
          dataIndex: 'branch_type'
        },
        {
          title: '经纬度',
          dataIndex: 'branch_num'
        },
        {
          title: '范围面积',
          dataIndex: 'branch_value_num'
        },
        {
          title: '水质',
          dataIndex: 'lon_lat'
        },
        {
          title: '进度',
          dataIndex: 'sluice_gate_station_type_name'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '160px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      queryParam: {
        name: ''
      },
      loadData: parameter => {
        // alert('123')
        return getShengTaiList(Object.assign(parameter, this.queryParam)).then(res => {
          console.log(res)
          return res.data
        })
      }
    }
  },
  created () {
    // getProjectList().then(res => {
    //   console.log(res)
    //   for (var i = 0; i < res.data.list.length; i++) {
    //     this.namevalue.push(
    //       {
    //         key: res.data.list[i].water_id,
    //         name: res.data.list[i].name
    //       }
    //     )
    //   }
    // })
  },
  methods: {
    moment,
    // 查询按钮触发
    searchClick () {
      this.queryParam.name = this.form.namesearch
      // this.queryParam.sluice_gate_station_type = this.form.type === '' ? 0 : parseInt(this.form.type)
      this.$refs.table.refresh(true)
    },
    // 重置按钮触发
    resertClick () {
      this.form.namesearch = ''
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
        this.title = '修改生态工程信息'
        this.setFormValue(this.form2)
      } else {
        this.addmodifyflag = '1'
        this.title = '新增生态工程信息'
      }
    },
    setFormValue (data) {
      console.log(data)
      this.$set(this.form2, 'name', data.name)
      this.$set(this.form2, 'ggfmxh', data.location)
      this.$set(this.form2, 'ggfmcz', data.flow)
      this.$set(this.form2, 'ggfmyl', data.sluice_gate_station_type)
      this.$set(this.form2, 'ggfmsl', data.regionalism_id)
      this.$set(this.form2, 'fggfmxh')
      this.$set(this.form2, 'fggfmsl')
      this.$set(this.form2, 'zgfmcz')
      this.$set(this.form2, 'zgfmyl')
      this.$set(this.form2, 'zgfmsl')
      this.$set(this.form2, 'dgbh')
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
            project_id: this.form2.name,
            value_type: this.form2.ggfmxh,
            value_material: this.form2.ggfmcz,
            value_pressure: parseInt(this.form2.ggfmyl),
            value_num: parseInt(this.form2.ggfmsl),
            branch_type: parseInt(this.form2.fggfmxh),
            branch_num: parseInt(this.form2.fggfmsl),
            branch_value_material: this.form2.zgfmcz,
            branch_value_pressure: this.form2.zgfmyl,
            branch_value_num: parseInt(this.form2.zgfmsl),
            drip_irrigation_id: this.form2.dgbh
          }
          console.log(reqData)
          if (this.addmodifyflag === '1') {
            addShengTaiList(reqData).then(res => {
              this.searchClick()
              this.visible = false
              this.$refs.form2.clearValidate()
              this.$message.success('新增生态工程成功!')
            })
          } else if (this.addmodifyflag === '2') {
            reqData.id = this.rowData.id
            reqData.version = this.rowData.version
            console.log(reqData)
            updateShengTai(this.rowData.id, reqData).then(res => {
              this.searchClick()
              this.visible = false
              this.$refs.form2.clearValidate()
              this.$message.success('修改生态工程成功!')
            })
          }
        }
      })
    },
    // 确认删除按钮
    handleOkDel () {
      delShentTaiList(this.rowData).then((res) => {
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
      this.rowData = value.id
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
