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
              <a-col :span="6">
                <a-form-model-item label="所属区域:" prop="suoshuquyu" ref="suoshuquyu">
                  <!-- <a-input v-model="form.namesearch"></a-input> -->
                  <a-tree-select v-model="form.suoshuquyu" :treeData="options"> </a-tree-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="6">
                <a-form-model-item label="所属水体:" prop="suoshushuiti" ref="suoshushuiti">
                  <!-- <a-select v-model="form.suoshushuiti" placeholder="全部">
                    <a-select-option value="1">河流</a-select-option>
                    <a-select-option value="2">湖泊</a-select-option>
                    <a-select-option value="3">水库</a-select-option>
                  </a-select> -->
                  <dictionary-select
                    v-model="form.suoshushuiti"
                    :dictionary-type="DictionaryEnum.WATER_TYPE">
                  </dictionary-select>
                  <!-- <a-tree-select v-model="form.area" :treeData="options"> </a-tree-select> -->
                </a-form-model-item>
              </a-col>
              <a-col :span="6">
                <a-form-model-item label="测站类别:" prop="czlb" ref="czlb">
                  <dictionary-select
                    v-model="form.czlb"
                    :dictionary-type="DictionaryEnum.DIC_STATION_USE_TYPE">
                  </dictionary-select>
                </a-form-model-item>
              </a-col>
              <a-col
                :span="5"
                :offset="1"
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
                <!-- <template
                  slot="station_type"
                  slot-scope="text, record">
                  <div v-if="record.status === 1">
                    <span>水情测站</span>
                  </div>
                  <div v-if="record.status === 2">
                    <span>雨情测站</span>
                  </div>
                  <div v-if="record.status === 3">
                    <span>水质测站</span>
                  </div>
                  <div v-if="record.status === 4">
                    <span>河湖生态测站</span>
                  </div>
                  <div v-if="record.status === 5">
                    <span>视频站</span>
                  </div>
                </template> -->
                <span
                  slot="action"
                  slot-scope="text, record, index">
                  <template>
                    <!-- <a @click="gcDetailClick(record)">详情</a> -->
                    <a @click="gcAddClick(record)">编辑</a>
                    <a
                      @click="handleDel(record)"
                      style="margin-left: 10px;color: red">删除</a>
                    <!-- <a @click="gcCollectClick(record)" style="margin-left: 10px;">关联监测项</a> -->
                  </template>
                </span>
              </s-table>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <!-- 新增水情 -->
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
                label="测站名称"
                prop="name"
                ref="name">
                <a-input v-model="form2.name"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="测站编码"
                prop="code"
                ref="code">
                <a-input v-model="form2.code"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="水体类型"
                prop="suoshushuiti"
                ref="suoshushuiti">
                <!-- <a-select
                  placeholder="全部"
                  v-model="form2.suoshushuiti">
                  <a-select-option value="1">河流</a-select-option>
                  <a-select-option value="2">湖泊</a-select-option>
                  <a-select-option value="3">水库</a-select-option>
                </a-select> -->
                <dictionary-select
                  v-model="form2.suoshushuiti"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.WATER_TYPE"
                >
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="水体名称"
                prop="suoshushuitiname"
                ref="suoshushuitiname">
                <a-select v-model="form2.suoshushuitiname">
                  <a-select-option
                    v-for="item in suoshushuitinamevalue"
                    :key="item.key"
                    :value="item.key">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="测站地址"
                prop="address"
                ref="address">
                <a-input v-model="form2.address"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="经纬度"
                prop="jwd"
                ref="jwd">
                <!-- <a-input v-model="form2.jwd">
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
                prop="suoshuquyu2"
                ref="suoshuquyu2">
                <a-tree-select v-model="form2.suoshuquyu2" :treeData="options2"> </a-tree-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="测站类别:" prop="czlb2" ref="czlb2">
                <dictionary-select
                  v-model="form2.czlb2"
                  :dictionary-type="DictionaryEnum.DIC_STATION_USE_TYPE">
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="监测方式"
                prop="jcfs"
                ref="jcfs">
                <a-select
                  placeholder="全部"
                  v-model="form2.jcfs">
                  <a-select-option value="1">人为监测</a-select-option>
                  <a-select-option value="2">设备监测</a-select-option>
                </a-select>
                <!-- <dictionary-select
                  v-model="form2.jcfs"
                  :dictionary-type="DictionaryEnum.DIC_MONITORING_TYPE">
                </dictionary-select> -->
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="监测频次"
                prop="jcpc"
                ref="jcpc">
                <a-input v-model="form2.jcpc">
                  <template slot="addonAfter">
                    次/月
                  </template>
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="所属部门:"
                prop="deptname"
                ref="deptname">
                <!-- <a-input v-model.number="form2.gldwname"></a-input> -->
                <a-select v-model="form2.deptname">
                  <a-select-option
                    v-for="item in deptnamevalue"
                    :key="item.key"
                    :value="item.key">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="建站年月"
                prop="jzny"
                ref="jzny">
                <a-date-picker
                  style="width:100%;"
                  type="date"
                  placeholder="请选择时间"></a-date-picker>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="运营状况"
                prop="yyzk"
                ref="yyzk">
                <a-input v-model="form2.yyzk"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="简介"
                prop="beizhu"
                ref="beizhu">
                <a-input v-model="form2.beizhu"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="图片" prop="image_url" ref="image_url">
                <uploadSingleImg v-model="form2.image_url"></uploadSingleImg>
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
    <!-- 河湖生态信息删除 -->
    <a-modal
      title="河湖生态信息删除"
      :visible="visibledel"
      @ok="handleOk"
      @cancel="handleCancelDel">
      <p>确定删除该条记录?</p>
    </a-modal>
    <!-- 关联监测项 -->
    <a-modal
      title="关联监测项"
      :visible="visibleguanlian"
      @ok="handleOkGL"
      @cancel="handleCancelGL">

    </a-modal>
    <!-- <div
      id="distance"
      class="distance-container"
      v-show="handleCancelMap"></div>
    <div
      class="add-mask"
      v-show="handleCancelMap"></div>
    <div
      class="add-map-box"
      v-show="handleCancelMap">
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
    </div> -->
  </div>
</template>
<script>
import { STable } from '@/components'
import { MAPBOX_TOKEN, Style } from '@/components/Hczy/Map/config'
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { getShuiqingcezhanList, addShuiqincezhan, getRiver, updateShuiqincezhan, delShuiqincezhan, getGldwdata } from '@/api/shuiqingcezhan'
import uploadSingleImg from '@/components/Hczy/Upload/uploadSingleImg.vue'
import { treeData } from '@/config/areaTreeSelectData'
import mapboxgl from 'mapbox-gl'
import mapInput from '@/components/Hczy/mapInput.vue'
// import { getSourceList } from '@/api/task' // 接口调用
export default {
  components: {
    STable,
    mapInput,
    treeData,
    uploadSingleImg
  },
  watch: {
    'form2.suoshushuiti' (value) {
      console.log(value)
      if (value) {
        // alert('进来了')
        getRiver({ water_type: value }).then(res => {
          this.suoshushuitinamevalue = []
        console.log(res)
        for (var i = 0; i < res.data.list.length; i++) {
          this.suoshushuitinamevalue.push(
            {
              key: res.data.list[i].water_id,
              name: res.data.list[i].name
            }
          )
        }
      })
      }
    }
  },
  data () {
    return {
      cardHeight: window.innerHeight - 207,
      labelCol: { span: 7 },
      wrapperCol: { span: 16 },
      confirmLoading: false,
      form: {
        suoshuquyu: '',
        suoshushuiti: '',
        czlb: ''
      },
      suoshushuitinamevalue: [],
      options: treeData,
      options2: treeData,
      addmodifyflag: '1',
      title: '新增河湖生态测站',
      deptnamevalue: [],
      form2: {
        name: '',
        code: '',
        address: '',
        suoshushuiti: '',
        suoshushuitiname: '',
        suoshuquyu2: '',
        czlb2: '',
        deptname: '',
        jwd: '',
        jcfs: '',
        jcpc: '',
        jzny: '',
        yyzk: '',
        beizhu: '',
        image_url: ''
      },
      rules: {
        name: [
          { required: true, message: '水源地名称不能为空', trigger: 'blur' }
        ],
        pointname: [
          { required: true, message: '点位名称不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '测站编码不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '地址不能为空', trigger: 'blur' }
        ],
        suoshuquyu2: [
          { required: true, message: '所属区域不能为空', trigger: 'change' }
        ],
        jcfs: [
          { required: true, message: '监测方式不能为空', trigger: 'blur' }
        ],
        weizhi: [
          { required: true, message: '位置不能为空', trigger: 'blur' }
        ],
        suoshushuiti: [
          { required: true, message: '所属水体不能为空', trigger: 'blur' }
        ],
        area2: [
          { required: true, message: '所属区域不能为空', trigger: 'blur' }
        ],
        type2: [
          { required: true, message: '属性不能为空', trigger: 'blur' }
        ],
        jwd: [
          { required: true, message: '经纬度不能为空', trigger: 'blur' }
        ]
      },
      // 关注类别
      guanzhujibievalue: [
        {
          value: '0',
          name: '省级'
        },
        {
          value: '1',
          name: '市级'
        },
        {
          value: '2',
          name: '区级'
        },
        {
          value: '3',
          name: '县级'
        }
      ],
      // form: this.$form.createForm(this),
      // form2: this.$form.createForm(this),
      visible: false,
      visibledel: false,
      visibleguanlian: false,
      handleCancelMap: false,
      sureBtnShow: true,
      rowData: {},
      addmodifyFlag: '1',
      jindu: '',
      weidu: '',
      columns: [
        // {
        //   title: '序号',
        //   scopedSlots: { customRender: 'serial' }
        // },
        {
          title: '测站名称',
          dataIndex: 'station_name'
        },
        {
          title: '测站编码',
          dataIndex: 'monitoring_id'
        },
        {
          title: '所属水体',
          dataIndex: 'water_name'
        },
        {
          title: '所属区域',
          dataIndex: 'regionalism_name'
        },
        {
          title: '测站类别',
          dataIndex: 'station_use_name'
        },
        {
          title: '监测方式',
          dataIndex: 'monitoring_type_name'
        },
        {
          title: '监测频次',
          dataIndex: 'monitoring_frequency'
        },
        {
          title: '所属部门',
          dataIndex: 'dept_name'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
       // 查询参数
      queryParam: {
        regionalism_id: '',
        water_type: null,
        station_use: 0,
        station_type: 4
        // status: 1
      },
      loadData: parameter => {
        return getShuiqingcezhanList(Object.assign(parameter, this.queryParam)).then(res => {
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
        this.deptnamevalue.push(
            {
              key: res.data.depts[i].dept_id,
              name: res.data.depts[i].dept_name
            }
          )
      }
    })
  },
  methods: {
    handleOkGL () {
      this.visibleguanlian = true
    },
    handleCancelGL () {
      this.visibleguanlian = false
    },
    // 水情测站删除
    handleDel (value) {
      console.log(value)
      this.rowData = value.monitoring_id
      this.visibledel = true
    },
    // 删除按钮触发
    handleOk () {
      delShuiqincezhan(this.rowData).then((res) => {
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
      console.log(this.form.type)
      // this.queryParam.regionalism_id = this.form.suoshuquyu
      this.queryParam.regionalism_id = this.form.suoshuquyu === '' ? '' : this.form.suoshuquyu
      this.queryParam.water_type = this.form.suoshushuiti === '' ? null : this.form.suoshushuiti
      // this.queryParam.station_type = this.form.czlb === '' ? null : parseInt(this.form.czlb)
      this.queryParam.station_use = this.form.czlb === '' ? 0 : this.form.czlb
      // console.log(this.queryParam)
      this.queryParam.station_type = 4
      // this.$refs[this.queryParam].$refs.table.refresh(true)
      this.$refs.table.refresh(true)
    },
    // 重置按钮触发
    resertClick () {
      this.form.suoshuquyu = ''
      this.form.suoshushuiti = ''
    },
    // 点击获取地图坐标
    showMap () {
      this.handleCancelMap = true
      this.sureBtnShow = true
      this.jindu = ''
      this.weidu = ''
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
      if (this.jindu === '' || this.weidu === '') {
        this.$message.info('请点击地图')
      } else {
        var a = this.jindu
        var b = this.weidu
        // this.form2.setFieldsValue({ startjwd: a + ',' + b })
        this.form2.jwd = [parseFloat(a), parseFloat(b)]
        this.handleCancelMap = false
      }
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
      })
    },
    closeMap (e) {
      this.jindu = e.lngLat.lng.toFixed(6)
      this.weidu = e.lngLat.lat.toFixed(6)
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
      // console.log(this.form2)
      this.rowData = this.form2
      if (this.form2.monitoring_id) {
        this.addmodifyflag = '2'
        this.title = '修改河湖生态测站信息'
        this.setFormValue(this.form2)
      } else {
        this.addmodifyflag = '1'
        this.title = '新增河湖生态测站信息'
      }
      setTimeout(() => {
        this.$refs.form2.clearValidate()
      }, 1)
    },
    // 修改表单赋值
    setFormValue (data) {
      console.log(data)
      console.log(data.image_url)
      // this.form2.name = data.station_name
      this.$set(this.form2, 'name', data.station_name)
      this.$set(this.form2, 'code', data.monitoring_num)
      this.$set(this.form2, 'suoshushuiti', data.water_type)
      this.$set(this.form2, 'suoshushuitiname', data.water_id)
      this.$set(this.form2, 'address', data.location)
      this.$set(this.form2, 'jwd', [parseFloat(data.lon_lat[0]), parseFloat(data.lon_lat[1])])
      this.$set(this.form2, 'suoshuquyu2', data.regionalism_id)
      this.$set(this.form2, 'czlb2', data.station_type)
      this.$set(this.form2, 'deptname', data.dept_id)
      this.$set(this.form2, 'jcfs', data.monitoring_type.toString())
      this.$set(this.form2, 'jcpc', data.monitoring_frequency)
      this.$set(this.form2, 'yyzk', data.operation_status)
      this.$set(this.form2, 'beizhu', data.explain)
      this.$set(this.form2, 'image_url', data.image_url)

      // setTimeout(() => {
      //   this.$set(this.form2, 'image_url', [])
      // }, 5000)

      // this.form2.code = data.monitoring_num
      // this.form2.suoshushuiti = data.water_id.toString()
      // this.form2.address = data.location
      // this.form2.jwd = data.lon_lat
      // this.form2.suoshuquyu2 = data.regionalism_id
      // this.form2.deptname = data.dept_id
      // this.form2.czlb = data.standard
      // this.form2.jcfs = data.monitoring_type
      // this.form2.jcpc = data.monitoring_frequency
      // this.form2.jmmc = data.base_name
      // this.form2.beizhu = data.explain
      // this.form2.image_url = data.image_url
    },
    savePopup () {
      this.$refs.form2.validate(err => {
        if (err) {
          var reqData = {
            station_name: this.form2.name,
            monitoring_num: this.form2.code === undefined ? '' : this.form2.code,
            water_type: this.form2.suoshushuiti,
            water_id: this.form2.suoshushuitiname,
            location: this.form2.address,
            lon_lat: this.form2.jwd,
            dept_id: this.form2.deptname,
            regionalism_id: this.form2.suoshuquyu2 === undefined ? '' : this.form2.suoshuquyu2,
            station_type: 4,
            station_use: this.form2.czlb2,
            monitoring_type: parseInt(this.form2.jcfs),
            monitoring_frequency: this.form2.jcpc === undefined ? 0 : parseInt(this.form2.jcpc),
            base_name: this.form2.jmmc,
            operation_status: this.form2.yyzk,
            explain: this.form2.beizhu === undefined ? '' : this.form2.beizhu,
            image_url: this.form2.image_url === undefined ? [] : this.form2.image_url
          }
          console.log(reqData)
          console.log(this.form2)
          if (this.addmodifyflag === '1') {
            addShuiqincezhan(reqData).then(res => {
              this.searchClick()
              this.visible = false
              this.$refs.form2.clearValidate()
              this.$message.success('新增河湖生态测站成功!')
            })
          } else if (this.addmodifyflag === '2') {
            reqData.id = this.rowData.monitoring_id
            reqData.version = this.rowData.version
            updateShuiqincezhan(this.rowData.monitoring_id, reqData).then(res => {
              this.searchClick()
              this.visible = false
              this.$refs.form2.clearValidate()
              this.$message.success('修改河湖生态测站成功!')
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
