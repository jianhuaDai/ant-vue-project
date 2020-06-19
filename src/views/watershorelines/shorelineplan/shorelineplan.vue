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
              <a-col :span="5">
                <a-form-model-item label="行业分类:" prop="hyfl">
                  <dictionary-select
                    v-model="form.hyfl"
                    :insert-option-all="false"
                    :select-first="false"
                    :dictionary-type="DictionaryEnum.DIC_LINE_BUSINESS"
                  >
                  </dictionary-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="5">
                <a-form-model-item
                  label="所属区域"
                  prop="suoshuquyu"
                  ref="suoshuquyu">
                  <a-tree-select
                    v-model="form.suoshuquyu"
                    :treeData="options"> </a-tree-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="5">
                <a-form-model-item
                  label="所属岸线:"
                  prop="anxiantype">
                  <dictionary-select
                    v-model="form.anxiantype"
                    :insert-option-all="false"
                    :select-first="false"
                    :dictionary-type="DictionaryEnum.DIC_LINE_TYPE">
                  </dictionary-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="5">
                <a-form-model-item prop="anxiantype2">
                  <a-select
                    placeholder="全部"
                    v-model="form.anxiantype2"
                    style="width:100%;">
                    <a-select-option
                      v-for="item in anxiantype2value"
                      :key="item.key"
                      :value="item.key">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col
                :span="4"
                style="text-align:right;">
                <a-form-model-item
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
                <template
                  slot="plan_type"
                  slot-scope="text, record">
                  <div v-if="record.plan_type === 1">
                    <span>非水利行业-港口规划</span>
                  </div>
                  <div v-if="record.plan_type === 2">
                    <span>水利行业-岸线规划</span>
                  </div>
                </template>
                <span
                  slot="action"
                  slot-scope="text, record, index">
                  <template>
                    <a @click="gcDetailClick(record)">详情</a>
                    <a @click="gcAddClick(record)" style="margin-left: 10px;">编辑</a>
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
    <!-- 新增岸线规划信息 -->
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
                label="规划信息名称"
                prop="ghxxmc"
                ref="ghxxmc">
                <a-input v-model="form2.ghxxmc"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="规划信息分类"
                prop="ghxxfl"
                ref="ghxxfl">
                <dictionary-select
                  v-model="form2.ghxxfl"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.DIC_LINE_BUSINESS">
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="所属岸线:"
                prop="anxiantype3">
                <dictionary-select
                  v-model="form2.anxiantype3"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.DIC_LINE_TYPE">
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item prop="anxiantype4">
                <a-select
                  placeholder="全部"
                  v-model="form2.anxiantype4"
                  style="width:100%;">
                  <a-select-option
                    v-for="item in anxiantype2value2"
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
                prop="suoshuquyu2"
                ref="suoshuquyu2">
                <a-tree-select v-model="form2.suoshuquyu2" :treeData="options"></a-tree-select>
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
    <!-- 岸线规划信息删除 -->
    <a-modal
      title="岸线规划信息删除"
      :visible="visibledel"
      @ok="handleOk"
      @cancel="handleCancelDel">
      <p>确定删除该条记录?</p>
    </a-modal>
  </div>
</template>
<script>
import { STable } from '@/components'
// import { MAPBOX_TOKEN, Style } from '@/components/Hczy/Map/config'
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { getAnxianguihuaList, addAnxianguihua, getAnxianxinxiList, updateAnxianguihua, delAnxianguihua, getGldwdata } from '@/api/shorelineplan'
import { treeData } from '@/config/areaTreeSelectData'
import moment from 'moment'
import uploadSingleImg from '@/components/Hczy/Upload/uploadSingleImg.vue'
// import mapboxgl from 'mapbox-gl'
import mapInput from '@/components/Hczy/mapInput.vue'
export default {
  components: {
    STable,
    mapInput,
    treeData,
    uploadSingleImg
  },
  watch: {
    'form.anxiantype' (value, oldvalue) {
      console.log(value)
      if (value) {
        getAnxianxinxiList({ line_type: value }).then(res => {
          console.log(res)
          // anxiantype2value
          this.anxiantype2value = []
          if (res.data.list.length > 0) {
            for (var i = 0; i < res.data.list.length; i++) {
              this.anxiantype2value.push(
                {
                  key: res.data.list[i].river_line_id,
                  name: res.data.list[i].line_name
                }
              )
            }
          }
        })
      }
    },
    'form2.anxiantype3' (value, oldvalue) {
      console.log(value)
      if (value) {
        getAnxianxinxiList({ line_type: value }).then(res => {
          console.log(res)
          // anxiantype2value
          this.anxiantype2value2 = []
          if (res.data.list.length > 0) {
            for (var i = 0; i < res.data.list.length; i++) {
              this.anxiantype2value2.push(
                {
                  key: res.data.list[i].river_line_id,
                  name: res.data.list[i].line_name
                }
              )
            }
          }
        })
      }
    }
  },
  data () {
    return {
      title: '新增岸线用地',
      cardHeight: window.innerHeight - 207,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      confirmLoading: false,
      options: treeData,
      form: {
        hyfl: '',
        suoshuquyu: '',
        anxiantype: '',
        anxiantype2: ''
      },
      gldwnamevalue: [],
      time: '',
      form2: {
        suoshuquyu2: '',
        anxiantype3: '',
        anxiantype4: '',
        ghxxmc: '',
        ghxxfl: ''
      },
      anxiantype2value: [],
      anxiantype2value2: [],
      hezhanFlag: {},
      rules: {
        ghxxmc: [
          { required: true, message: '规划信息名称不能为空', trigger: 'blur' }
        ],
        ghxxfl: [
          { required: true, message: '规划信息分类不能为空', trigger: 'blur' }
        ]
      },
      // form: this.$form.createForm(this),
      // form2: this.$form.createForm(this),
      visible: false,
      rowData: {},
      addmodifyflag: '1',
      visibledel: false,
      handleCancelMap: false,
      sureBtnShow: true,
      columns: [
        // {
        //   title: '序号',
        //   scopedSlots: { customRender: 'serial' }
        // },
        {
          title: '所属区域',
          dataIndex: 'regionalism_name'
        },
        {
          title: '所属岸线',
          dataIndex: 'river_line_name'
        },
        {
          title: '规划信息名称',
          dataIndex: 'plan_name'
        },
        {
          title: '行业分类',
          dataIndex: 'plan_type',
          scopedSlots: { customRender: 'plan_type' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '180px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      queryParam: {
        category: 0,
        regionalism_id: '',
        river_line_id: '',
        status: 1
      },
      loadData: parameter => {
        // alert('123')
        return getAnxianguihuaList(Object.assign(parameter, this.queryParam)).then(res => {
          console.log(res)
          return res.data
        })
      }
    }
  },
  created () {
    // 获取河湖长和管理单位下拉数据
    getGldwdata('136485248216072193').then(res => {
      console.log(res)
      for (var i = 0; i < res.data.depts.length; i++) {
        this.gldwnamevalue.push(
            {
              key: res.data.depts[i].dept_id,
              name: res.data.depts[i].dept_name
            }
          )
      }
    })
  },
  methods: {
    moment,
    dateChange (date, dateString) {
      console.log(date)
      console.log(dateString)
      this.time = dateString
    },
    getCurrentData () {
    },
    // 岸线用地信息删除
    handleDel (value) {
      console.log(value)
      this.rowData = value.plan_id
      this.visibledel = true
    },
    handleOk () {
      delAnxianguihua(this.rowData).then((res) => {
        console.log(res)
        this.$message.success('删除成功！')
        this.$refs.table.refresh(true)
        this.visibledel = false
      })
    },
    handleCancelDel () {
      this.visibledel = false
    },
    // 污染源类型触发--查询框
    cjjgChange (value) {
      console.log(value)
    },
    // 查询按钮触发
    searchClick () {
      // console.log(this.form)
      console.log(this.form.anxiantype)
      this.queryParam.category = this.form.hyfl === '' ? 0 : parseInt(this.form.hyfl)
      this.queryParam.regionalism_id = this.form.suoshuquyu
      this.queryParam.river_line_id = this.form.anxiantype2
      this.$refs.table.refresh(true)
    },
    // 重置按钮触发
    resertClick () {
      this.form.hyfl = ''
      this.form.suoshuquyu = ''
      this.form.anxiantype = ''
      this.form.anxiantype2 = ''
    },
    selectChangehedao () {
      //
    },
    selectChangearea () {
      //
    },
    // 新增编辑按钮触发
    gcAddClick (data = {}) {
      this.visible = true
      this.form2 = { ...{}, ...data }
      console.log(this.form2)
      this.rowData = this.form2
      if (this.form2.river_line_id) {
        this.addmodifyflag = '2'
        this.title = '修改岸线规划信息'
        this.setFormValue(this.form2)
      } else {
        this.addmodifyflag = '1'
        this.title = '新增岸线规划信息'
      }
      setTimeout(() => {
        this.$refs.form2.clearValidate()
      }, 1)
    },
    setFormValue (data) {
      this.$set(this.form2, 'suoshuquyu2', data.regionalism_id)
      this.$set(this.form2, 'code', data.land_num)
      this.$set(this.form2, 'anxiantype3', data.line_type)
      this.$set(this.form2, 'anxiantype4', data.river_line_id)
      this.$set(this.form2, 'landtype2', parseInt(data.land_type))
      this.$set(this.form2, 'tdmj', data.land_area)
      this.$set(this.form2, 'beizhu', data.explain)
      // anxiantype3: "2"
      // beizhu: "bbb"
      // code: "2"
      // create_at: "2020-06-10 16:51:38"
      // delete_at: ""
      // dept_id: ""
      // dept_name: ""
      // explain: "bbb"
      // land_area: "222"
      // land_id: "138529168726949889"
      // land_num: "2"
      // land_type: 2
      // land_type_name: "耕地"
      // landtype2: 2
      // line_type: 0
      // line_type_name: ""
      // regionalism_id: "3201"
      // regionalism_name: "江苏省-南京市"
      // river_line_id: "2"
      // river_line_name: ""
      // status: 1
      // suoshuquyu2: "3201"
      // tdmj: "222"
      // update_at: "2020-06-10 16:51:38"
      // version: 1
    },
    savePopup () {
      // console.log(this.form2.time)
      this.$refs.form2.validate(err => {
        if (err) {
          var reqData = {
            regionalism_id: this.form2.suoshuquyu2,
            river_line_id: this.form2.anxiantype4,
            plan_name: this.form2.ghxxmc,
            plan_type: this.form2.ghxxfl
          }
          console.log(reqData)
          if (this.addmodifyflag === '1') {
            addAnxianguihua(reqData).then(res => {
              this.searchClick()
              this.visible = false
              this.$refs.form2.clearValidate()
              this.$message.success('新增岸线规划成功!')
            })
          } else if (this.addmodifyflag === '2') {
            reqData.land_id = this.rowData.land_id
            reqData.version = this.rowData.version
            console.log(reqData)
            updateAnxianguihua(this.rowData.land_id, reqData).then(res => {
              this.searchClick()
              this.visible = false
              this.$refs.form2.clearValidate()
              this.$message.success('修改污染源规划成功!')
            })
          }
        }
      })
    },
    handleCancelAdd () {
      this.visible = false
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
<style scoped>
.add-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 3000;
}
.add-map-box {
  position: fixed;
  width: 648px;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px 20px 0;
  z-index: 4000;
}
.add-map-submit {
  height: 52px;
  padding: 10px 0 0;
}
.add-map-submit-btn {
  float: right;
  margin-left: 20px;
}
</style>
