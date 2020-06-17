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
                <a-form-model-item
                  label="工程名称:"
                  prop="namesearch">
                  <a-input v-model="form.namesearch"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="6">
                <a-form-model-item
                  label="所属区域"
                  prop="suoshuquyu"
                  ref="suoshuquyu">
                  <a-tree-select
                    v-model="form.suoshuquyu"
                    :treeData="options"> </a-tree-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="6">
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
              <a-col :span="6">
                <a-form-model-item prop="anxiantype2">
                  <a-select
                    placeholder="全部"
                    v-model="form.anxiantype2"
                    style="width:150%;">
                    <a-select-option
                      v-for="item in anxiantype2value"
                      :key="item.key"
                      :value="item.key">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="6">
                <a-form-model-item
                  label="工程类型:"
                  prop="projtype">
                  <dictionary-select
                    v-model="form.projtype"
                    :insert-option-all="false"
                    :select-first="false"
                    :dictionary-type="DictionaryEnum.DIC_PROJECT_TYPE">
                  </dictionary-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="6">
                <a-form-model-item
                  label="建设阶段:"
                  prop="jsjd">
                  <dictionary-select
                    v-model="form.jsjd"
                    :insert-option-all="false"
                    :select-first="false"
                    :dictionary-type="DictionaryEnum.DIC_BUILD_STEP">
                  </dictionary-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="6">
                <a-form-model-item
                  label="工程规模:"
                  prop="gcgm">
                  <dictionary-select
                    v-model="form.gcgm"
                    :insert-option-all="false"
                    :select-first="false"
                    :dictionary-type="DictionaryEnum.DIC_PROJECT_SIZE">
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
    <!-- 新增岸线工程信息 -->
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
                <a-input v-model="form2.name"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="工程类型"
                prop="projtype2"
                ref="projtype2">
                <dictionary-select
                  v-model="form2.projtype2"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.DIC_PROJECT_TYPE">
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="所属区域"
                prop="suoshuquyu2"
                ref="suoshuquyu2">
                <a-tree-select
                  v-model="form2.suoshuquyu2"
                  :treeData="options"></a-tree-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="权属:"
                prop="quanshu">
                <!-- <a-input v-model="form2.quanshu"></a-input> -->
                <a-select v-model="form2.quanshu">
                  <a-select-option
                    v-for="item in quanshuvalue"
                    :key="item.key"
                    :value="item.key">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="所属岸线"
                prop="anxiantype3"
                ref="anxiantype3">
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
                label="建设阶段:"
                prop="jsjd2">
                <dictionary-select
                  v-model="form2.jsjd2"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.DIC_BUILD_STEP">
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="工程规模:"
                prop="gcgm2">
                <dictionary-select
                  v-model="form2.gcgm2"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.DIC_PROJECT_SIZE">
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="经纬度"
                prop="jwd"
                ref="jwd">
                <a-input v-model="form2.jwd">
                  <a-icon @click="showMap1" slot="addonAfter" type="environment" :style="{ color: '#0D7DD9' }" />
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="占用岸线长度"
                prop="zyaxlength"
                ref="zyaxlength">
                <a-input v-model="form2.zyaxlength">
                  <template slot="addonAfter">
                    米
                  </template>
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="后方陆域面积"
                prop="hflymianji"
                ref="hflymianji">
                <a-input v-model="form2.hflymianji">
                  <template slot="addonAfter">
                    平方米
                  </template>
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="陆地对应占用岸线长度"
                prop="lddyzyanlength"
                ref="lddyzyanlength">
                <a-input v-model="form2.lddyzyanlength">
                  <template slot="addonAfter">
                    米
                  </template>
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="保护范围长度"
                prop="bhfwlength"
                ref="bhfwlength">
                <a-input v-model="form2.bhfwlength">
                  <template slot="addonAfter">
                    米
                  </template>
                </a-input>
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
import { getAnxianxinxigcList, getAnxianxinxiList, addAnxiangc, updateAnxiangc, delAnxiangc, getGldwdata } from '@/api/shorelineprojinfomanage'
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
    'form2.anxiantype3' (value2) {
      if (value2) {
        getAnxianxinxiList({ line_type: value2 }).then(res => {
          console.log(res)
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
      title: '新增岸线工程信息',
      cardHeight: window.innerHeight - 207,
      labelCol: { span: 7 },
      wrapperCol: { span: 15 },
      confirmLoading: false,
      options: treeData,
      form: {
        namesearch: '',
        wrytype: undefined
      },
      quanshuvalue: [],
      anxiantype2value: [],
      anxiantype2value2: [],
      gldwnamevalue: [],
      time: '',
      form2: {
        name: '',
        projtype2: '',
        suoshuquyu2: undefined,
        quanshu: '',
        anxiantype3: '',
        anxiantype4: '',
        jsjd2: '',
        gcgm2: '',
        jwd: '',
        zyaxlength: '',
        hflymianji: '',
        lddyzyanlength: '',
        bhfwlength: '',
        beizhu: ''
      },
      hezhanFlag: {},
      rules: {
        name: [
          { required: true, message: '工程名称不能为空', trigger: 'blur' }
        ],
        projtype2: [
          { required: true, message: '工程类型不能为空', trigger: 'blur' }
        ],
        suoshuquyu2: [
          { required: true, message: '所属区域不能为空', trigger: 'change' }
        ],
        quanshu: [
          { required: true, message: '权属不能为空', trigger: 'blur' }
        ],
        anxiantype3: [
          { required: true, message: '岸线类型不能为空', trigger: 'blur' }
        ],
        anxiantype4: [
          { required: true, message: '岸线名称不能为空', trigger: 'blur' }
        ],
        jsjd2: [
          { required: true, message: '建设阶段不能为空', trigger: 'blur' }
        ],
        jwd: [
          { required: true, message: '经纬度不能为空', trigger: 'blur' }
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
          title: '工程类型',
          dataIndex: 'project_type_name'
        },
        {
          title: '工程名称',
          dataIndex: 'project_name'
        },
        {
          title: '占用岸线长度(米)',
          dataIndex: 'occupy_line'
        },
        {
          title: '后方陆域面积(平米)',
          dataIndex: 'line_land_area'
        },
        {
          title: '陆域对应占用岸线长度(米)',
          dataIndex: 'occupy_land_line'
        },
        {
          title: '保护范围长度(米)',
          dataIndex: 'protect_area_line'
        },
        {
          title: '经纬度',
          dataIndex: 'lon_lat'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '160px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      queryParam: {
        project_name: '',
        regionalism_id: '',
        line_type: null,
        river_line_id: '',
        project_type: 0,
        build_state: 0,
        project_info: '',
        status: 1
      },
      loadData: parameter => {
        return getAnxianxinxigcList(Object.assign(parameter, this.queryParam)).then(res => {
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
        this.quanshuvalue.push(
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
      this.rowData = value.project_id
      this.visibledel = true
    },
    handleOk () {
      delAnxiangc(this.rowData).then((res) => {
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
      console.log(this.form.gcgm)
      this.queryParam.project_name = this.form.namesearch
      this.queryParam.regionalism_id = this.form.suoshuquyu === '' ? '' : this.form.suoshuquyu
      this.queryParam.line_type = this.form.anxiantype === '' ? null : this.form.anxiantype
      this.queryParam.river_line_id = this.form.anxiantype2 === '' ? null : this.form.anxiantype2
      this.queryParam.project_type = this.form.projtype === '' ? 0 : this.form.projtype
      this.queryParam.build_state = this.form.jsjd === '' ? 0 : this.form.jsjd
      this.queryParam.project_info = this.form.gcgm === null ? '' : this.form.gcgm.toString()
      this.$refs.table.refresh(true)
    },
    // 重置按钮触发
    resertClick () {
      this.form.namesearch = ''
      this.form.suoshuquyu = ''
      this.form.anxiantype = ''
      this.form.anxiantype2 = ''
      this.form.projtype = ''
      this.form.jsjd = ''
      this.form.gcgm = ''
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
      // if (this.jwdFlag === '1') {
      //   this.form2.anxianscope = this.jindu + ',' + this.weidu
      //   this.handleCancelMap = false
      // } else if (this.jwdFlag === '2') {
      //   this.form2.anxianscope2 = this.jindu2 + ',' + this.weidu2
      //   this.handleCancelMap = false
      // }
      if (this.jindu === '' || this.weidu === '') {
        this.$message.info('请点击地图')
      } else {
        var a = this.jindu
        var b = this.weidu
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
        this.title = '修改岸线工程信息'
        this.setFormValue(this.form2)
      } else {
        this.addmodifyflag = '1'
        this.title = '新增岸线工程信息'
      }
      setTimeout(() => {
        this.$refs.form2.clearValidate()
      }, 1)
    },
    setFormValue (data) {
      this.$set(this.form2, 'name', data.project_name)
      this.$set(this.form2, 'projtype2', data.project_type)
      this.$set(this.form2, 'suoshuquyu2', data.regionalism_id)
      this.$set(this.form2, 'quanshu', data.dept_id)
      this.$set(this.form2, 'anxiantype3', data.line_type)
      this.$set(this.form2, 'anxiantype4', data.river_line_id)
      this.$set(this.form2, 'jsjd2', data.build_state)
      this.$set(this.form2, 'gcgm2', parseInt(data.project_info))
      this.$set(this.form2, 'jwd', [parseFloat(data.lon_lat[0]), parseFloat(data.lon_lat[1])])
      this.$set(this.form2, 'zyaxlength', data.occupy_line)
      this.$set(this.form2, 'hflymianji', data.line_land_area)
      this.$set(this.form2, 'lddyzyanlength', data.occupy_land_line)
      this.$set(this.form2, 'bhfwlength', data.protect_area_line)
      this.$set(this.form2, 'beizhu', data.explain)
    },
    savePopup () {
      console.log(this.form2.time)
      this.$refs.form2.validate(err => {
        if (err) {
          var reqData = {
            project_name: this.form2.name,
            project_type: this.form2.projtype2 === undefined ? '' : this.form2.projtype2,
            regionalism_id: this.form2.suoshuquyu2,
            dept_id: this.form2.quanshu,
            line_type: this.form2.anxiantype3,
            river_line_id: this.form2.anxiantype4,
            build_state: this.form2.jsjd2,
            project_info: this.form2.gcgm2.toString(),
            lon_lat: this.form2.jwd,
            occupy_line: parseInt(this.form2.zyaxlength),
            line_land_area: parseInt(this.form2.hflymianji),
            occupy_land_line: parseInt(this.form2.lddyzyanlength),
            protect_area_line: parseInt(this.form2.bhfwlength),
            explain: this.form2.beizhu
          }
          console.log(reqData)
          if (this.addmodifyflag === '1') {
            addAnxiangc(reqData).then(res => {
              this.searchClick()
              this.visible = false
              this.$refs.form2.clearValidate()
              this.$message.success('新增岸线工程成功!')
            })
          } else if (this.addmodifyflag === '2') {
            reqData.project_id = this.rowData.project_id
            reqData.version = this.rowData.version
            console.log(reqData)
            updateAnxiangc(this.rowData.project_id, reqData).then(res => {
              this.searchClick()
              this.visible = false
              this.$refs.form2.clearValidate()
              this.$message.success('修改岸线工程成功!')
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
