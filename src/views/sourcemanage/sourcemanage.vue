<template>
  <div>
    <a-row :gutter="8">
      <a-col :span="24">
        <a-card
          :bordered="false"
          :bodyStyle="{padding:'6px 24px 0px 0px'}">
          <a-form
            :form="form"
            :style="{'margin-top':'16px'}">
            <a-row>
              <a-col :span="8">
                <a-form-item
                  label="污染源名称:"
                  :label-col="{span:9}"
                  :wrapper-col="{span:15}">
                  <a-input></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="污染源类型:"
                  :label-col="{span:9}"
                  :wrapper-col="{span:15}">
                  <a-select
                    placeholder="全部"
                    @change="cjjgChange"
                    style="width: 100%;">
                    <a-select-option value="1">工业污染源</a-select-option>
                    <a-select-option value="5">农业污染源</a-select-option>
                    <a-select-option value="10">城镇污染源</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col
                :span="5"
                :offset="3"
                style="text-align:right;">
                <a-form-item
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
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
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
                showPagination="true">
                <span
                  slot="serial"
                  slot-scope="text, record, index">
                  {{ index + 1 }}
                </span>
                <span
                  slot="status"
                  slot-scope="text">
                  <a-badge
                    :status="text | statusTypeFilter"
                    :text="text | statusFilter" />
                </span>
                <span
                  slot="name"
                  slot-scope="text, record">
                  <a @click="goTo(record)">{{ text }}</a>
                </span>

                <span
                  slot="action"
                  slot-scope="text, record, index">
                  <template>
                    <a
                      @click="() => {}"
                      v-show="record.publish !== '1'"
                      v-html="'&emsp;发布'"></a>
                    <span
                      style="font-size: 14px"
                      v-show="record.publish === '1'">已发布</span>
                    <a-divider type="vertical" />
                    <a @click="handleEditOrNew(record)">编辑</a>
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
      title="新增污染源"
      width="60%"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-spin :spinning="confirmLoading">
        <a-form-model
          ref="form"
          :model="form"
          labelAlign="left"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-model-item label="污染源名称" prop="name" ref="name">
                <a-input v-model="form.name"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="污染源编码" prop="code" ref="code">
                <a-input v-model="form.code"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="所属河道" prop="suoshuhedao" ref="suoshuhedao">
                <a-select v-model="form.suoshuhedao" placeholder="请选择">
                  <a-select-option value="0">长江</a-select-option>
                  <a-select-option value="1">秦淮河</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="所属区域" prop="suoshuquyu" ref="suoshuquyu">
                <a-select v-model="form.suoshuquyu" placeholder="请选择">
                  <a-select-option value="0">南京</a-select-option>
                  <a-select-option value="1">苏州</a-select-option>
                  <a-select-option value="2">无锡</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="详细地址" prop="address" ref="address">
                <a-input v-model="form.address"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="污染源类型" prop="wuranyuantype" ref="wuranyuantype">
                <a-select v-model="form.wuranyuantype" placeholder="请选择">
                  <a-select-option value="0">工业污染源</a-select-option>
                  <a-select-option value="1">农业污染源</a-select-option>
                  <a-select-option value="2">城镇污染源</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="经纬度" prop="jwd" ref="jwd">
                <a-input v-model="form.jwd" disabled>
                  <a-icon @click="showMap" slot="addonAfter" type="search" :style="{ color: '#0D7DD9' }" />
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="关注类别" prop="guanzhujibie" ref="guanzhujibie">
                <a-select v-model="form.guanzhujibie" placeholder="全部">
                  <a-select-option value="0">省级</a-select-option>
                  <a-select-option value="1">市级</a-select-option>
                  <a-select-option value="2">区级</a-select-option>
                  <a-select-option value="3">县级</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="发现时间" prop="time" ref="time">
                <a-date-picker style="width:100%;" type="date" v-model="form.time" placeholder="请选择时间"></a-date-picker>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="所属河长" prop="sshezhang" ref="sshezhang">
                <a-input v-model="form.sshezhang"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="影响范围" prop="yxfanwei" ref="yxfanwei">
                <a-input v-model="form.yxfanwei"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="治理情况" prop="zhiliqk" ref="zhiliqk">
                <a-input v-model="form.zhiliqk"></a-input>
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
          "
        >取消</a-button
        >
        <a-button type="primary" @click="savePopup">保存</a-button>
      </template>
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
import mapboxgl from 'mapbox-gl'
// import { getSourceList } from '@/api/task' // 接口调用
export default {
  components: {
    STable
  },
  data () {
    return {
      cardHeight: window.innerHeight - 207,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      confirmLoading: false,
      form: {
        name: '',
        code: '',
        suoshuhedao: '',
        suoshuquyu: '',
        address: '',
        wuranyuantype: '',
        jwd: '',
        guanzhujibie: '',
        time: '',
        sshezhang: '',
        yxfanwei: '',
        zhiliqk: ''
      },
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
      // form: this.$form.createForm(this),
      // form2: this.$form.createForm(this),
      visible: false,
      handleCancelMap: false,
      sureBtnShow: true,
      jindu: '',
      weidu: '',
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '区域',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '污染源名称',
          dataIndex: 'site'
        },
        {
          title: '位置',
          dataIndex: 'principal'
        },
        {
          title: '经纬度',
          dataIndex: 'person'
        },
        {
          title: '污染源类型',
          dataIndex: 'create_at'
          // sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '160px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
        // alert('123')
        return [{ name: 'sss' }]
        // return getTasks(Object.assign(parameter, this.queryParam))
        //   .then(res => {
        //     return res.data
        //   })
      }
    }
  },
  created () {

  },
  methods: {
    // 污染源类型触发
    cjjgChange () {

    },
    // 查询按钮触发
    searchClick () {

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
        this.form2.setFieldsValue({ startjwd: a + ',' + b })
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
    // 新增按钮触发
    gcAddClick () {
      this.visible = true
    },
    savePopup () {
      this.$refs.form.validate(err => {
        if (!err) {

        }
      })
    },
    handleCancelAdd () {
      this.visible = false
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
