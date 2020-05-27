<template>
  <div>
    <a-row :gutter="8">
      <a-col :span="6">
        <a-card
          title="区域数据"
          :style="{height:leftTreeHeight + 'px'}"
          :bodyStyle="{padding:'10px 10px 10px 10px'}">
          <div
            style="border:0px solid #ddd; overflow:auto;"
            :style="{height:treeHeight+'px'}"
            class="tree-scroll">
            <a-tree
              :treeData="treeData"
              @select="onSelecttree" />
          </div>
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
                      <a-input v-decorator="['name']"></a-input>
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item
                      label="河湖类型:"
                      :label-col="{span:9}"
                      :wrapper-col="{span:15}">
                      <a-select
                        placeholder="全部"
                        @change="hehutypeSelectClick"
                        allowClear
                        v-decorator="['type']">
                        <a-select-option value="river">河道</a-select-option>
                        <a-select-option value="river_reach">河段</a-select-option>
                        <a-select-option value="lake">湖泊</a-select-option>
                        <a-select-option value="reservoir">水库</a-select-option>
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
      title="河湖新增"
      :visible="visible"
      width="60%"
      @ok="handleOk"
      @cancel="handleCancelDel"
      footer>
      <a-form :form="form2">
        <a-row :gutter="8">
          <a-col :span="12">
            <a-form-item
              label="河湖库名称:"
              :label-col="{span:8}"
              :wrapper-col="{span:16}">
              <a-input v-decorator="['name',{ rules: [{ required: true,message:'河湖库名称不能为空' }] }]"></a-input>
            </a-form-item>
          </a-col>
          <!-- <span style="float:left;margin-bottom:-50px;padding-right:-150px;">*</span> -->
          <a-col :span="12">
            <a-form-item
              label="河湖类型:"
              :label-col="{span:8}"
              :wrapper-col="{span:16}">
              <a-select
                placeholder="全部"
                @change="selectChangeadd"
                v-model="hehutypevalue">
                <a-select-option value="0">河流</a-select-option>
                <a-select-option value="1">河段</a-select-option>
                <a-select-option value="2">湖泊</a-select-option>
                <a-select-option value="3">湖泊片</a-select-option>
                <a-select-option value="4">水库</a-select-option>
                <a-select-option value="5">水库片</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="河湖库编码:"
              :label-col="{span:8}"
              :wrapper-col="{span:16}">
              <a-input v-decorator="['code',{ rules: [{required: true,message: '河湖库编码不能为空'}]}]"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="河湖库层级:"
              :label-col="{span:8}"
              :wrapper-col="{span:16}">
              <a-select
                placeholder="全部"
                v-decorator="['hehucengji',{ rules: [{required: true,message: '河湖库层级不能为空'}]}]">
                <a-select-option value="省级">省级</a-select-option>
                <a-select-option value="市级">市级</a-select-option>
                <a-select-option value="县级">县级</a-select-option>
                <a-select-option value="乡级">乡级</a-select-option>
                <a-select-option value="村级">村级</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="河湖长:"
              :label-col="{span:8}"
              :wrapper-col="{span:16}">
              <a-select
                placeholder="全部"
                v-decorator="['hehuzhang',{ rules: [{required: true,message: '河湖长不能为空'}]}]">
                <a-select-option value="省级">省级</a-select-option>
                <a-select-option value="市级">市级</a-select-option>
                <a-select-option value="县级">县级</a-select-option>
                <a-select-option value="乡级">乡级</a-select-option>
                <a-select-option value="村级">村级</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="上级河湖库:"
              :label-col="{span:8}"
              :wrapper-col="{span:16}">
              <a-input v-decorator="['sjhehuku']"></a-input>
            </a-form-item>
          </a-col>
          <!-- 河流信息-----开始 -->
          <div v-show="heliuShow">
            <a-col :span="12">
              <a-form-item
                label="河流长度:"
                :label-col="{span:8}"
                :wrapper-col="{span:16}">
                <a-input v-decorator="['length']"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="河流级别:"
                :label-col="{span:8}"
                :wrapper-col="{span:16}">
                <a-select
                  placeholder="全部"
                  v-decorator="['heliujibie',{ rules: [{required: true,message: '河流级别不能为空'}]}]">
                  <a-select-option value="干河流">干河流</a-select-option>
                  <a-select-option value="一级">一级</a-select-option>
                  <a-select-option value="二级">二级</a-select-option>
                  <a-select-option value="三级">三级</a-select-option>
                  <a-select-option value="四级">四级</a-select-option>
                  <a-select-option value="五级">五级</a-select-option>
                  <a-select-option value="六级">六级</a-select-option>
                  <a-select-option value="七级">七级</a-select-option>
                  <a-select-option value="八级">八级</a-select-option>
                  <a-select-option value="未定级别">未定级别</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="起点:"
                :label-col="{span:8}"
                :wrapper-col="{span:16}">
                <a-input v-decorator="['start']"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="终点:"
                :label-col="{span:8}"
                :wrapper-col="{span:16}">
                <a-input v-decorator="['end']"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="9">
              <a-form-item
                label="起点经纬度:"
                :label-col="{span:11}"
                :wrapper-col="{span:13}">
                <a-input
                  v-decorator="['startjwd']"
                  disabled></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="3">
              <a-form-item
                label
                :label-col="{ span: 0 }"
                :wrapper-col="{ span: 14 }">
                <a-button
                  @click="getMapPoint1"
                  style="margin-left:16px;">点击地图获取</a-button>
              </a-form-item>
            </a-col>
            <a-col :span="9">
              <a-form-item
                label="终点经纬度:"
                :label-col="{span:11}"
                :wrapper-col="{span:13}">
                <a-input
                  v-decorator="['endjwd']"
                  disabled></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="3">
              <a-form-item
                label
                :label-col="{ span: 0 }"
                :wrapper-col="{ span: 10 }">
                <a-button
                  @click="getMapPoint2"
                  style="margin-left:16px;">点击地图获取</a-button>
              </a-form-item>
            </a-col>
          </div>
          <!-- 河流信息-----结束 -->
          <!-- 河段信息-----开始 -->
          <div v-show="heduanShow">
            <a-col :span="12">
              <a-form-item
                label="河段长度:"
                :label-col="{span:8}"
                :wrapper-col="{span:16}">
                <a-input v-decorator="['length2']"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="河段级别:"
                :label-col="{span:8}"
                :wrapper-col="{span:16}">
                <a-select
                  placeholder="全部"
                  v-decorator="['heduanjibie']">
                  <a-select-option value="1">国家级</a-select-option>
                  <a-select-option value="2">自治区级</a-select-option>
                  <a-select-option value="3">市级</a-select-option>
                  <a-select-option value="4">县级</a-select-option>
                  <a-select-option value="5">乡镇级</a-select-option>
                  <a-select-option value="6">村级</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="行政区划:"
                :label-col="{span:8}"
                :wrapper-col="{span:16}">
                <a-input v-decorator="['xzqh']"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="位置:"
                :label-col="{span:8}"
                :wrapper-col="{span:16}">
                <a-input v-decorator="['weizhi']"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="起点:"
                :label-col="{span:8}"
                :wrapper-col="{span:16}">
                <a-input v-decorator="['start2']"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="终点:"
                :label-col="{span:8}"
                :wrapper-col="{span:16}">
                <a-input v-decorator="['end2']"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="9">
              <a-form-item
                label="起点经纬度:"
                :label-col="{span:11}"
                :wrapper-col="{span:13}">
                <a-input
                  v-decorator="['startjwd2']"
                  disabled></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="3">
              <a-form-item
                label
                :label-col="{ span: 0 }"
                :wrapper-col="{ span: 14 }">
                <a-button
                  @click="getMapPoint3"
                  style="margin-left:16px;">点击地图获取</a-button>
              </a-form-item>
            </a-col>
            <a-col :span="9">
              <a-form-item
                label="终点经纬度:"
                :label-col="{span:11}"
                :wrapper-col="{span:13}">
                <a-input
                  v-decorator="['endjwd2']"
                  disabled></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="3">
              <a-form-item
                label
                :label-col="{ span: 0 }"
                :wrapper-col="{ span: 14 }">
                <a-button
                  @click="getMapPoint4"
                  style="margin-left:16px;">点击地图获取</a-button>
              </a-form-item>
            </a-col>
          </div>
          <!-- 河段信息-----结束 -->
          <!-- 湖泊信息-----开始 -->
          <div v-show="hupoShow">
            <a-col :span="12">
              <a-form-item
                label="位置:"
                :label-col="{span:8}"
                :wrapper-col="{span:16}">
                <a-input v-decorator="['weizhihupo']"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="面积:"
                :label-col="{span:8}"
                :wrapper-col="{span:16}">
                <a-input v-decorator="['mianjihupo']"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="咸淡水属性:"
                :label-col="{span:8}"
                :wrapper-col="{span:16}">
                <a-select
                  placeholder="全部"
                  v-decorator="['xdsshuxing']">
                  <a-select-option value="1">咸水</a-select-option>
                  <a-select-option value="2">淡水</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </div>
          <!-- 湖泊信息-----结束 -->
          <!-- 湖泊片信息---开始 -->
          <div v-show="hupopianShow">
            <a-col :span="12">
              <a-form-item
                label="位置:"
                :label-col="{span:8}"
                :wrapper-col="{span:16}">
                <a-input v-decorator="['weizhihupopian']"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="面积:"
                :label-col="{span:8}"
                :wrapper-col="{span:16}">
                <a-input v-decorator="['mianjihupopian']"></a-input>
              </a-form-item>
            </a-col>
          </div>
          <!-- 湖泊片信息---结束 -->
          <!-- 水库信息-----开始 -->
          <div v-show="shuikuShow">
            <a-col :span="12">
              <a-form-item
                label="位置:"
                :label-col="{span:8}"
                :wrapper-col="{span:16}">
                <a-input v-decorator="['weizhishuiku']"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="管理单位名称:"
                :label-col="{span:8}"
                :wrapper-col="{span:16}">
                <a-input v-decorator="['gldwname']"></a-input>
              </a-form-item>
            </a-col>
          </div>
          <!-- 水库信息-----结束 -->
          <!-- 水库片信息---开始 -->
          <div v-show="shuikupianShow">
            <a-col :span="12">
              <a-form-item
                label="位置:"
                :label-col="{span:8}"
                :wrapper-col="{span:16}">
                <a-input v-decorator="['weizhishuikupian']"></a-input>
              </a-form-item>
            </a-col>
          </div>
          <!-- 水库片信息---结束 -->
        </a-row>
      </a-form>
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
// import { Scene, Zoom, Scale, PointLayer, PolygonLayer } from '@antv/l7'
import { Scene, Scale, PointLayer, LineLayer, PolygonLayer, MarkerLayer, Marker } from '@antv/l7'
import { Mapbox } from '@antv/l7-maps'
export default {
  components: {
    STable
  },
  data () {
    return {
      heliuShow: true,
      heduanShow: false,
      hupoShow: false,
      hupopianShow: false,
      shuikuShow: false,
      shuikupianShow: false,
      treeHeight: window.innerHeight - 205,
      tableHeight: window.innerHeight - 420,
      listHeight: window.innerHeight - 225,
      leftTreeHeight: window.innerHeight - 115,
      visible: false,
      accessToken:
        'pk.eyJ1IjoibWFvcmV5IiwiYSI6ImNqNWhrenIwcDFvbXUyd3I2bTJxYzZ4em8ifQ.KHZIehQuWW9AsMaGtATdwA',
      style: '',
      handleCancelMap: false,
      sureBtnShow: true,
      hehutypevalue: '0',
      center: [118.806266, 32.059868],
      zoom: 12,
      pitch: 0,
      // bearing: -17.6,
      bearing: 0,
      container: 'add-map',
      antialias: true,
      attributionControl: false, // 隐藏地图所属信息
      doubleClickZoom: false,
      form: this.$form.createForm(this),
      form2: this.$form.createForm(this),
      treeData: [
        { id: 1,
          pId: 0,
          value: '1',
          title: '江苏省',
          children: [
            {
              id: '2',
              pId: '0',
              value: '2',
              title: '南京市'
            },
            {
              id: '3',
              pId: '0',
              value: '3',
              title: '苏州市'
            }, {
              id: '4',
              pId: '0',
              value: '4',
              title: '常州市'
            }
          ] }
      ],
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
    // 左侧树形触发
    onSelecttree () {

    },
    // 河湖类型--查询
    hehutypeSelectClick (value) {
    },
    // 新增按钮触发
    gcAddClick () {
      this.visible = true
    },
    // 河湖类型选择触发
    selectChangeadd (value) {
      if (value === '0') {
        this.heliuShow = true
        this.heduanShow = false
        this.hupoShow = false
        this.hupopianShow = false
        this.shuikuShow = false
        this.shuikupianShow = false
      } else if (value === '1') {
        this.heliuShow = false
        this.heduanShow = true
        this.hupoShow = false
        this.hupopianShow = false
        this.shuikuShow = false
        this.shuikupianShow = false
      } else if (value === '2') {
        this.heliuShow = false
        this.heduanShow = false
        this.hupoShow = true
        this.hupopianShow = false
        this.shuikuShow = false
        this.shuikupianShow = false
      } else if (value === '3') {
        this.heliuShow = false
        this.heduanShow = false
        this.hupoShow = false
        this.hupopianShow = true
        this.shuikuShow = false
        this.shuikupianShow = false
      } else if (value === '4') {
        this.heliuShow = false
        this.heduanShow = false
        this.hupoShow = false
        this.hupopianShow = false
        this.shuikuShow = true
        this.shuikupianShow = false
      } else if (value === '5') {
        this.heliuShow = false
        this.heduanShow = false
        this.hupoShow = false
        this.hupopianShow = false
        this.shuikuShow = false
        this.shuikupianShow = true
      }
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
      // console.log(e.lngLat.lng, e.lngLat.lat);
      // console.log(this.form2);
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

      // console.log(this.heliujindu1)
      // console.log(this.heliuweidu1)
      this.sureBtnShow = false
      // console.log(a);
      // console.log(b);
      // this.form2.setFields({ start: "123" });

      // this.pointValue = e.lngLat.lng.toString() + "," + e.lngLat.lat.toString();
      // this.pointValue = e.lngLat.lng.toString();
      // this.handleCancelMap = false;
      // this.form.setFieldsValue({
      //   start: e.lngLat.lng.toString(),
      // })
    },
    getScene () {
      return this.scene
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
