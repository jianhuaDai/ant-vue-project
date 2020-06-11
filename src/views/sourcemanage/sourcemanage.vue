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
                <a-form-model-item label="污染源名称:" prop="namesearch">
                  <a-input v-model="form.namesearch"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="8">
                <a-form-model-item label="污染源类型:" prop="wrytype">
                  <a-select v-model="form.wrytype" placeholder="全部" allowClear>
                    <a-select-option value="1">工业污染源</a-select-option>
                    <a-select-option value="2">农业污染源</a-select-option>
                    <a-select-option value="3">城镇污染源</a-select-option>
                  </a-select>
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
    <!-- 新增污染源 -->
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
          labelAlign="left"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol">
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-model-item
                label="污染源名称"
                prop="name"
                ref="name">
                <a-input v-model="form2.name"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="污染源编码"
                prop="code"
                ref="code">
                <a-input v-model="form2.code"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="所属河道"
                prop="suoshuhedao"
                ref="suoshuhedao">
                <a-select
                  placeholder="全部"
                  v-model="form2.suoshuhedao">
                  <a-select-option
                    v-for="item in suoshuhedaovalue"
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
                prop="suoshuquyu"
                ref="suoshuquyu">
                <a-tree-select v-model="form2.suoshuquyu" :treeData="options"> </a-tree-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="详细地址"
                prop="address"
                ref="address">
                <a-input v-model="form2.address"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="污染源类型"
                prop="wuranyuantype"
                ref="wuranyuantype">
                <dictionary-select
                  v-model="form2.wuranyuantype"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.POLLUTION_TYPE"
                >
                </dictionary-select>
                <!-- <a-select
                  placeholder="全部"
                  v-model="form2.wuranyuantype">
                  <a-select-option
                    v-for="item in wuranyuantypevalue"
                    :key="item.key"
                    :value="item.key">
                    {{ item.name }}
                  </a-select-option>
                </a-select>-->
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="经纬度"
                prop="jwd"
                ref="jwd">
                <a-input v-model="form2.jwd">
                  <a-icon @click="showMap" slot="addonAfter" type="environment" :style="{ color: '#0D7DD9' }" />
                  <!-- <a-icon type="environment" /> -->
                </a-input>
                <!-- <mapInput
                  v-model="form2.location"
                  v-if="visible"></mapInput> -->
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="关注类别"
                prop="guanzhujibie"
                ref="guanzhujibie">
                <dictionary-select
                  v-model="form2.guanzhujibie"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.ATTENTION_LEVEL"
                >
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="发现时间"
                prop="time"
                ref="time">
                <!-- <a-date-picker
                  style="width:100%;"
                  type="date"
                  v-model="form2.time"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-dd"
                  placeholder="请选择时间"></a-date-picker> -->
                <a-date-picker
                  style="width:100%;"
                  type="date"
                  @change="dateChange"
                  placeholder="请选择时间"></a-date-picker>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="所属河长"
                prop="sshezhang"
                ref="sshezhang">
                <a-input v-model="form2.sshezhang" disabled></a-input>
                <!-- <a-select
                  placeholder="全部"
                  v-model="form2.sshezhang">
                  <a-select-option
                    v-for="item in sshezhangvalue"
                    :key="item.key"
                    :value="item.key">
                    {{ item.name }}
                  </a-select-option> -->
                <!-- </a-select> -->
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="影响范围"
                prop="yxfanwei"
                ref="yxfanwei">
                <a-input v-model="form2.yxfanwei"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="治理情况"
                prop="zhiliqk"
                ref="zhiliqk">
                <a-input v-model="form2.zhiliqk"></a-input>
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
    <!-- 污染源删除 -->
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
import { getSourceList, getRiverlakeList, addSource, updateSource, delSource } from '@/api/sourcemanage'
import { treeData } from '@/config/areaTreeSelectData'
import moment from 'moment'
import uploadSingleImg from '@/components/Hczy/Upload/uploadSingleImg.vue'
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
    'form2.suoshuhedao' (value, oldvalue) {
      console.log(value)
      console.log(this.suoshuhedaovalue)
      console.log(this.hezhanFlag)
      console.log(this.hezhanFlag.data.list.length)
      for (var k = 0; k < this.hezhanFlag.data.list.length; k++) {
        if (this.hezhanFlag.data.list[k].water_id === value) {
          this.form2.sshezhang = this.hezhanFlag.data.list[k].chief_name
        }
      }
    }
  },
  data () {
    return {
      title: '新增污染源',
      cardHeight: window.innerHeight - 207,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      confirmLoading: false,
      options: treeData,
      form: {
        namesearch: '',
        wrytype: undefined
      },
      time: '',
      form2: {
        name: '',
        code: '',
        suoshuhedao: undefined,
        suoshuquyu: undefined,
        address: '',
        wuranyuantype: undefined,
        location: '',
        guanzhujibie: undefined,
        // time: '',
        sshezhang: '',
        yxfanwei: '',
        zhiliqk: ''
      },
      hezhanFlag: {},
      rules: {
        name: [
          { required: true, message: '污染源名称不能为空', trigger: 'blur' }
        ],
        suoshuhedao: [
          { required: true, message: '所属河道不能为空', trigger: 'blur' }
        ],
        suoshuquyu: [
          { required: true, message: '所属区域不能为空', trigger: 'blur' }
        ],
        wuranyuantype: [
          { required: true, message: '污染源类型不能为空', trigger: 'blur' }
        ],
        jwd: [
          { required: true, message: '经纬度不能为空', trigger: 'blur' }
        ]
      },
      // 污染源类型
      wrytypevalue: [
        {
          value: '1',
          name: '工业污染源'
        },
        {
          value: '2',
          name: '农业污染源'
        }, {
          value: '3',
          name: '城镇污染源'
        }
      ],
      // 所属河道
      suoshuhedaovalue: [],
      // 所属河长
      sshezhangvalue: [],
      // 所属区域
      suoshuquyuvalue: [
      ],
      // 污染源类型
      wuranyuantypevalue: [
        {
          key: '1',
          name: '工业污染源'
        },
        {
          key: '2',
          name: '农业污染源'
        },
        {
          key: '3',
          name: '城镇污染源'
        }
      ],
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
      rowData: {},
      addmodifyflag: '1',
      visibledel: false,
      handleCancelMap: false,
      sureBtnShow: true,
      jindu: '',
      weidu: '',
      columns: [
        // {
        //   title: '序号',
        //   scopedSlots: { customRender: 'serial' }
        // },
        {
          title: '区域',
          dataIndex: 'regionalism_name'
        },
        {
          title: '污染源名称',
          dataIndex: 'pollution_name'
        },
        {
          title: '位置',
          dataIndex: 'location'
        },
        {
          title: '经纬度',
          dataIndex: 'lon_lat'
        },
        {
          title: '污染源类型',
          dataIndex: 'pollution_type_name'
          // sorter: true
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
        pollution_type: 0,
        status: 1
      },
      loadData: parameter => {
        // alert('123')
        return getSourceList(Object.assign(parameter, this.queryParam)).then(res => {
          console.log(res)
          return res.data
        })
      }
    }
  },
  created () {
    getRiverlakeList().then(res => {
      console.log(res)
      this.hezhanFlag = res
      for (var i = 0; i < res.data.list.length; i++) {
        this.suoshuhedaovalue.push(
          {
            key: res.data.list[i].water_id,
            name: res.data.list[i].name
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
    // 水源地删除
    handleDel (value) {
      console.log(value)
      this.rowData = value.pollution_id
      this.visibledel = true
    },
    handleOk () {
      delSource(this.rowData).then((res) => {
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
      this.queryParam.name = this.form.namesearch
      this.queryParam.pollution_type = this.form.wrytype === '' ? 0 : parseInt(this.form.wrytype)
      this.$refs.table.refresh(true)
    },
    // 重置按钮触发
    resertClick () {

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
        this.form2.jwd = a + ',' + b
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
      console.log(this.form2)
      this.rowData = this.form2
      if (this.form2.pollution_id) {
        this.addmodifyflag = '2'
        this.title = '修改污染源信息'
        this.setFormValue(this.form2)
      } else {
        this.addmodifyflag = '1'
        this.title = '新增污染源信息'
      }
      setTimeout(() => {
        this.$refs.form2.clearValidate()
      }, 1)
    },
    setFormValue (data) {
      this.$set(this.form2, 'name', data.pollution_name)
      this.$set(this.form2, 'code', data.pollution_num)
      this.$set(this.form2, 'suoshuhedao', data.water_id.toString())
      this.$set(this.form2, 'suoshuquyu', data.regionalism_id)
      this.$set(this.form2, 'address', data.location)
      this.$set(this.form2, 'wuranyuantype', data.pollution_type)
      this.$set(this.form2, 'jwd', data.lon_lat[0])
      this.$set(this.form2, 'guanzhujibie', data.attention_level)
      this.$set(this.form2, 'yxfanwei', data.range)
      this.$set(this.form2, 'zhiliqk', data.control)
      this.$set(this.form2, 'image_url', data.image_url)

      // this.form2.name = data.pollution_name
      // this.form2.code = data.pollution_id
      // this.form2.suoshuhedao = data.water_id
      // this.form2.suoshuquyu = data.regionalism_id
      // this.form2.address = data.location
      // this.form2.wuranyuantype = data.pollution_type.toString()
      // this.form2.jwd = data.lon_lat
      // this.form2.guanzhujibie = data.attention_level.toString()
      // this.form2.time = new Date(data.discover_time)
      // this.form2.yxfanwei = data.range
      // this.form2.zhiliqk = data.control
      // this.form2.image_url = data.image_url
    },
    savePopup () {
      console.log(this.form2.time)
      this.$refs.form2.validate(err => {
        if (err) {
          var reqData = {
            pollution_name: this.form2.name,
            pollution_num: this.form2.code === undefined ? '' : this.form2.code,
            water_id: this.form2.suoshuhedao,
            regionalism_id: this.form2.suoshuquyu,
            location: this.form2.address === undefined ? '' : this.form2.address,
            pollution_type: parseInt(this.form2.wuranyuantype),
            lon_lat: [this.form2.jwd],
            attention_level: parseInt(this.form2.guanzhujibie),
            // discover_time: this.form2.time.format('YYYY-MM-DD'),
            // discover_time: this.time,
            range: this.form2.yxfanwei === undefined ? '' : this.form2.yxfanwei,
            control: this.form2.zhiliqk === undefined ? '' : this.form2.zhiliqk,
            image_url: this.form2.image_url === undefined ? [] : this.form2.image_url
          }
          console.log(reqData)
          if (this.addmodifyflag === '1') {
            addSource(reqData).then(res => {
              this.searchClick()
              this.visible = false
              this.$refs.form2.clearValidate()
              this.$message.success('新增污染源成功!')
            })
          } else if (this.addmodifyflag === '2') {
            reqData.pollution_id = this.rowData.pollution_id
            reqData.version = this.rowData.version
            console.log(reqData)
            updateSource(this.rowData.pollution_id, reqData).then(res => {
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
