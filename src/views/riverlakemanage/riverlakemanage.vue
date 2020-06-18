<template>
  <div>
    <a-row :gutter="8">
      <a-col :span="4">
        <a-card
          title="区域数据"
          :bordered="false"
          :style="{height:leftTreeHeight + 'px'}"
          :bodyStyle="{padding:'10px 10px 10px 10px'}">
          <div :style="{height: areadivHeight + 'px'}">
            <AreaTree @sendSelectNode="getSelectNode"></AreaTree>
          </div>
        </a-card>
      </a-col>
      <a-col :span="20">
        <a-row :gutter="8">
          <a-col :span="24">
            <a-card :bodyStyle="{padding:'10px 24px 10px 24px'}">
              <a-form-model
                :model="form"
                ref="from"
                :style="{'margin-top':'16px'}"
                labelAlign="left"
                :label-col="labelCol"
                :wrapper-col="wrapperCol">
                <a-row>
                  <a-col :span="8">
                    <a-form-model-item
                      label="河湖名称:"
                      prop="namesearch">
                      <a-input v-model="form.namesearch"></a-input>
                    </a-form-model-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-model-item
                      label="河湖类型:"
                      prop="type">
                      <dictionary-select
                        v-model="form.type"
                        :insert-option-all="true"
                        :dictionary-type="DictionaryEnum.WATER_TYPE">
                      </dictionary-select>
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
              title="查询列表:"
              :bodyStyle="{padding:'2px'}"
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
                <s-table
                  ref="table"
                  size="default"
                  :rowKey="record => record.water_id"
                  :columns="columns"
                  :data="loadData"
                  :showPagination="true">
                  <span slot="origin" slot-scope="text">
                    {{ text.length > 0 ? text[0] + ',' + text[1] : '' }}
                  </span>
                  <span slot="destination" slot-scope="text">
                    {{ text.length > 0 ? text[0] + ',' + text[1] : '' }}
                  </span>
                  <template
                    slot="water_type"
                    slot-scope="text, record">
                    <div v-if="record.water_type === 1">
                      <span>河流</span>
                    </div>
                    <div v-if="record.water_type === 2">
                      <span>河段</span>
                    </div>
                    <div v-if="record.water_type === 3">
                      <span>湖泊</span>
                    </div>
                    <div v-if="record.water_type === 4">
                      <span>湖泊片</span>
                    </div>
                    <div v-if="record.water_type === 5">
                      <span>水库</span>
                    </div>
                    <div v-if="record.water_type === 6">
                      <span>水库片</span>
                    </div>
                  </template>
                  <span slot="status" slot-scope="text, record">
                    <!-- <a-badge :status="text | statusBadge" :text="text | statusName" /> -->
                    <a-switch :checked="text === 1" @click="changeStatus(record)"></a-switch>
                  </span>
                  <!-- <template
                    slot="status"
                    slot-scope="text, record">
                    <div v-if="record.status === 1">
                      <span>启用</span>
                    </div>
                    <div v-if="record.status === -1">
                      <span>禁用</span>
                    </div>
                  </template> -->
                  <!-- <span
                    slot="serial"
                    slot-scope="text, record, index">
                    {{ index + 1 }}
                  </span> -->
                  <!-- <span
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
                  </span> -->

                  <span
                    slot="action"
                    slot-scope="text, record, index">
                    <template>
                      <!-- <a
                        @click="() => {}"
                        v-show="record.publish !== '1'"
                        v-html="'&emsp;发布'"></a> -->
                      <!-- <span
                        style="font-size: 14px"
                        v-show="record.publish === '1'">已发布</span> -->
                      <!-- <a-divider type="vertical" /> -->
                      <a @click="gcAddClick(record)">编辑</a>
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
      @ok="handleOkAdd"
      @cancel="handleCancelAdd">

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
                label="河湖库名称"
                prop="name"
                ref="name">
                <a-input v-model="form2.name"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="河湖类型"
                prop="hehutypevalue"
                ref="hehutypevalue">
                <dictionary-select
                  v-model="form2.hehutypevalue"
                  :dictionary-type="DictionaryEnum.WATER_TYPE">
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="河湖库编码"
                prop="code"
                ref="code">
                <a-input v-model="form2.code"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="河湖库层级"
                prop="hehucengji"
                ref="hehucengji">
                <dictionary-select
                  v-model="form2.hehucengji"
                  :dictionary-type="DictionaryEnum.DIC_WATER_GRADE">
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="河湖长"
                prop="hehuzhang"
                ref="hehuzhang">
                <!-- <dictionary-select
                  v-model="form2.hehuzhang"
                  :dictionary-type="DictionaryEnum.ATTENTION_LEVEL">
                </dictionary-select> -->
                <a-select v-model="form2.hehuzhang">
                  <a-select-option
                    v-for="item in hehuzhangvalue"
                    :key="item.key"
                    :value="item.key">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="上级河湖库"
                prop="sjhehuku"
                ref="sjhehuku">
                <a-input v-model="form2.sjhehuku"></a-input>
              </a-form-model-item>
            </a-col>
            <!-- 河流信息-----开始 -->
            <div v-show="heliuShow">
              <a-col :span="12">
                <a-form-item
                  label="河流长度:"
                  prop="hehulength"
                  ref="hehulength">
                  <a-input v-model="form2.hehulength"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="河流级别:"
                  prop="heliujibie"
                  ref="heliujibie">
                  <a-select
                    placeholder="全部"
                    v-model="form2.heliujibie">
                    <a-select-option value="1">干河流</a-select-option>
                    <a-select-option value="2">一级</a-select-option>
                    <a-select-option value="3">二级</a-select-option>
                    <a-select-option value="4">三级</a-select-option>
                    <a-select-option value="5">四级</a-select-option>
                    <a-select-option value="6">五级</a-select-option>
                    <a-select-option value="7">六级</a-select-option>
                    <a-select-option value="8">七级</a-select-option>
                    <a-select-option value="9">八级</a-select-option>
                    <a-select-option value="10">未定级别</a-select-option>
                  </a-select>
                  <!-- <dictionary-select
                    v-model="form2.heliujibie"
                    :dictionary-type="DictionaryEnum.DIC_WATER_LEVEL">
                  </dictionary-select> -->
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="起点经纬度:"
                  prop="startjwd"
                  ref="startjwd">
                  <a-input
                    v-model="form2.startjwd">
                    <a-icon
                      @click="showMap1"
                      slot="addonAfter"
                      type="environment"
                      :style="{ color: '#0D7DD9' }" />
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="终点经纬度:"
                  prop="endjwd"
                  ref="endjwd">
                  <a-input
                    v-model="form2.endjwd">
                    <a-icon
                      @click="showMap2"
                      slot="addonAfter"
                      type="environment"
                      :style="{ color: '#0D7DD9' }" />
                  </a-input>
                </a-form-item>
              </a-col>
            </div>
            <!-- 河流信息-----结束 -->
            <!-- 河段信息-----开始 -->
            <div v-show="heduanShow">
              <a-col :span="12">
                <a-form-item
                  label="河段长度:"
                  prop="length2"
                  ref="length2">
                  <a-input v-model="form2.length2"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="河段级别:"
                  prop="heduanjibie"
                  ref="heduanjibie">
                  <a-select
                    placeholder="全部"
                    v-model="form2.heduanjibie">
                    <a-select-option value="11">国家级</a-select-option>
                    <a-select-option value="12">自治区级</a-select-option>
                    <a-select-option value="13">市级</a-select-option>
                    <a-select-option value="14">县级</a-select-option>
                    <a-select-option value="15">乡镇级</a-select-option>
                    <a-select-option value="16">村级</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="行政区划:"
                  prop="xzqh"
                  ref="xzqh">
                  <a-input v-model="form2.xzqh"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="位置:"
                  prop="weizhi"
                  ref="weizhi">
                  <a-input v-model="form2.weizhi"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="起点经纬度:"
                  prop=""
                  ref="">
                  <a-input
                    v-model="form2.startjwd2">
                    <a-icon
                      @click="showMap3"
                      slot="addonAfter"
                      type="environment"
                      :style="{ color: '#0D7DD9' }" />
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="终点经纬度:"
                  prop="endjwd2"
                  ref="endjwd2">
                  <a-input
                    v-model="form2.endjwd2">
                    <a-icon
                      @click="showMap4"
                      slot="addonAfter"
                      type="environment"
                      :style="{ color: '#0D7DD9' }" />
                  </a-input>
                </a-form-item>
              </a-col>
            </div>
            <!-- 河段信息-----结束 -->
            <!-- 湖泊信息-----开始 -->
            <div v-show="hupoShow">
              <a-col :span="12">
                <a-form-item
                  label="位置:"
                  prop="weizhihupo"
                  ref="weizhihupo">
                  <a-input v-model="form2.weizhihupo"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="面积:"
                  prop="mianjihupo"
                  ref="mianjihupo">
                  <a-input v-model="form2.mianjihupo"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="咸淡水属性:"
                  prop="xdsshuxing"
                  ref="xdsshuxing">
                  <dictionary-select
                    v-model="form2.xdsshuxing"
                    :dictionary-type="DictionaryEnum.DIC_IS_SALT">
                  </dictionary-select>
                  <!-- <a-select
                    placeholder="全部"
                    v-model="form2.xdsshuxing">
                    <a-select-option value="-1">咸水</a-select-option>
                    <a-select-option value="1">淡水</a-select-option>
                  </a-select> -->
                </a-form-item>
              </a-col>
            </div>
            <!-- 湖泊信息-----结束 -->
            <!-- 湖泊片信息---开始 -->
            <div v-show="hupopianShow">
              <a-col :span="12">
                <a-form-item
                  label="位置:"
                  prop="weizhihupopian"
                  ref="weizhihupopian">
                  <a-input v-model="form2.weizhihupopian"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="面积:"
                  prop="mianjihupopian"
                  ref="mianjihupopian">
                  <a-input v-model="form2.mianjihupopian"></a-input>
                </a-form-item>
              </a-col>
            </div>
            <!-- 湖泊片信息---结束 -->
            <!-- 水库信息-----开始 -->
            <div v-show="shuikuShow">
              <a-col :span="12">
                <a-form-item
                  label="位置:"
                  prop="weizhishuiku"
                  ref="weizhishuiku">
                  <a-input v-model="form2.weizhishuiku"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="管理单位名称:"
                  prop="gldwname"
                  ref="gldwname">
                  <a-select v-model="form2.gldwname">
                    <a-select-option
                      v-for="item in gldwnamevalue"
                      :key="item.key"
                      :value="item.key">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="总库容:"
                  prop="zkr"
                  ref="zkr">
                  <a-input v-model="form2.zkr">
                    <template slot="addonAfter">
                      万立米
                    </template>
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="工程等级:"
                  prop="gcdj"
                  ref="gcdj">
                  <dictionary-select
                    v-model="form2.gcdj"
                    :insert-option-all="false"
                    :select-first="false"
                    :dictionary-type="DictionaryEnum.PROJECT_LEVEL"
                  >
                  </dictionary-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="水库类型:"
                  prop="sklx"
                  ref="sklx">
                  <a-select v-model="form2.sklx">
                    <a-select-option value="1">小（二）型10-100万立米</a-select-option>
                    <a-select-option value="2">小（一）型100-1000万立米</a-select-option>
                    <a-select-option value="3">中型1000万立米-1亿立米</a-select-option>
                    <a-select-option value="4">大（二）型1—回10亿立米</a-select-option>
                    <a-select-option value="5">大（一）型大于10亿立米</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </div>
            <!-- 水库信息-----结束 -->
            <!-- 水库片信息---开始 -->
            <div v-show="shuikupianShow">
              <a-col :span="12">
                <a-form-item
                  label="位置:"
                  prop="weizhishuikupian"
                  ref="weizhishuikupian">
                  <a-input v-model="form2.weizhishuikupian"></a-input>
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
          ">取消</a-button>
        <a-button
          type="primary"
          @click="savePopup">保存</a-button>
      </template>
    </a-modal>
    <!-- 河湖信息删除 -->
    <a-modal
      title="河湖信息删除"
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
// import mapboxgl from 'mapbox-gl'
// import MapboxLanguage from '@mapbox/mapbox-gl-language'
import { MAPBOX_TOKEN, Style } from '@/components/Hczy/Map/config'
import mapboxgl from 'mapbox-gl'
import { treeData } from './data.js'
import AreaTree from '@com/Hczy/AreaTree.vue'
import { getRiverlakeList, delRiverlake, addRiverlake, updateRiverlake, getGldwdata, statusChange } from '@/api/riverlakemanage'
// import { Scene, Zoom, Scale, PointLayer, PolygonLayer } from '@antv/l7'
// import { Scene, Scale, PointLayer, LineLayer, PolygonLayer, MarkerLayer, Marker } from '@antv/l7'
// import { Mapbox } from '@antv/l7-maps'
export default {
  components: {
    STable,
    AreaTree
  },
  watch: {
    // 3--河流  4--河段  5--湖泊  6-- 湖泊片  7--水库  8--水库片
    'form2.hehutypevalue' (value2, oldval) {
      console.log(value2)
      console.log(this.form2.heliujibie)
      if (value2 === 1) {
        this.hehutypevalue = 1
        this.heliuShow = true
        this.heduanShow = false
        this.hupoShow = false
        this.hupopianShow = false
        this.shuikuShow = false
        this.shuikupianShow = false
      } else if (value2 === 2) {
        this.hehutypevalue = 2
        this.heliuShow = false
        this.heduanShow = true
        this.hupoShow = false
        this.hupopianShow = false
        this.shuikuShow = false
        this.shuikupianShow = false
      } else if (value2 === 3) {
        this.hehutypevalue = 3
        this.heliuShow = false
        this.heduanShow = false
        this.hupoShow = true
        this.hupopianShow = false
        this.shuikuShow = false
        this.shuikupianShow = false
      } else if (value2 === 4) {
        this.hehutypevalue = 4
        this.heliuShow = false
        this.heduanShow = false
        this.hupoShow = false
        this.hupopianShow = true
        this.shuikuShow = false
        this.shuikupianShow = false
      } else if (value2 === 5) {
        this.hehutypevalue = 5
        this.heliuShow = false
        this.heduanShow = false
        this.hupoShow = false
        this.hupopianShow = false
        this.shuikuShow = true
        this.shuikupianShow = false
      } else if (value2 === 6) {
        this.hehutypevalue = 6
        this.heliuShow = false
        this.heduanShow = false
        this.hupoShow = false
        this.hupopianShow = false
        this.shuikuShow = false
        this.shuikupianShow = true
      }
    },
    zkr (value) {
      if (value === '0' || value === '1') {
        this.sklxvalue = [
          {
            value: '0',
            name: '小型水库'
          }
        ]
      } else if (value === '2') {
        this.sklxvalue = [
          {
            value: '1',
            name: '中型水库'
          }
        ]
      } else if (value === '3' || value === '4') {
        this.sklxvalue = [
          {
            value: '2',
            name: '大型水库'
          }
        ]
      }
    },
    sklx (value) {
      console.log(value)
    }
  },
  data () {
    const checkNumber = (rule, value, callback) => {
      const reg = /^[0-9]+(.[0-9]{2})?$/
      if (!reg.test(value)) {
        // eslint-disable-next-line standard/no-callback-literal
        callback('数据不符合规范!')
        return
      }
      callback()
    }
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
      listHeight: window.innerHeight - 190,
      leftTreeHeight: window.innerHeight - 80,
      areadivHeight: window.innerHeight - 200,
      confirmLoading: false,
      visible: false,
      visibledel: false,
      rowData: '',
      accessToken:
        'pk.eyJ1IjoibWFvcmV5IiwiYSI6ImNqNWhrenIwcDFvbXUyd3I2bTJxYzZ4em8ifQ.KHZIehQuWW9AsMaGtATdwA',
      style: '',
      handleCancelMap: false,
      sureBtnShow: true,
      center: [118.806266, 32.059868],
      zoom: 12,
      pitch: 0,
      zkr: '',
      gcdj: '',
      sklx: '',
      // bearing: -17.6,
      bearing: 0,
      container: 'add-map',
      antialias: true,
      hehutypevalue: 1,
      attributionControl: false, // 隐藏地图所属信息
      doubleClickZoom: false,
      // form: this.$form.createForm(this),
      // form2: this.$form.createForm(this),
      regionalism_id: '',
      form: {
        namesearch: '',
        type: ''
      },
      form2: {
        name: '',
        hehutypevalue: 1,
        code: '',
        hehucengji: '',
        hehuzhang: '',
        sjhehuku: '',
        hehulength: '',
        startjwd: '',
        endjwd: '',
        heliujibie: '',
        weizhishuikupian: '',
        weizhishuiku: '',
        gldwname: '',
        zkr: '',
        gcdj: '',
        sklx: ''
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
        startjwd: [
          { required: true, message: '起点经纬度不能为空', trigger: 'blur' }
        ],
        endjwd: [
          { required: true, message: '终点经纬度不能为空', trigger: 'blur' }
        ],
        startjwd2: [
          { required: true, message: '起点经纬度不能为空', trigger: 'blur' }
        ],
        endjwd2: [
          { required: true, message: '终点经纬度不能为空', trigger: 'blur' }
        ],
        hehucengji: [
          { required: true, message: '河湖层级不能为空', trigger: 'blur' }
        ],
        // hehuzhang: [
        //   { required: true, message: '河湖长不能为空', trigger: 'blur' }
        // ],
        zkr: [
          { required: true, message: '河湖层级不能为空', trigger: 'change' }
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
          dataIndex: 'water_num'
        },
        {
          title: '河长名称',
          dataIndex: 'chief_name'
        },
        {
          title: '起点',
          dataIndex: 'destination',
          scopedSlots: { customRender: 'destination' }
        },
        {
          title: '终点',
          dataIndex: 'origin',
          scopedSlots: { customRender: 'origin' }
        },
        {
          title: '类型',
          dataIndex: 'water_type',
          scopedSlots: { customRender: 'water_type' }
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '160px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      typevalue: [],
      addmodifyFlag: '1',
      gldwnamevalue: [],
      hehuzhangvalue: [],
      sklxvalue: [],
      sklxvalue2: [],
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
      // 查询参数
      queryParam: {
        regionalism_id: '',
        name: '',
        water_type: 0
      },
      // 加载表格数据
      loadData: parameter => {
        // console.log(this.form.type)
        // var reqData = {
        //   regionalism_id: this.regionalism_id,
        //   name: this.form.name,
        //   water_type: this.form.type
        // }
        // return [{ name: 'sss' }]
        return getRiverlakeList(Object.assign(parameter, this.queryParam)).then(res => {
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
          if (res.data.depts[i].employees) {
            for (var j = 0; j < res.data.depts[i].employees.length; j++) {
              this.hehuzhangvalue.push(
              {
                key: res.data.depts[i].employees[j].employee_id,
                name: res.data.depts[i].employees[j].employee_name
              }
            )
            }
          }
      }
    })
  },
  methods: {
    changeStatus (record) {
      const params = Object.assign({}, record, { id: record.water_id })
      statusChange(params).then(() => {
        this.$message.success('状态切换成功！')
        this.$refs.table.refresh(true)
      })
    },
    getSelectNode (node) {
      console.log(node)
      this.regionalism_id = node[0]
    },
    // 左侧树形触发
    onSelecttree () {
    },
    // 河湖类型--查询
    hehutypeSelectClick (value) {
      console.log(value)
    },
    heliuSelect () {
    },
    // 新增编辑按钮触发
    gcAddClick (data = {}) {
      this.visible = true
      this.form = { ...{}, ...data }
      console.log(this.form)
      this.rowData = this.form
      if (this.form.water_id) {
        this.addmodifyFlag = '2'
        this.title = '编辑河湖信息'
        this.setFormValue(this.form)
      } else {
        this.addmodifyFlag = '1'
        this.title = '新增河湖信息'
        // this.$refs.form2.resetFields()
        this.form2.hehutypevalue = 1
        this.form2.name = ''
        this.form2.code = ''
        this.form2.hehucengji = ''
        this.form2.hehuzhang = ''
        this.form2.sjhehuku = ''
        this.form2.hehulength = ''
        this.form2.heliujibie = ''
        this.form2.startjwd = ''
        this.form2.endjwd = ''
        this.form2.length2 = ''
        this.form2.heduanjibie = ''
        this.form2.xzqh = ''
        this.form2.weizhi = ''
        this.form2.startjwd2 = ''
        this.form2.endjwd2 = ''
        this.form2.weizhihupo = ''
        this.form2.mianjihupo = ''
        this.form2.xdsshuxing = ''
        this.form2.weizhihupopian = ''
        this.form2.mianjihupopian = ''
        this.form2.weizhishuiku = ''
        this.form2.gldwname = ''
        this.form2.zkr = ''
        this.form2.gcdj = ''
        this.form2.sklx = ''
        this.form2.weizhishuikupian = ''
      }
      setTimeout(() => {
        this.$refs.form2.clearValidate()
      }, 1)
    },
    // 编辑按钮触发
    gcModifyClick (data) {

    },
    setFormValue (value) {
      console.log(value)
      if (value.water_type === 1 || value.water_type === -1) {
        this.heliuShow = true
        this.heduanShow = false
        this.hupoShow = false
        this.hupopianShow = false
        this.shuikuShow = false
        this.shuikupianShow = false
        this.setheliu(value)
      } else if (value.water_type === 2) {
        this.heliuShow = false
        this.heduanShow = true
        this.hupoShow = false
        this.hupopianShow = false
        this.shuikuShow = false
        this.shuikupianShow = false
        this.setheduan(value)
      } else if (value.water_type === 3) {
        this.heliuShow = false
        this.heduanShow = false
        this.hupoShow = true
        this.hupopianShow = false
        this.shuikuShow = false
        this.shuikupianShow = false
        this.sethupo(value)
      } else if (value.water_type === 4) {
        this.heliuShow = false
        this.heduanShow = false
        this.hupoShow = false
        this.hupopianShow = true
        this.shuikuShow = false
        this.shuikupianShow = false
        this.sethupopian(value)
      } else if (value.water_type === 5) {
        this.heliuShow = false
        this.heduanShow = false
        this.hupoShow = false
        this.hupopianShow = false
        this.shuikuShow = true
        this.shuikupianShow = false
        this.setshuiku(value)
      } else if (value.water_type === 6) {
        this.heliuShow = false
        this.heduanShow = false
        this.hupoShow = false
        this.hupopianShow = false
        this.shuikuShow = false
        this.shuikupianShow = true
        this.setshuikupian(value)
      }
    },
    // 设置河流表单值
    setheliu (data) {
      console.log(data)
      console.log(typeof ([parseFloat(data.origin[0]), parseFloat(data.origin[1])]))
      this.form2.name = data.name
      // this.form2.hehutypevalue = data.water_type
      this.form2.hehutypevalue = 1
      this.form2.code = data.water_num
      this.form2.hehucengji = data.water_grade
      this.form2.hehuzhang = data.chief_id
      this.form2.sjhehuku = data.p_name
      this.form2.hehulength = data.length
      this.form2.heliujibie = data.water_level.toString()
      this.form2.startjwd = [parseFloat(data.origin[0]), parseFloat(data.origin[1])]
      this.form2.endjwd = [parseFloat(data.destination[0]), parseFloat(data.destination[1])]
      // this.form2.startjwd = data.origin[0].toString() + ',' + data.origin[1].toString()
      // this.form2.endjwd = data.destination[0].toString() + ',' + data.destination[1].toString()
      // console.log(data.origin.substring(1, data.origin.length - 1))
      console.log(this.form2.startjwd)
      console.log(typeof (this.form2.startjwd))
    },
    // 设置河段表单值
    setheduan (data) {
      this.form2.name = data.name
      // this.form2.hehutypevalue = '2'
      this.form2.hehutypevalue = 2
      this.form2.code = data.water_num
      this.form2.hehucengji = data.water_grade
      this.form2.hehuzhang = data.chief_id
      this.form2.sjhehuku = data.p_name
      this.form2.length2 = data.length
      this.form2.heduanjibie = data.water_level
      this.form2.xzqh = data.regionalism_id
      this.form2.weizhi = data.location
      this.form2.startjwd2 = [parseFloat(data.origin[0]), parseFloat(data.origin[1])]
      this.form2.endjwd2 = [parseFloat(data.destination[0]), parseFloat(data.destination[1])]
      // reqData.water_level = parseInt(this.form2.heduanjibie)
      //       reqData.regionalism_id = this.form2.xzqh
      //       reqData.location = this.form2.weizhi
      //       reqData.origin = [this.form2.startjwd2]
      //       reqData.destination = [this.form2.endjwd2]
    },
    // 设置湖泊表单值
    sethupo (data) {
      this.form2.name = data.name
      this.form2.hehutypevalue = 3
      this.form2.code = data.water_num
      this.form2.hehucengji = data.water_grade
      this.form2.hehuzhang = data.chief_id
      this.form2.sjhehuku = data.p_name
      this.form2.weizhihupo = data.location
      this.form2.mianjihupo = data.area
      this.form2.xdsshuxing = data.is_salt
      // reqData.location = this.form2.weizhihupo
      // reqData.area = parseInt(this.form2.mianjihupo)
      // reqData.is_salt = parseInt(this.form2.xdsshuxing)
    },
    // 设置湖泊片表单值
    sethupopian (data) {
      this.form2.name = data.name
      this.form2.hehutypevalue = 4
      this.form2.code = data.water_num
      this.form2.hehucengji = data.water_grade
      this.form2.hehuzhang = data.chief_id
      this.form2.sjhehuku = data.p_name
      this.form2.weizhihupopian = data.location
      this.form2.mianjihupopian = data.area
    },
    // 设置水库表单值
    setshuiku (data) {
      this.form2.name = data.name
      this.form2.hehutypevalue = 5
      this.form2.code = data.water_num
      this.form2.hehucengji = data.water_grade
      this.form2.hehuzhang = data.chief_id
      this.form2.sjhehuku = data.p_name
      this.form2.weizhishuiku = data.location
      this.form2.gldwname = data.dept_id
      this.form2.zkr = data.capacity
      this.form2.gcdj = data.reservoir_project_level.toString()
      this.form2.sklx = data.reservoir_type.toString()
      // reqData.capacity = parseInt(this.form2.zkr)
      // reqData.reservoir_project_level = parseInt(this.form2.gcdj)
      // reqData.reservoir_type = parseInt(this.form2.sklx)
    },
    // 设置水库片表单值
    setshuikupian (data) {
      this.form2.name = data.name
      this.form2.hehutypevalue = 6
      this.form2.code = data.water_num
      this.form2.hehucengji = data.water_grade
      this.form2.hehuzhang = data.chief_id
      this.form2.sjhehuku = data.p_name
      this.form2.weizhishuikupian = data.location
    },
    // 河湖类型选择触发
    selectChangeadd () { },
    // 河流起点经纬度获取
    showMap1 () {
      this.jinweiduFlag = '1'
      this.handleCancelMap = true
      this.sureBtnShow = true
      this.heliujindu1 = ''
      this.heliuweidu1 = ''
      setTimeout(() => {
        this.initMap()
      }, 500)
    },
    // 河流终点经纬度获取
    showMap2 () {
      this.jinweiduFlag = '2'
      this.handleCancelMap = true
      this.sureBtnShow = true
      this.heliujindu2 = ''
      this.heliuweidu2 = ''
      setTimeout(() => {
        this.initMap()
      }, 500)
    },
    // 河段起点经纬度获取
    showMap3 () {
      this.jinweiduFlag2 = '1'
      this.handleCancelMap = true
      this.sureBtnShow = true
      this.heduanjindu1 = ''
      this.heduanweidu1 = ''
      setTimeout(() => {
        this.initMap()
      }, 500)
    },
    // 河段终点经纬度获取
    showMap4 () {
      this.jinweiduFlag2 = '2'
      this.handleCancelMap = true
      this.sureBtnShow = true
      this.heduanjindu2 = ''
      this.heduanjindu2 = ''
      setTimeout(() => {
        this.initMap()
        // this.initLanguage()
      }, 500)
    },
    AddDraw () {
      console.log(this.hehutypevalue)
      console.log(typeof (this.hehutypevalue))
      // console.log(this.jinweiduFlag)
      this.disabled = false
      if (this.hehutypevalue === 1 && this.jinweiduFlag === '1') {
        if (this.heliujindu1 === '' || this.heliuweidu1 === '') {
          this.$message.info('请点击地图')
        } else {
          var a1 = this.heliujindu1
          var b1 = this.heliuweidu1
          this.form2.startjwd = [parseFloat(a1), parseFloat(b1)]
          this.handleCancelMap = false
        }
      } else if (this.hehutypevalue === 1 && this.jinweiduFlag === '2') {
        if (this.heliujindu2 === '' || this.heliuweidu2 === '') {
          this.$message.info('请点击地图')
        } else {
          var a2 = this.heliujindu2
          var b2 = this.heliuweidu2
          this.form2.endjwd = [parseFloat(a2), parseFloat(b2)]
          this.handleCancelMap = false
        }
      } else if (this.hehutypevalue === 2 && this.jinweiduFlag2 === '1') {
        if (this.heduanjindu1 === '' || this.heduanweidu1 === '') {
          this.$message.info('请点击地图')
        } else {
          var a3 = this.heduanjindu1
          var b3 = this.heduanweidu1
          this.form2.startjwd2 = [parseFloat(a3), parseFloat(b3)]
          this.handleCancelMap = false
        }
      } else if (this.hehutypevalue === 2 && this.jinweiduFlag2 === '2') {
        if (this.heduanjindu2 === '' || this.heduanweidu2 === '') {
          this.$message.info('请点击地图')
        } else {
          var a4 = this.heduanjindu2
          var b4 = this.heduanweidu2
          // this.form2.setFieldsValue({ endjwd2: a4 + ',' + b4 })
          this.form2.endjwd2 = [parseFloat(a4), parseFloat(b4)]
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
      console.log(this.rowData)
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
      // console.log(this.hehutypevalue)
      // console.log(this.jinweiduFlag2)
      console.log(e)
      if (this.hehutypevalue === 1 && this.jinweiduFlag === '1') {
        this.heliujindu1 = e.lngLat.lng.toFixed(6)
        this.heliuweidu1 = e.lngLat.lat.toFixed(6)
      } else if (this.hehutypevalue === 1 && this.jinweiduFlag === '2') {
        this.heliujindu2 = e.lngLat.lng.toFixed(6)
        this.heliuweidu2 = e.lngLat.lat.toFixed(6)
      } else if (this.hehutypevalue === 2 && this.jinweiduFlag2 === '1') {
        this.heduanjindu1 = e.lngLat.lng.toFixed(6)
        this.heduanweidu1 = e.lngLat.lat.toFixed(6)
      } else if (this.hehutypevalue === 2 && this.jinweiduFlag2 === '2') {
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
      this.$refs.form2.validate(err => {
        if (err) {
          var reqData = {
            name: this.form2.name,
            water_type: parseInt(this.hehutypevalue),
            water_num: this.form2.code,
            water_grade: parseInt(this.form2.hehucengji),
            // chief_id: this.form2.hehuzhang.toString(),
            chief_id: this.form2.hehuzhang,
            pid: this.form2.sjhehuku
          }
          if (this.hehutypevalue === 1) {
            reqData.length = this.form2.hehulength === '' ? 0 : parseInt(this.form2.hehulength)
            // reqData.heliujibie = this.form2.heliujibie
            reqData.water_level = this.form2.heliujibie === '' ? 0 : parseInt(this.form2.heliujibie)
            reqData.origin = this.form2.startjwd
            reqData.destination = this.form2.endjwd
          } else if (this.hehutypevalue === 2) {
            reqData.length = parseInt(this.form2.length2)
            reqData.water_level = parseInt(this.form2.heduanjibie)
            reqData.regionalism_id = this.form2.xzqh
            reqData.location = this.form2.weizhi
            reqData.origin = this.form2.startjwd2
            reqData.destination = this.form2.endjwd2
          } else if (this.hehutypevalue === 3) {
            reqData.location = this.form2.weizhihupo
            reqData.area = parseInt(this.form2.mianjihupo)
            reqData.is_salt = parseInt(this.form2.xdsshuxing)
          } else if (this.hehutypevalue === 4) {
            reqData.location = this.form2.weizhihupopian
            reqData.area = parseInt(this.form2.mianjihupopian)
          } else if (this.hehutypevalue === 5) {
            reqData.location = this.form2.weizhishuiku
            reqData.dept_id = this.form2.gldwname
            reqData.capacity = parseInt(this.form2.zkr)
            reqData.reservoir_project_level = parseInt(this.form2.gcdj)
            reqData.reservoir_type = parseInt(this.form2.sklx)
          } else if (this.hehutypevalue === 6) {
            reqData.location = this.form2.weizhishuikupian
          }
          console.log(reqData)
          // console.log(reqData.origin)
          // console.log(typeof (reqData.origin))
          if (this.addmodifyFlag === '1') {
            addRiverlake(reqData).then(res => {
              // console.log(res)
              this.searchClick()
              this.visible = false
              this.$refs.form2.clearValidate()
              this.$message.success('新增河湖库成功!')
            })
          } else if (this.addmodifyFlag === '2') {
            reqData.water_id = this.rowData.water_id
            reqData.version = this.rowData.version
            updateRiverlake(this.rowData.water_id, reqData).then(res => {
              this.searchClick()
              this.visible = false
              this.$refs.form2.clearValidate()
              this.$message.success('编辑河湖库成功!')
            })
          }
        }
      })
    },
    // 取消按钮触发
    handleCancelAdd () {
      this.visible = false
    },
    // 河湖新增保存按钮
    handleOkAdd () {
      console.log(this.hehutypevalue)
    },
    // 编辑按钮触发
    handleEditOrNew (value) {
      console.log(value)
    },
    // 查询按钮触发
    searchClick () {
      // var reqData = {
      //   regionalism_id: this.regionalism_id,
      //   name: this.form.name,
      //   water_type: this.form.type
      // }
      this.queryParam.water_type = this.form.type === '' ? 0 : this.form.type
      this.queryParam.name = this.form.namesearch
      // console.log(this.queryParam)
      this.queryParam.regionalism_id = this.regionalism_id
      // this.$refs[this.queryParam].$refs.table.refresh(true)
      this.$refs.table.refresh(true)
      // console.log(reqData)
    },
    // 重置按钮触发
    resertClick () {
      this.form.namesearch = ''
      this.form.type = ''
    },
    // 河湖删除
    handleDel (value) {
      console.log(value)
      this.rowData = value.water_id
      this.visibledel = true
    },
    // 河湖信息删除
    handleOk () {
      delRiverlake(this.rowData).then((res) => {
        console.log(res)
        this.$message.success('删除成功！')
        this.$refs.table.refresh(true)
        this.visibledel = false
      })
    },
    handleCancelDel () {
      this.visibledel = false
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
