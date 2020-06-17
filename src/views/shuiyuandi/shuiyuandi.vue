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
                <a-form-model-item label="水源地名称:" prop="namesearch">
                  <a-input v-model="form.namesearch"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="6">
                <a-form-model-item label="所属区域:" prop="area">
                  <!-- <a-select v-model="form.wrytype" placeholder="全部">
                    <a-select-option value="0">工业污染源</a-select-option>
                    <a-select-option value="1">农业污染源</a-select-option>
                    <a-select-option value="2">城镇污染源</a-select-option>
                  </a-select> -->
                  <a-tree-select v-model="form.area" :treeData="options"> </a-tree-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="6">
                <a-form-model-item label="属性:" prop="type">
                  <a-select v-model="form.type" placeholder="全部" allowClear>
                    <a-select-option value="1">市级</a-select-option>
                    <a-select-option value="2">区级</a-select-option>
                  </a-select>
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
                <span slot="lon_lat" slot-scope="text">
                  {{ text.length > 0 ? text[0] + ',' + text[1] : '' }}
                </span>
                <template
                  slot="source_type"
                  slot-scope="text, record">
                  <div v-if="record.status === 1">
                    <span>河流</span>
                  </div>
                  <div v-if="record.status === 2">
                    <span>湖泊</span>
                  </div>
                  <div v-if="record.status === 2">
                    <span>水库</span>
                  </div>
                </template>
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
    <!-- 新增水源地 -->
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
                label="水源地名称"
                prop="name"
                ref="name">
                <a-input v-model="form2.name"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="水源地编码"
                prop="code"
                ref="code">
                <a-input v-model="form2.code"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="点位名称"
                prop="pointname"
                ref="pointname">
                <a-input v-model="form2.pointname"></a-input>
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
                label="所属水体"
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
                label="所属区域"
                prop="suoshuquyu"
                ref="suoshuquyu">
                <a-tree-select v-model="form2.suoshuquyu" :treeData="options2"> </a-tree-select>
                <!-- <a-select
                  placeholder="全部"
                  v-model="form2.suoshuquyu">
                  <a-select-option
                    v-for="item in suoshuquyuvalue"
                    :key="item.key"
                    :value="item.key">
                    {{ item.name }}
                  </a-select-option>
                </a-select> -->
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="执行标准"
                prop="zxbz"
                ref="zxbz">
                <a-input v-model="form2.zxbz"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="属性"
                prop="type2"
                ref="type2">
                <!-- <a-select
                  placeholder="全部"
                  v-model="form2.type2">
                  <a-select-option value="1">市级</a-select-option>
                  <a-select-option value="2">区级</a-select-option>
                </a-select> -->
                <dictionary-select
                  v-model="form2.type2"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.ATTENTION_LEVEL"
                >
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="经纬度"
                prop="jwd"
                ref="jwd">
                <a-input v-model="form2.jwd">
                  <a-icon @click="showMap" slot="addonAfter" type="environment" :style="{ color: '#0D7DD9' }" />
                </a-input>
                <!-- <mapInput
                  v-model="form2.jwd"
                  v-if="visible"></mapInput> -->
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
              <a-form-model-item
                label="当年考核目标"
                prop="dnkhmb"
                ref="dnkhmb">
                <dictionary-select
                  v-model="form2.dnkhmb"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.WATER_TARGET"
                >
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="十三五考核目标"
                prop="sswkhmb"
                ref="sswkhmb">
                <dictionary-select
                  v-model="form2.sswkhmb"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.WATER_TARGET"
                >
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="测站类型"
                prop="czlx"
                ref="czlx">
                <!-- <a-select
                  v-model="form2.czlx">
                  <a-select-option value="1">泵站</a-select-option>
                  <a-select-option value="2">闸站</a-select-option>
                  <a-select-option value="3">阀站</a-select-option>
                </a-select> -->
                <dictionary-select
                  v-model="form2.czlx"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.DIC_STATION_TYPE"
                >
                </dictionary-select>
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
    <!-- 水源地信息删除 -->
    <a-modal
      title="水源地信息删除"
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
import { getShuiyuandiList, addShuiyuandi, updateShuiyuandi, delShuiyuandi } from '@/api/shuiyuandi'
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
  data () {
    return {
      cardHeight: window.innerHeight - 207,
      labelCol: { span: 7 },
      wrapperCol: { span: 16 },
      confirmLoading: false,
      form: {
        namesearch: '',
        area: '',
        type: null
      },
      options: treeData,
      options2: treeData,
      addmodifyflag: '1',
      title: '新增水源地',
      form2: {
        name: '',
        code: '',
        pointname: '',
        weizhi: '',
        suoshushuiti: '',
        suoshuquyu: '',
        zxbz: '',
        type2: '',
        jwd: '',
        jcpc: '',
        dnkhmb: '',
        sswkhmb: '',
        czlx: '',
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
        weizhi: [
          { required: true, message: '位置不能为空', trigger: 'blur' }
        ],
        suoshushuiti: [
          { required: true, message: '所属水体不能为空', trigger: 'blur' }
        ],
        suoshuquyu: [
          { required: true, message: '所属区域不能为空', trigger: ['change'] }
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
      // form: this.$form.createForm(this),
      // form2: this.$form.createForm(this),
      visible: false,
      visibledel: false,
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
          title: '水源地名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '水源地编码',
          dataIndex: 'source_num'
        },
        {
          title: '点位名称',
          dataIndex: 'point'
        },
        {
          title: '经纬度',
          dataIndex: 'lon_lat',
          scopedSlots: { customRender: 'lon_lat' }
        },
        {
          title: '属性',
          dataIndex: 'source_property_name'
          // sorter: true
        },
        {
          title: '所属水体',
          dataIndex: 'source_type',
          scopedSlots: { customRender: 'source_type' }
        },
        {
          title: '所属区域',
          dataIndex: 'regionalism_name'
          // sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '160px',
          scopedSlots: { customRender: 'action' }
        }
      ],
       // 查询参数
      queryParam: {
        name: '',
        regionalism_id: '',
        source_property: null,
        status: 1
      },
      loadData: parameter => {
        // alert('123')
        return getShuiyuandiList(Object.assign(parameter, this.queryParam)).then(res => {
          console.log(res)
          return res.data
        })
      }
    }
  },
  created () {
  },
  methods: {
    // 水源地删除
    handleDel (value) {
      console.log(value)
      this.rowData = value.source_id
      this.visibledel = true
    },
    // 删除按钮触发
    handleOk () {
      delShuiyuandi(this.rowData).then((res) => {
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
      // getShuiyuandiList().then(res => {
      //   console.log(res)
      // })
      console.log(this.form.type)
      this.queryParam.name = this.form.namesearch
      this.queryParam.regionalism_id = this.form.area === '' ? '' : this.form.area
      this.queryParam.source_property = this.form.type === '' ? null : parseInt(this.form.type)

      // console.log(this.queryParam)
      // this.$refs[this.queryParam].$refs.table.refresh(true)
      this.$refs.table.refresh(true)
    },
    // 重置按钮触发
    resertClick () {
      this.form.namesearch = ''
      this.form.area = ''
      this.form.type = ''
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
      if (this.rowData.lon_lat) {
        marker.setLngLat([this.rowData.lon_lat[0], this.rowData.lon_lat[1]]).addTo(map)
      }
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
      // console.log(this.form2.image_url)
      this.rowData = this.form2
      if (this.form2.source_id) {
        this.addmodifyflag = '2'
        this.title = '修改水源地信息'
        this.setFormValue(this.form2)
      } else {
        this.addmodifyflag = '1'
        this.title = '新增水源地信息'
      }
      setTimeout(() => {
        this.$refs.form2.clearValidate()
      }, 1)
    },
    // 修改表单赋值
    setFormValue (data) {
      console.log(data)
      console.log(data.image_url)
      this.$set(this.form2, 'name', data.name)
      this.$set(this.form2, 'code', data.source_num)
      this.$set(this.form2, 'pointname', data.point)
      this.$set(this.form2, 'weizhi', data.location)
      this.$set(this.form2, 'suoshushuiti', data.source_type)
      this.$set(this.form2, 'suoshuquyu', data.regionalism_id)
      this.$set(this.form2, 'zxbz', data.standard)
      this.$set(this.form2, 'type2', data.source_property)
      this.$set(this.form2, 'jwd', [parseFloat(data.lon_lat[0]), parseFloat(data.lon_lat[1])])
      this.$set(this.form2, 'jcpc', data.monitoring_frequency)
      this.$set(this.form2, 'dnkhmb', data.current_target)
      this.$set(this.form2, 'sswkhmb', data.target)
      this.$set(this.form2, 'czlx', data.station_type)
      this.$set(this.form2, 'beizhu', data.note)
      // this.$set(this.form2, 'image_url', [])
      this.$set(this.form2, 'image_url', data.image_url)
      // this.form2.name = data.name
      // this.form2.code = data.source_id
      // this.form2.pointname = data.point
      // this.form2.weizhi = data.location
      // this.form2.suoshushuiti = data.source_type.toString()
      // this.form2.suoshuquyu = data.regionalism_id
      // this.form2.zxbz = data.standard
      // this.form2.type2 = data.source_property.toString()
      // this.form2.jwd = data.lon_lat
      // this.form2.jcpc = data.monitoring_frequency
      // this.form2.dnkhmb = data.current_target.toString()
      // this.form2.sswkhmb = data.target.toString()
      // this.form2.czlx = data.station_type.toString()
      // this.form2.beizhu = data.note
      // this.form2.image_url = data.image_url
    },
    savePopup () {
      this.$refs.form2.validate(err => {
        if (err) {
          var reqData = {
            name: this.form2.name,
            source_num: this.form2.code === undefined ? '' : this.form2.code,
            point: this.form2.pointname,
            location: this.form2.weizhi,
            source_type: parseInt(this.form2.suoshushuiti),
            regionalism_id: this.form2.suoshuquyu === undefined ? '' : this.form2.suoshuquyu,
            standard: this.form2.zxbz === undefined ? '' : this.form2.zxbz,
            source_property: parseInt(this.form2.type2),
            lon_lat: this.form2.jwd,
            monitoring_frequency: this.form2.jcpc === undefined ? 0 : parseInt(this.form2.jcpc),
            current_target: this.form2.dnkhmb === undefined ? null : parseInt(this.form2.dnkhmb),
            target: this.form2.sswkhmb === undefined ? null : parseInt(this.form2.sswkhmb),
            station_type: this.form2.czlx === undefined ? null : parseInt(this.form2.czlx),
            note: this.form2.beizhu === undefined ? '' : this.form2.beizhu,
            image_url: this.form2.image_url === undefined ? [] : this.form2.image_url
          }
          console.log(reqData)
          console.log(this.form2)
          if (this.addmodifyflag === '1') {
            addShuiyuandi(reqData).then(res => {
              this.searchClick()
              this.visible = false
              this.$refs.form2.clearValidate()
              this.$message.success('新增水源地成功!')
            })
          } else if (this.addmodifyflag === '2') {
            reqData.source_id = this.rowData.source_id
            reqData.version = this.rowData.version
            console.log(reqData)
            updateShuiyuandi(this.rowData.source_id, reqData).then(res => {
              this.searchClick()
              this.visible = false
              this.$refs.form2.clearValidate()
              this.$message.success('修改水源地成功!')
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
