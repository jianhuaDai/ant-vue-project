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
                <a-form-model-item label="岸线类型:" prop="anxiantype">
                  <dictionary-select
                    v-model="form.anxiantype"
                    :insert-option-all="false"
                    :select-first="false"
                    :dictionary-type="DictionaryEnum.DIC_LINE_TYPE"
                  >
                  </dictionary-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="8">
                <a-form-model-item label="岸线名称:" prop="namesearch">
                  <a-input v-model="form.namesearch"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col
                :span="5"
                :offset="3"
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
    <!-- 新增岸线信息 -->
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
                label="岸线名称"
                prop="name"
                ref="name">
                <a-input v-model="form2.name"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="岸线编码"
                prop="code"
                ref="code">
                <a-input v-model="form2.code"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="所属区域"
                prop="suoshuquyu"
                ref="suoshuquyu">
                <a-tree-select v-model="form2.suoshuquyu" :treeData="options"></a-tree-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="岸线类型"
                prop="anxiantype2"
                ref="anxiantype2">
                <dictionary-select
                  v-model="form2.anxiantype2"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.DIC_LINE_TYPE"
                >
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="岸线范围"
                prop="anxianscope"
                ref="anxianscope">
                <a-input v-model="form2.anxianscope">
                  <a-icon @click="showMap1" slot="addonAfter" type="environment" :style="{ color: '#0D7DD9' }" />
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                prop="anxianscope2"
                ref="anxianscope2">
                <a-input v-model="form2.anxianscope2">
                  <a-icon @click="showMap2" slot="addonAfter" type="environment" :style="{ color: '#0D7DD9' }" />
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="岸线长度"
                prop="anxianlenght"
                ref="anxianlenght">
                <a-input v-model="form2.anxianlength"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="管理单位"
                prop="gldw"
                ref="gldw">
                <!-- <a-input v-model="form2.gldw"></a-input> -->
                <a-select v-model="form2.gldw">
                  <a-select-option
                    v-for="item in gldwnamevalue"
                    :key="item.key"
                    :value="item.key">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="备注"
                prop="beizhu"
                ref="beizhu">
                <a-input v-model="form2.beizhu"></a-input>
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
    <!-- 岸线信息删除 -->
    <a-modal
      title="污染源删除"
      :visible="visibledel"
      @ok="handleOk"
      @cancel="handleCancelDel">
      <p>确定删除该条记录?</p>
    </a-modal>
    <div
      id="distance"
      class="distance-container"
      v-show="handleCancelMap"></div>
    <div
      class="add-mask"
      v-show="handleCancelMap"></div>
    <div
      class="add-map-box"
      v-show="handleCancelMap">
      <!-- <div id="add-map" style="width:100%;height:428px" v-show="handleCancelMap"></div> -->
      <div
        id="add-map"
        class="map-view"
        style="width:100%;height:428px"></div>
      <div class="add-map-submit">
        <a-button
          class="add-map-submit-btn"
          type="primary"
          @click="AddDraw"
          v-if="sureBtnShow"
          disabled>确定</a-button>
        <a-button
          class="add-map-submit-btn"
          type="primary"
          @click="AddDraw"
          v-if="!sureBtnShow">确定</a-button>
        <a-button
          class="add-map-submit-btn"
          @click="cancelAddDraw">取消</a-button>
      </div>
    </div>
  </div>
</template>
<script>
import { STable } from '@/components'
import { MAPBOX_TOKEN, Style } from '@/components/Hczy/Map/config'
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { getAnxianxinxiList, addAnxian, updateAnxian, delAnxian, getGldwdata } from '@/api/shorelineinfomanage'
import { treeData } from '@/config/areaTreeSelectData'
import moment from 'moment'
import uploadSingleImg from '@/components/Hczy/Upload/uploadSingleImg.vue'
import mapboxgl from 'mapbox-gl'
import mapInput from '@/components/Hczy/mapInput.vue'
export default {
  components: {
    STable,
    mapInput,
    treeData,
    uploadSingleImg
  },
  watch: {
    'form2.suoshuhedao' (value, oldvalue) {
      console.log(value)
      console.log(this.suoshuhedaovalue)
      console.log(this.hezhanFlag)
      for (var k = 0; k < this.hezhanFlag.data.list.length; k++) {
        if (this.hezhanFlag.data.list[k].water_id === value) {
          this.form2.sshezhang = this.hezhanFlag.data.list[k].chief_name
        }
      }
    }
  },
  data () {
    return {
      title: '新增岸线',
      cardHeight: window.innerHeight - 207,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      confirmLoading: false,
      options: treeData,
      form: {
        namesearch: '',
        wrytype: undefined
      },
      gldwnamevalue: [],
      time: '',
      form2: {
        name: '',
        code: '',
        suoshuquyu: undefined,
        anxiantype2: '',
        anxianscope: '',
        anxianscope2: '',
        anxianlenght: '',
        gldw: '',
        beizhu: ''
      },
      hezhanFlag: {},
      rules: {
        name: [
          { required: true, message: '岸线名称不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '岸线编码不能为空', trigger: 'blur' }
        ],
        anxiantype2: [
          { required: true, message: '岸线类型不能为空', trigger: 'blur' }
        ],
        anxianscope: [
          { required: true, message: '岸线范围不能为空', trigger: 'blur' }
        ],
        anxianscope2: [
          { required: true, message: '岸线范围不能为空', trigger: 'blur' }
        ],
        suoshuquyu: [
          { required: true, message: '所属区域不能为空', trigger: 'blur' }
        ],
        gldw: [
          { required: true, message: '管理单位不能为空', trigger: 'blur' }
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
      jindu: '',
      weidu: '',
      jindu2: '',
      weidu2: '',
      jwdFlag: '1',
      columns: [
        // {
        //   title: '序号',
        //   scopedSlots: { customRender: 'serial' }
        // },
        {
          title: '岸线名称',
          dataIndex: 'line_name'
        },
        {
          title: '所属区域',
          dataIndex: 'regionalism_name'
        },
        {
          title: '岸线类型',
          dataIndex: 'line_type_name'
        },
        {
          title: '岸线起点',
          dataIndex: 'line_start'
        },
        {
          title: '岸线终点',
          dataIndex: 'line_end'
        },
        {
          title: '岸线长度',
          dataIndex: 'line_length'
        },
        {
          title: '管理单位',
          dataIndex: 'dept_name'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '160px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      queryParam: {
        line_name: '',
        line_type: 0,
        status: 1
      },
      loadData: parameter => {
        // alert('123')
        return getAnxianxinxiList(Object.assign(parameter, this.queryParam)).then(res => {
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
    // 岸线信息删除
    handleDel (value) {
      console.log(value)
      this.rowData = value.river_line_id
      this.visibledel = true
    },
    handleOk () {
      delAnxian(this.rowData).then((res) => {
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
      this.queryParam.line_name = this.form.namesearch
      this.queryParam.line_type = this.form.anxiantype === '' ? 0 : parseInt(this.form.anxiantype)
      this.$refs.table.refresh(true)
    },
    // 重置按钮触发
    resertClick () {
    },
    // 点击获取地图坐标
    showMap1 () {
      this.jwdFlag = '1'
      this.handleCancelMap = true
      this.sureBtnShow = true
      this.jindu = ''
      this.weidu = ''
      setTimeout(() => {
        this.initMap()
        // this.initLanguage()
      }, 500)
    },
    showMap2 () {
      this.jwdFlag = '2'
      this.handleCancelMap = true
      this.sureBtnShow = true
      this.jindu2 = ''
      this.weidu2 = ''
      setTimeout(() => {
        this.initMap()
        // this.initLanguage()
      }, 500)
    },
    cancelAddDraw () {
      this.handleCancelMap = false
    },
    AddDraw () {
      this.disabled = false
      if (this.jwdFlag === '1') {
        this.form2.anxianscope = this.jindu + ',' + this.weidu
        this.handleCancelMap = false
      } else if (this.jwdFlag === '2') {
        this.form2.anxianscope2 = this.jindu2 + ',' + this.weidu2
        this.handleCancelMap = false
      }
      // if (this.jindu === '' || this.weidu === '') {
      //   this.$message.info('请点击地图')
      // } else {
      //   var a = this.jindu
      //   var b = this.weidu
      //   this.form2.jwd = a + ',' + b
      //   this.handleCancelMap = false
      // }
    },
    initMap () {
      const map = new mapboxgl.Map({
        container: 'add-map',
        style: Style.chiefStyle,
        pitch: 0,
        attributionControl: false,
        center: [118.806266, 32.059868],
        zoom: 5,
        minZoom: 6,
        maxZoom: 10,
        token: MAPBOX_TOKEN
      })
      var marker = new mapboxgl.Marker({
        draggable: true
      })
      // 地图导航
      var _this = this
      var nav = new mapboxgl.NavigationControl()
      map.addControl(nav, 'top-left')
      map.on('click', function (e) {
        // alert(e.lngLat.lng, e.lngLat.lat);
        _this.closeMap(e)
        marker.setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map)
        // document.getElementById('info').innerHTML =
        //   JSON.stringify(e.point) + '<br />' + JSON.stringify(e.lngLat)
        // marker.setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map)
      })
    },
    closeMap (e) {
      if (this.jwdFlag === '1') {
        this.jindu = e.lngLat.lng.toFixed(6)
        this.weidu = e.lngLat.lat.toFixed(6)
      } else if (this.jwdFlag === '2') {
        this.jindu2 = e.lngLat.lng.toFixed(6)
        this.weidu2 = e.lngLat.lat.toFixed(6)
      }
      this.sureBtnShow = false
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
        this.title = '修改岸线信息'
        this.setFormValue(this.form2)
      } else {
        this.addmodifyflag = '1'
        this.title = '新增岸线信息'
      }
      setTimeout(() => {
        this.$refs.form2.clearValidate()
      }, 1)
    },
    setFormValue (data) {
      this.$set(this.form2, 'name', data.line_name)
      this.$set(this.form2, 'code', data.line_num)
      this.$set(this.form2, 'suoshuquyu', data.regionalism_id)
      this.$set(this.form2, 'anxiantype2', data.line_type)
      this.$set(this.form2, 'anxianscope', data.line_start[0])
      this.$set(this.form2, 'anxianscope2', data.line_end[0])
      this.$set(this.form2, 'anxianlength', data.line_length)
      this.$set(this.form2, 'gldw', data.dept_id)
      this.$set(this.form2, 'beizhu', data.explain)
    },
    savePopup () {
      console.log(this.form2.time)
      this.$refs.form2.validate(err => {
        if (err) {
          var reqData = {
            line_name: this.form2.name,
            line_num: this.form2.code === undefined ? '' : this.form2.code,
            regionalism_id: this.form2.suoshuquyu,
            line_type: this.form2.anxiantype2,
            line_start: [this.form2.anxianscope],
            line_end: [this.form2.anxianscope2],
            line_length: this.form2.anxianlength,
            dept_id: this.form2.gldw,
            explain: this.form2.beizhu
          }
          console.log(reqData)
          if (this.addmodifyflag === '1') {
            addAnxian(reqData).then(res => {
              this.searchClick()
              this.visible = false
              this.$refs.form2.clearValidate()
              this.$message.success('新增岸线成功!')
            })
          } else if (this.addmodifyflag === '2') {
            reqData.river_line_id = this.rowData.river_line_id
            reqData.version = this.rowData.version
            console.log(reqData)
            updateAnxian(this.rowData.river_line_id, reqData).then(res => {
              this.searchClick()
              this.visible = false
              this.$refs.form2.clearValidate()
              this.$message.success('修改污染源成功!')
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
