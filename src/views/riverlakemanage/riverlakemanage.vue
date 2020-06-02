<template>
  <div>
    <a-row :gutter="8">
      <a-col :span="6">
        <a-card
          title="区域数据"
          :style="{height:leftTreeHeight + 'px'}"
          :bodyStyle="{padding:'10px 10px 10px 10px'}">
          <!-- <div
            style="border:0px solid #ddd; overflow:auto;"
            :style="{height:treeHeight+'px'}"
            class="tree-scroll">
            <a-tree
              :treeData="treeData"
              @select="onSelecttree" />
          </div> -->
          <AreaTree @sendSelectNode="getSelectNode"></AreaTree>
        </a-card>
      </a-col>
      <a-col :span="18">
        <a-row :gutter="8">
          <a-col :span="24">
            <a-card :bodyStyle="{padding:'10px 20px 10px 10px'}">
              <a-form
                :form="form"
                :style="{'margin-top':'16px'}">
                <a-row>
                  <a-col :span="8">
                    <a-form-item
                      label="河湖名称:"
                      :label-col="{span:9}"
                      :wrapper-col="{span:15}">
                      <a-input v-model="form.name"></a-input>
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item
                      label="河湖类型:"
                      :label-col="{span:9}"
                      :wrapper-col="{span:15}">
                      <!-- <a-select
                        placeholder="全部"
                        @change="hehutypeSelectClick"
                        allowClear
                        v-decorator="['type']">
                        <a-select-option value="river">河道</a-select-option>
                        <a-select-option value="river_reach">河段</a-select-option>
                        <a-select-option value="lake">湖泊</a-select-option>
                        <a-select-option value="reservoir">水库</a-select-option>
                      </a-select> -->
                      <a-select placeholder="全部" v-model="form.type" @change="hehutypeSelectClick">
                        <a-select-option v-for="item in hhtypevalue" :key="item.key" :value="item.key">
                          {{ item.name }}
                        </a-select-option>
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
              title="查询列表:"
              :bodyStyle="{padding:'16px'}"
              :style="{height: listHeight + 'px'}">
              <a-button
                slot="extra"
                type="primary"
                icon="plus"
                @click="gcAddClick">新增</a-button>
              <a-button
                slot="extra"
                style="margin-left:8px;"
                type="primary">打印</a-button>
              <a-button
                slot="extra"
                style="margin-left:8px;"
                type="primary">导入</a-button>
              <a-col :span="24">
                <!-- <a-table
                  :dataSource="data"
                  :pagination="false"
                  :scroll="{x:860,y:tableHeight }"
                  :columns="columns">
                  <template
                    slot="action"
                    slot-scope="text, record">
                    <span class="btnGroup1">
                      <a-button
                        size="small"
                        class="modifyClass"
                        @click="modifyRow(record)">修改</a-button>&nbsp;
                      <a-button
                        size="small"
                        class="delClass"
                        @click="deleteRow(record)">删除</a-button>&nbsp;
                    </span>
                  </template>
                </a-table> -->
                <s-table
                  ref="table"
                  size="default"
                  :rowKey="record => record.id"
                  :columns="columns"
                  :data="loadData"
                  showPagination="true">
                  <!-- <span
                    slot="serial"
                    slot-scope="text, record, index">
                    {{ index + 1 }}
                  </span> -->
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
              <!-- <a-col
                :span="24"
                style="text-align:right;margin-top:10px;">
                <a-pagination
                  showQuickJumper
                  :defaultCurrent="1"
                  :total="10"
                  :pageSizeOptions="pageSizeOptions"
                  showSizeChanger />
              </a-col> -->
            </a-card>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <!-- 河湖新增 -->
    <a-modal
      :title="title"
      :visible="visible"
      width="60%"
      @ok="handleOk"
      @cancel="handleCancelDel">

      <a-spin :spinning="confirmLoading">
        <a-form-model
          ref="form"
          :model="form2"
          labelAlign="left"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-model-item label="河湖库名称" prop="name" ref="name">
                <a-input v-model="form2.name"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="河湖类型" prop="hehutypevalue" ref="hehutypevalue">
                <a-select placeholder="全部" v-model="form2.hehutype" @change="selectChangeadd">
                  <a-select-option v-for="item in typevalue" :key="item.key" :value="item.key">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="河湖库编码" prop="code" ref="code">
                <a-input v-model="form2.code"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="河湖库层级" prop="hehucengji" ref="hehucengji">
                <a-select placeholder="全部" v-model="form2.hehucengji">
                  <a-select-option v-for="item in cengjivalue" :key="item.key" :value="item.key">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="河湖长" prop="hehuzhang" ref="hehuzhang">
                <a-select placeholder="全部" v-model="form2.hehuzhang">
                  <a-select-option v-for="item in hehuzhangvalue" :key="item.key" :value="item.key">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="上级河湖库" prop="sjhehuku" ref="sjhehuku">
                <a-input v-model="form2.sjhehuku"></a-input>
              </a-form-model-item>
            </a-col>
            <!-- 河流信息-----开始 -->
            <div v-show="heliuShow">
              <a-col :span="12">
                <a-form-item label="河流长度:" prop="length" ref="length">
                  <a-input v-model="form2.length"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="河流级别:" prop="heliujibie" ref="heliujibie">
                  <a-select placeholder="全部" v-model="form2.heliujibie">
                    <a-select-option v-for="item in heliujibievalue" :key="item.key" :value="item.key">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="起点:" prop="start" ref="start">
                  <a-input v-model="form2.start"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="终点:" prop="end" ref="end">
                  <a-input v-model="form2.end"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="起点经纬度:" prop="startjwd" ref="startjwd">
                  <a-input v-model="form2.startjwd" disabled>
                    <a-icon @click="showMap1" slot="addonAfter" type="search" :style="{ color: '#0D7DD9' }" />
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="终点经纬度:" prop="endjwd" ref="endjwd">
                  <a-input v-model="form2.endjwd" disabled>
                    <a-icon @click="showMap2" slot="addonAfter" type="search" :style="{ color: '#0D7DD9' }" />
                  </a-input>
                </a-form-item>
              </a-col>
            </div>
            <!-- 河流信息-----结束 -->
            <!-- 河段信息-----开始 -->
            <div v-show="heduanShow">
              <a-col :span="12">
                <a-form-item label="河段长度:" prop="length2" ref="length2">
                  <a-input v-model="form2.length2"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="河段级别:" prop="heduanjibie" ref="heduanjibie">
                  <a-select placeholder="全部" v-model="form2.heduanjibie">
                    <a-select-option v-for="item in heduanjibievalue" :key="item.key" :value="item.key">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="行政区划:" prop="xzqh" ref="xzqh">
                  <a-input v-model="form2.xzqh"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="位置:" prop="weizhi" ref="weizhi">
                  <a-input v-model="form2.weizhi"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="起点:" prop="start2" ref="start2">
                  <a-input v-model="form2.start2"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="终点:" prop="end2" ref="end2">
                  <a-input v-model="form2.end2"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="起点经纬度:" prop="" ref="">
                  <a-input v-model="form2.startjwd2" disabled>
                    <a-icon @click="showMap3" slot="addonAfter" type="search" :style="{ color: '#0D7DD9' }" />
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="终点经纬度:" prop="endjwd2" ref="endjwd2">
                  <a-input v-model="form2.endjwd2" disabled>
                    <a-icon @click="showMap4" slot="addonAfter" type="search" :style="{ color: '#0D7DD9' }" />
                  </a-input>
                </a-form-item>
              </a-col>
            </div>
            <!-- 河段信息-----结束 -->
            <!-- 湖泊信息-----开始 -->
            <div v-show="hupoShow">
              <a-col :span="12">
                <a-form-item label="位置:" prop="weizhihupo" ref="weizhihupo">
                  <a-input v-model="form.weizhihupo"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="面积:" prop="mianjihupo" ref="mianjihupo">
                  <a-input v-model="form.mianjihupo"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="咸淡水属性:" prop="xdsshuxing" ref="xdsshuxing">
                  <a-select placeholder="全部" v-model="form2.xdsshuxing">
                    <a-select-option v-for="item in xdsshuxingvalue" :key="item.key" :value="item.key">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </div>
            <!-- 湖泊信息-----结束 -->
            <!-- 湖泊片信息---开始 -->
            <div v-show="hupopianShow">
              <a-col :span="12">
                <a-form-item label="位置:" prop="weizhihupopian" ref="weizhihupopian">
                  <a-input v-model="form.weizhihupopian"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="面积:" prop="mianjihupopian" ref="mianjihupopian">
                  <a-input v-model="form.mianjihupopian"></a-input>
                </a-form-item>
              </a-col>
            </div>
            <!-- 湖泊片信息---结束 -->
            <!-- 水库信息-----开始 -->
            <div v-show="shuikuShow">
              <a-col :span="12">
                <a-form-item label="位置:" prop="weizhishuiku" ref="weizhishuiku">
                  <a-input v-model="form.weizhishuiku"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="管理单位名称:" prop="gldwname" ref="gldwname">
                  <a-input v-model="form.gldwname"></a-input>
                </a-form-item>
              </a-col>
            </div>
            <!-- 水库信息-----结束 -->
            <!-- 水库片信息---开始 -->
            <div v-show="shuikupianShow">
              <a-col :span="12">
                <a-form-item label="位置:" prop="weizhishuikupian" ref="weizhishuikupian">
                  <a-input v-model="form.weizhishuikupian"></a-input>
                </a-form-item>
              </a-col>
            </div>
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
// import mapboxgl from 'mapbox-gl'
// import MapboxLanguage from '@mapbox/mapbox-gl-language'
import { MAPBOX_TOKEN, Style } from '@/components/Hczy/Map/config'
import mapboxgl from 'mapbox-gl'
import { treeData } from './data.js'
import AreaTree from '@com/Hczy/AreaTree.vue'
// import { Scene, Zoom, Scale, PointLayer, PolygonLayer } from '@antv/l7'
// import { Scene, Scale, PointLayer, LineLayer, PolygonLayer, MarkerLayer, Marker } from '@antv/l7'
// import { Mapbox } from '@antv/l7-maps'
export default {
  components: {
    STable,
    AreaTree
  },
  data () {
    return {
      heliuShow: true,
      heduanShow: false,
      hupoShow: false,
      hupopianShow: false,
      shuikuShow: false,
      shuikupianShow: false,
      title: '新建',
      treeHeight: window.innerHeight - 205,
      tableHeight: window.innerHeight - 420,
      listHeight: window.innerHeight - 225,
      leftTreeHeight: window.innerHeight - 115,
      confirmLoading: false,
      visible: false,
      accessToken:
        'pk.eyJ1IjoibWFvcmV5IiwiYSI6ImNqNWhrenIwcDFvbXUyd3I2bTJxYzZ4em8ifQ.KHZIehQuWW9AsMaGtATdwA',
      style: '',
      handleCancelMap: false,
      sureBtnShow: true,
      center: [118.806266, 32.059868],
      zoom: 12,
      pitch: 0,
      // bearing: -17.6,
      bearing: 0,
      container: 'add-map',
      antialias: true,
      attributionControl: false, // 隐藏地图所属信息
      doubleClickZoom: false,
      // form: this.$form.createForm(this),
      // form2: this.$form.createForm(this),
      form: {
        name: '',
        type: ''
      },
      
      rules: {
        name: [
          { required: true, message: '河湖库名称不能为空', trigger: 'blur' }
        ],
        hehutypevalue: [
          { required: true, message: '河湖类型不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '河湖编码不能为空', trigger: 'blur' }
        ],
        hehucengji: [
          { required: true, message: '河湖层级不能为空', trigger: 'blur' }
        ],
        hehuzhang: [
          { required: true, message: '河湖长不能为空', trigger: 'blur' }
        ]
      },
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      treeData: treeData,
      columns: [
        // {
        //   title: '序号',
        //   scopedSlots: { customRender: 'serial' }
        // },
        {
          title: '河湖名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '河湖编号',
          dataIndex: 'site'
        },
        {
          title: '河长名称',
          dataIndex: 'personname'
        },
        {
          title: '起点',
          dataIndex: 'start'
        },
        {
          title: '终点',
          dataIndex: 'end'
          // sorter: true
        },
        {
          title: '类型',
          dataIndex: 'type'
          // sorter: true
        },
        {
          title: '状态',
          dataIndex: 'status'
          // sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '160px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 河湖类型--查询框
      hhtypevalue: [
        {
          value: 'river',
          name: '河道'
        },
        {
          value: 'river_reach',
          name: '河段'
        },
        {
          value: 'lake',
          name: '湖泊'
        },
        {
          value: 'reservoir',
          name: '水库'
        }
      ],
      typevalue: [
        {
          value: '0',
          name: '河流'
        },
        {
          value: '1',
          name: '河段'
        },
        {
          value: '2',
          name: '湖泊'
        },
        {
          value: '3',
          name: '湖泊片'
        },
        {
          value: '4',
          name: '水库'
        },
        {
          value: '5',
          name: '水库片'
        }
      ],
      form2: {
        hehutypevalue: '0'
      },
      cengjivalue: [
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
          name: '县级'
        },
        {
          value: '3',
          name: '乡级'
        },
        {
          value: '4',
          name: '村级'
        }
      ],
      hehuzhangvalue: [
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
          name: '县级'
        },
        {
          value: '3',
          name: '乡级'
        },
        {
          value: '4',
          name: '村级'
        }
      ],
      heliujibievalue: [
        {
          value: '0',
          name: '干河流'
        },
        {
          value: '1',
          name: '一级'
        },
        {
          value: '2',
          name: '二级'
        },
        {
          value: '3',
          name: '三级'
        },
        {
          value: '4',
          name: '三级'
        },
        {
          value: '5',
          name: '五级'
        },
        {
          value: '6',
          name: '六级'
        },
        {
          value: '7',
          name: '七级'
        },
        {
          value: '8',
          name: '八级'
        },
        {
          value: '9',
          name: '未定级别'
        }
      ],
      heduanjibievalue: [
        {
          value: '0',
          name: '国家级'
        },
        {
          value: '1',
          name: '自治区级'
        },
        {
          value: '2',
          name: '市级'
        },
        {
          value: '3',
          name: '县级'
        },
        {
          value: '4',
          name: '乡镇级'
        },
        {
          value: '5',
          name: '村级'
        }
      ],
      xdsshuxingvalue: [
        {
          value: '1',
          name: '咸水'
        },
        {
          value: '2',
          name: '淡水'
        }
      ],
      jinweiduFlag: '1',
      jinweiduFlag2: '1',
      heliujindu1: '',
      heliuweidu1: '',
      heliujindu2: '',
      heliuweidu2: '',
      heduanjindu1: '',
      heduanweidu1: '',
      heduanjindu2: '',
      heduanweidu2: '',
      // 加载表格数据
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
    getSelectNode (node) {},
    // 左侧树形触发
    onSelecttree () {

    },
    // 河湖类型--查询
    hehutypeSelectClick (value) {
    },
    // 新增按钮触发
    gcAddClick (data = {}) {
      this.visible = true
       this.form = { ...{}, ...data }
       console.log(this.form)
      if (this.form.id) {
        this.title = '修改河湖信息'
      } else {
        this.title = '新增河湖信息'
      }
      setTimeout(() => {
        this.$refs.form.clearValidate()
      }, 1)
    },
    // 河湖类型选择触发
    selectChangeadd (value2) {
      console.log(value2)
      alert('123')
      // if (value2 === '0') {
      //   this.heliuShow = true
      //   this.heduanShow = false
      //   this.hupoShow = false
      //   this.hupopianShow = false
      //   this.shuikuShow = false
      //   this.shuikupianShow = false
      // } else if (value2 === '1') {
      //   this.heliuShow = false
      //   this.heduanShow = true
      //   this.hupoShow = false
      //   this.hupopianShow = false
      //   this.shuikuShow = false
      //   this.shuikupianShow = false
      // } else if (value2 === '2') {
      //   this.heliuShow = false
      //   this.heduanShow = false
      //   this.hupoShow = true
      //   this.hupopianShow = false
      //   this.shuikuShow = false
      //   this.shuikupianShow = false
      // } else if (value2 === '3') {
      //   this.heliuShow = false
      //   this.heduanShow = false
      //   this.hupoShow = false
      //   this.hupopianShow = true
      //   this.shuikuShow = false
      //   this.shuikupianShow = false
      // } else if (value2 === '4') {
      //   this.heliuShow = false
      //   this.heduanShow = false
      //   this.hupoShow = false
      //   this.hupopianShow = false
      //   this.shuikuShow = true
      //   this.shuikupianShow = false
      // } else if (value2 === '5') {
      //   this.heliuShow = false
      //   this.heduanShow = false
      //   this.hupoShow = false
      //   this.hupopianShow = false
      //   this.shuikuShow = false
      //   this.shuikupianShow = true
      // }
    },
    // 河流起点经纬度获取
    getMapPoint1 () {
      this.jinweiduFlag = '1'
      this.handleCancelMap = true
      this.sureBtnShow = true
      this.heliujindu1 = ''
      this.heliuweidu1 = ''
      setTimeout(() => {
        this.initMap()
        // this.initLanguage()
      }, 500)
    },
    // 河流终点经纬度获取
    getMapPoint2 () {
      this.jinweiduFlag = '2'
      this.handleCancelMap = true
      this.sureBtnShow = true
      this.heliujindu2 = ''
      this.heliuweidu2 = ''
      setTimeout(() => {
        this.initMap()
        // this.initLanguage()
      }, 500)
    },
    // 河段起点经纬度获取
    getMapPoint3 () {
      this.jinweiduFlag2 = '1'
      this.handleCancelMap = true
      this.sureBtnShow = true
      this.heduanjindu1 = ''
      this.heduanweidu1 = ''
      setTimeout(() => {
        this.initMap()
        // this.initLanguage()
      }, 500)
    },
    // 河段终点经纬度获取
    getMapPoint4 () {
      this.jinweiduFlag2 = '2'
      this.handleCancelMap = true
      this.sureBtnShow = true
      this.heduanjindu2 = ''
      this.heduanweidu2 = ''
      setTimeout(() => {
        this.initMap()
        // this.initLanguage()
      }, 500)
    },
    showMap1 () {

    },
    showMap2 () {

    },
    showMap3 () {

    },
    showMap4 () {

    },
    AddDraw () {
      console.log(this.hehutypevalue)
      this.disabled = false
      if (this.hehutypevalue === '0' && this.jinweiduFlag === '1') {
        if (this.heliujindu1 === '' || this.heliuweidu1 === '') {
          this.$message.info('请点击地图')
        } else {
          var a1 = this.heliujindu1
          var b1 = this.heliuweidu1
          this.form2.setFieldsValue({ startjwd: a1 + ',' + b1 })
          this.handleCancelMap = false
        }
      } else if (this.hehutypevalue === '0' && this.jinweiduFlag === '2') {
        if (this.heliujindu2 === '' || this.heliuweidu2 === '') {
          this.$message.info('请点击地图')
        } else {
          var a2 = this.heliujindu2
          var b2 = this.heliuweidu2
          this.form2.setFieldsValue({ endjwd: a2 + ',' + b2 })
          this.handleCancelMap = false
        }
      } else if (this.hehutypevalue === '1' && this.jinweiduFlag2 === '1') {
        if (this.heduanjindu1 === '' || this.heduanweidu1 === '') {
          this.$message.info('请点击地图')
        } else {
          var a3 = this.heduanjindu1
          var b3 = this.heduanweidu1
          this.form2.setFieldsValue({ startjwd2: a3 + ',' + b3 })
          this.handleCancelMap = false
        }
      } else if (this.hehutypevalue === '1' && this.jinweiduFlag2 === '2') {
        if (this.heduanjindu2 === '' || this.heduanweidu2 === '') {
          this.$message.info('请点击地图')
        } else {
          var a4 = this.heduanjindu2
          var b4 = this.heduanweidu2
          this.form2.setFieldsValue({ endjwd2: a4 + ',' + b4 })
          this.handleCancelMap = false
        }
      }
    },
    cancelAddDraw () {
      this.handleCancelMap = false
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
      // this.scene.addControl(
      //   new Scale({
      //     position: 'bottomleft'
      //   })
      // )
      // this.scene.on('loaded', () => {
      // })
    },
    closeMap (e) {
      console.log(this.hehutypevalue)
      if (this.hehutypevalue === '0' && this.jinweiduFlag === '1') {
        this.heliujindu1 = e.lngLat.lng.toFixed(6)
        this.heliuweidu1 = e.lngLat.lat.toFixed(6)
      } else if (this.hehutypevalue === '0' && this.jinweiduFlag === '2') {
        this.heliujindu2 = e.lngLat.lng.toFixed(6)
        this.heliuweidu2 = e.lngLat.lat.toFixed(6)
      } else if (this.hehutypevalue === '1' && this.jinweiduFlag2 === '1') {
        this.heduanjindu1 = e.lngLat.lng.toFixed(6)
        this.heduanweidu1 = e.lngLat.lat.toFixed(6)
      } else if (this.hehutypevalue === '1' && this.jinweiduFlag2 === '2') {
        this.heduanjindu2 = e.lngLat.lng.toFixed(6)
        this.heduanweidu2 = e.lngLat.lat.toFixed(6)
      }
      this.sureBtnShow = false
    },
    getScene () {
      return this.scene
    },
    // 保存按钮触发
    savePopup () {
     this.$refs.form.validate(err => {
        if (!err) {
          console.log(this.hehutypevalue)
          var reqData = {
            name: this.form2.getFieldValue('name'),
            type: this.hehutypevalue,
            code: this.form2.getFieldValue('code'),
            cengji: this.form2.getFieldValue('hehucengji'),
            hehuzhang: this.form2.getFieldValue('hehuzhang'),
            sjhehuku: this.form2.getFieldValue('sjhehuku')
          }
          if (this.hehutypevalue === '0') {
            reqData.length = this.form2.getFieldValue('length')
            reqData.heliujibie = this.form2.getFieldValue('heliujibie')
            reqData.start = this.form2.getFieldValue('start')
            reqData.end = this.form2.getFieldValue('end')
            reqData.startjwd = this.form2.getFieldValue('startjwd')
            reqData.endjwd = this.form2.getFieldValue('endjwd')
          } else if (this.hehutypevalue === '1') {
            reqData.length2 = this.form2.getFieldValue('length2')
            reqData.heduanjibie = this.form2.getFieldValue('heduanjibie')
            reqData.xzqh = this.form2.getFieldValue('xzqh')
            reqData.weizhi = this.form2.getFieldValue('weizhi')
            reqData.start2 = this.form2.getFieldValue('start2')
            reqData.end2 = this.form2.getFieldValue('end2')
            reqData.startjwd2 = this.form2.getFieldValue('startjwd2')
            reqData.endjwd2 = this.form2.getFieldValue('endjwd2')
          } else if (this.hehutypevalue === '2') {
            reqData.weizhihupo = this.form2.getFieldValue('weizhihupo')
            reqData.mianjihupo = this.form2.getFieldValue('mianjihupo')
            reqData.xdsshuxing = this.form2.getFieldValue('xdsshuxing')
          } else if (this.hehutypevalue === '3') {
            reqData.weizhihupopian = this.form2.getFieldValue('weizhihupopian')
            reqData.mianjihupopian = this.form2.getFieldValue('mianjihupopian')
          } else if (this.hehutypevalue === '4') {
            reqData.weizhishuiku = this.form2.getFieldValue('weizhishuiku')
            reqData.gldwname = this.form2.getFieldValue('gldwname')
          } else if (this.hehutypevalue === '5') {
            reqData.weizhishuikupian = this.form2.getFieldValue('weizhishuikupian')
          }
          console.log(reqData)
          // this.visible = false
          // var reqData = {
          //   name: this.form2.getFieldValue('name2'),
          //   powerType: this.form2.getFieldValue('type2')
          // }
          // console.log(reqData)
          // addStation(reqData).then(res => {
          //   console.log(res)
          //   this.searchClick()
          //   this.form2.resetFields()
          //   this.$message.success('新增发电站成功!')
          // })
        }
      })
    },
    // 取消按钮触发
    handleCancelAdd () {
      this.visible = false
    },
    handleOk () {

    },
    handleCancelDel () {
      this.visible = false
    },
    // 查询按钮触发
    searchClick () {

    },
    // 重置按钮触发
    resertClick () {

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
