<template>
  <div>
    <a-modal
      v-model="visible"
      :class="getWaterModule"
      @ok="handleOk"
      width="60%"
      :title="title"
      :confirmLoading="confirmLoading"
    >
      <a-spin :spinning="confirmLoading">
        <a-form-model
          ref="form"
          :model="form"
          :rules="rules"
          labelAlign="left"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-model-item label="取水口名称" prop="name" ref="name">
                <a-input v-model="form.name" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="所属区域" prop="name" ref="name">
                <a-cascader :options="options" placeholder="Please select"/>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="具体地址" prop="name" ref="name">
                <a-input v-model="form.name" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="所属水源地" prop="name" ref="name">
                <a-cascader :options="options" placeholder="Please select"/>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="经纬度" prop="name" ref="name">
                <a-input v-model="form.location" disabled>
                  <a-icon @click="showMap" slot="addonAfter" type="search" :style="{ color: '#0D7DD9' }" />
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="取水方式" prop="name" ref="name">
                <a-select v-model="form.name">
                  <a-select-option v-for="item in getWaterMethods" :key="item.key" :value="item.key">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="取水流量" prop="name" ref="name">
                <a-input v-model="form.name">
                  <template slot="addonAfter">
                    m³/s
                  </template>
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="是否为引调水工程取水口"
                prop="name"
                ref="name"
                :labelCol="{ span: 12 }"
                :wrapperCol="{ span: 10, offset: 1 }"
              >
                <a-switch checked-children="开" un-checked-children="关" default-checked />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="引调水工程名称" prop="name" ref="name">
                <a-input v-model="form.name" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="规模类型" prop="name" ref="name">
                <a-select v-model="form.name">
                  <a-select-option v-for="item in scaleTypes" :key="item.key" :value="item.key">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="取水口工程名称" prop="name" ref="name">
                <a-input v-model="form.name" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="主要取水用途" prop="name" ref="name">
                <a-select v-model="form.name">
                  <a-select-option v-for="item in purposes" :key="item.key" :value="item.key">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="取水许可证编号" prop="name" ref="name">
                <a-input v-model="form.name" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="供水范围" prop="name" ref="name">
                <a-input v-model="form.name" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="开始取水时间" prop="name" ref="name">
                <a-input v-model="form.name" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="图片" prop="name" ref="name">
                <a-upload
                  :customRequest="customRequest"
                  :fileList="fileList"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  accept=".png,.jpg,.bmp"
                  :headers="{ 'Content-Type': 'multipart/form-data' }"
                >
                  <img width="100" height="100" v-if="showImage" :src="form.imageUrl" alt="avatar" />
                  <div v-else>
                    <a-button> <a-icon type="upload" /> </a-button>
                  </div>
                </a-upload>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="备注" prop="name" ref="name">
                <a-input v-model="form.name" />
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
        <a-button type="primary" @click="handleOk">保存</a-button>
      </template>
    </a-modal>
    <div
      id="distance2"
      class="distance-container"
      v-show="showMapDom"></div>
    <div
      class="add-mask"
      v-show="showMapDom"></div>
    <div class="add-map-box" v-if="showMapDom">
      <div id="add-map2" class="map-view" style="width:100%;height:428px"></div>
      <div class="add-map-submit">
        <a-button class="add-map-submit-btn" type="primary" @click="AddDraw" :disabled="!lat">确定</a-button>
        <a-button class="add-map-submit-btn" @click="cancelAddDraw">取消</a-button>
      </div>
    </div>
  </div>
</template>

<script>
// import { saveEmploy } from '../../../../api/manage'
import { MAPBOX_TOKEN, Style } from '@/components/Hczy/Map/config'
import mapboxgl from 'mapbox-gl'
import { getWaterMethods, scaleTypes, purposes } from '../data.js'
import { uploadSingle } from '@/api/upload'
export default {
  props: {
    orgData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      getWaterMethods: getWaterMethods,
      scaleTypes: scaleTypes,
      purposes: purposes,
      getWaterModule: 'getWaterModule',
      fileList: [],
      title: '新建',
      labelCol: { span: 8 },
      wrapperCol: { span: 15, offset: 1 },
      status: true,
      confirmLoading: false,
      form: {
        id: '',
        name: '',
        site: '',
        principal: '',
        participant: '',
        progress: '',
        location: ''
      },
      rules: {
        name: [{ required: true, message: '任务名称不能为空', trigger: 'blur' }],
        site: [{ required: true, message: '地点不能为空', trigger: 'blur' }],
        principal: [{ required: true, message: '负责人不能为空', trigger: 'blur' }],
        participant: [{ required: true, message: '参与人不能为空', trigger: 'blur' }]
      },
      layout: 'horizontal',
      visible: false,
      showMapDom: false,
      showImage: false,
      lng: '',
      lat: '',
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake'
                }
              ]
            }
          ]
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  watch: {
    orgData (value) {
      this.treeData = this.buildTreeData(value, [])
    },
    'form': {
      handler (value) {
        this.showImage = value.imageUrl
      },
      deep: true
    }
  },
  mounted () {},
  methods: {
    initMap () {
      const map = new mapboxgl.Map({
        container: 'add-map2',
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
        _this.lng = e.lngLat.lng.toFixed(6)
        _this.lat = e.lngLat.lat.toFixed(6)
        marker.setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map)
      })
    },
    showMap () {
      this.showMapDom = true
      setTimeout(() => {
        this.initMap()
      }, 500)
    },
    AddDraw () {
      this.form.location = this.lng + ', ' + this.lat
      this.showMapDom = false
    },
    cancelAddDraw () {
      this.showMapDom = false
    },
    customRequest (data) {
      const formData = new FormData()
      formData.append('file', data.file)
      uploadSingle(formData)
        .then(res => {
          this.$set(this.form, 'imageUrl', res.data)
        })
        .catch(() => {})
      this.fileList = [data.file]
    },
    showModal (data = {}) {
      this.visible = true
      this.form = { ...{}, ...data }
      if (this.form.id) {
        this.title = '修改取水口'
      } else {
        this.title = '新增取水口'
      }
      setTimeout(() => {
        this.$refs.form.clearValidate()
      }, 1)
    },
    handleOk (e) {
      const _this = this
      this.$refs.form.validate(valid => {
        if (valid) {
          _this.confirmLoading = true
          let params = _this.form
          let isEdit = true
          if (!_this.form.employee_id) {
            isEdit = false
            params = {
              employee_form_list: [_this.form]
            }
          }
          _this.visible = false
          // saveEmploy(params, isEdit).then((res) => {
          //   _this.$message.success('保存成功')
          //   _this.visible = false
          //   _this.$refs.userForm.resetFields()
          //   _this.$emit('ok')
          // }).catch((err) => {
          //   _this.$message.error(err.msg || '保存失败')
          // }).finally(() => {
          //   _this.confirmLoading = false
          // })
        }
      })
    }
  }
}
</script>

<style lang="less">
.getWaterModule ::v-deep {
  .ant-form-item-label {
    text-align: left;
    white-space: pre-wrap;
  }
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
