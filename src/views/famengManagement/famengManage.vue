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
              <!-- <a-col :span="8">
                <a-form-model-item label="闸站类型:" prop="type">
                  <dictionary-select
                    v-model="form.type"
                    :insert-option-all="false"
                    :dictionary-type="DictionaryEnum.DIC_SLUICE_GATE_STATION_TYPE"
                  >
                  </dictionary-select>
                </a-form-model-item>
              </a-col> -->
              <a-col :span="8">
                <a-form-model-item label="滴罐编号:" prop="namesearch">
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
    <!-- 新增阀门 -->
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
                label="工程名称"
                prop="name"
                ref="name">
                <a-select
                  placeholder="全部"
                  v-model="form2.name">
                  <a-select-option
                    v-for="item in namevalue"
                    :key="item.key"
                    :value="item.key">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
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
                label="干管阀门型号"
                prop="ggfmxh"
                ref="ggfmxh">
                <a-input v-model="form2.ggfmxh">
                  <template slot="addonAfter" >mm</template>
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="干管阀门材质"
                prop="ggfmcz"
                ref="ggfmcz">
                <a-input v-model="form2.ggfmcz"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="干管阀门压力"
                prop="ggfmyl"
                ref="ggfmyl">
                <a-input v-model="form2.ggfmyl">
                  <template slot="addonAfter" >Mpa</template>
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="干管阀门数量"
                prop="ggfmsl"
                ref="ggfmsl">
                <a-input v-model="form2.ggfmsl"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="分干管阀门型号"
                prop="fggfmxh"
                ref="fggfmxh">
                <a-input v-model="form2.fggfmxh">
                  <template slot="addonAfter" >mm</template>
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="分干管阀门数量"
                prop="fggfmsl"
                ref="fggfmsl">
                <a-input v-model="form2.fggfmsl"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="支管阀门材质"
                prop="zgfmcz"
                ref="zgfmcz">
                <a-input v-model="form2.zgfmcz"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="支管阀门压力"
                prop="zgfmyl"
                ref="zgfmyl">
                <a-input v-model="form2.zgfmyl">
                  <template slot="addonAfter" >Mpa</template>
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="支管阀门数量"
                prop="zgfmsl"
                ref="zgfmsl">
                <a-input v-model="form2.zgfmsl"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="滴灌编号"
                prop="dgbh"
                ref="dgbh">
                <a-input v-model="form2.dgbh"></a-input>
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
    <!-- 闸站删除 -->
    <a-modal
      title="阀门删除"
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
import { getFaMenList, addFaMenList, updateFaMen, delFaMenList, getProjectList } from '@/api/fameng'
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
      title: '新增阀门',
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
        area: '', // 所属区域
        ggfmxh: '', // 干管阀门型号
        ggfmcz: '', // 干管阀门材质
        ggfmyl: '', // 干管阀门压力
        ggfmsl: '', // 干管阀门数量
        fggfmxh: '', // 分干管阀门型号
        fggfmsl: '', // 分干管阀门数量
        zgfmcz: '', // 支管阀门材质
        zgfmyl: '', // 支管阀门压力
        zgfmsl: '', // 支管阀门数量
        dgbh: '' // 滴灌编号
      },
      rules: {
        name: [
          { required: true, message: '工程名称不能为空', trigger: 'blur' }
        ]
      },
      columns: [
        {
          title: '滴罐编号',
          dataIndex: 'drip_irrigation_id'
        },
        {
          title: '干管阀门型号',
          dataIndex: 'value_type'
        },
        {
          title: '干管阀门数量',
          dataIndex: 'branch_value_num'
        },
        {
          title: '分干管阀门型号',
          dataIndex: 'branch_type'
        },
        {
          title: '分干管阀门数量',
          dataIndex: 'branch_num'
        },
        {
          title: '支管阀门数量',
          dataIndex: 'branch_value_num'
        },
        // {
        //   title: '经纬度',
        //   dataIndex: 'lon_lat',
        //   scopedSlots: { customRender: 'lon_lat' }
        // },
        // {
        //   title: '闸站类型',
        //   dataIndex: 'sluice_gate_station_type_name'
        // },
        // {
        //   title: '所属区域',
        //   dataIndex: 'regionalism_name'
        // },
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
        return getFaMenList(Object.assign(parameter, this.queryParam)).then(res => {
          console.log(res)
          return res.data
        })
      }
    }
  },
  created () {
    // 获取工程下拉框数据
    getProjectList().then(res => {
      console.log(res)
      for (var i = 0; i < res.data.length; i++) {
        this.namevalue.push(
          {
            key: res.data[i].ecol_id,
            name: res.data[i].ecol_name
          }
        )
      }
    })
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
        this.title = '修改阀门信息'
        this.setFormValue(this.form2)
      } else {
        this.addmodifyflag = '1'
        this.title = '新增阀门信息'
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
        // name: '',
        // ggfmxh: '', // 干管阀门型号
        // ggfmcz: '', // 干管阀门材质
        // ggfmyl: '', // 干管阀门压力
        // ggfmsl: '', // 干管阀门数量
        // fggfmxh: '', // 分干管阀门型号
        // fggfmsl: '', // 分干管阀门数量
        // zgfmcz: '', // 支管阀门材质
        // zgfmyl: '', // 支管阀门压力
        // zgfmsl: '', // 支管阀门数量
        // dgbh: '' // 滴灌编号
    savePopup () {
      this.$refs.form2.validate(err => {
        if (err) {
          var reqData = {
            project_id: this.form2.name, // 工程名称
            value_type: this.form2.ggfmxh, // 干管阀门型号
            value_material: this.form2.ggfmcz, // 干管阀门材质
            value_pressure: this.form2.ggfmyl, // 干管阀门压力
            value_num: parseInt(this.form2.ggfmsl), // 干管阀门数量
            branch_type: this.form2.fggfmxh, // 分干管阀门型号
            branch_num: parseInt(this.form2.fggfmsl), // 分干管阀门数量
            branch_value_material: this.form2.zgfmcz, // 支管阀门材质
            branch_value_pressure: this.form2.zgfmyl, // 支管阀门压力
            branch_value_num: parseInt(this.form2.zgfmsl), // 支管阀门数量
            drip_irrigation_id: this.form2.dgbh // 滴灌编号
          }
          console.log(reqData)
          if (this.addmodifyflag === '1') {
            addFaMenList(reqData).then(res => {
              this.searchClick()
              this.visible = false
              this.$refs.form2.clearValidate()
              this.$message.success('新增阀门成功!')
            })
          } else if (this.addmodifyflag === '2') {
            // reqData.id = this.rowData.id
            // reqData.version = this.rowData.version
            // console.log(reqData)
            // updateFaMen(this.rowData.id, reqData).then(res => {
            //   this.searchClick()
            //   this.visible = false
            //   this.$refs.form2.clearValidate()
            //   this.$message.success('修改阀门成功!')
            // })
          }
        }
      })
    },
    // 确认删除按钮
    handleOkDel () {
      delFaMenList(this.rowData).then((res) => {
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
