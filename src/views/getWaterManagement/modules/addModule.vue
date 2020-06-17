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
              <a-form-model-item label="所属区域" prop="regionalism_id" ref="regionalism_id">
                <a-tree-select v-model="form.regionalism_id" :treeData="treeData"> </a-tree-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="具体地址" prop="location" ref="location">
                <a-input v-model="form.location" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="所属水源地" prop="source_id" ref="source_id">
                <a-select v-model="form.source_id">
                  <a-select-option v-for="item in waterSourceList" :value="item.source_id" :key="item.source_id">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="经纬度" prop="lon_lat" ref="lon_lat">
                <mapInput v-model="form.lon_lat" v-if="visible"></mapInput>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="取水方式" prop="get_water_type" ref="get_water_type">
                <dictionary-select
                  v-model="form.get_water_type"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.GET_WATER_TYPE"
                >
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="取水流量" prop="ammount" ref="ammount">
                <a-input v-model="form.ammount">
                  <template slot="addonAfter">
                    m³/s
                  </template>
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="是否为引调水工程取水口"
                prop="is_transfer"
                ref="is_transfer"
                :labelCol="{ span: 12 }"
                :wrapperCol="{ span: 10 }"
              >
                <a-switch v-model="form.is_transfer" checked-children="是" un-checked-children="否" default-checked />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="引调水工程名称" prop="transfer_project_name" ref="transfer_project_name">
                <a-input v-model="form.transfer_project_name" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="规模类型" prop="get_water_scale" ref="get_water_scale">
                <dictionary-select
                  v-model="form.get_water_scale"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.GET_WATER_SCALE"
                >
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="取水口工程名称" prop="get_water_project_name" ref="get_water_project_name">
                <a-input v-model="form.get_water_project_name" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="主要取水用途" prop="get_water_purpose" ref="get_water_purpose">
                <dictionary-select
                  v-model="form.get_water_purpose"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.GET_WATER_PURPOSE"
                >
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="取水许可证编号" prop="license" ref="license">
                <a-input v-model="form.license" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="供水范围" prop="range" ref="range">
                <a-input v-model="form.range" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="开始取水时间" prop="use_time" ref="use_time">
                <a-date-picker
                  valueFormat="YYYY-MM-DD HH:mm:ss"
                  v-model="form.use_time"
                  show-time
                  type="date"
                  placeholder=""
                  style="width: 100%;"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="备注" prop="note" ref="note">
                <a-input type="textarea" v-model="form.note" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="图片" prop="name16" ref="name16">
                <uploadSingleImg v-model="form.image_url"></uploadSingleImg>
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
  </div>
</template>

<script>
// import { saveEmploy } from '../../../../api/manage'
import { treeData } from '@/config/areaTreeSelectData'
import { getWaterMethods, scaleTypes, purposes } from '../data.js'
import { addWater, editWater } from '@/api/getWater'
import { getShuiyuandiList } from '@/api/shuiyuandi'
import uploadSingleImg from '@/components/Hczy/Upload/uploadSingleImg.vue'
import mapInput from '@/components/Hczy/mapInput.vue'
export default {
  props: {},
  components: { mapInput, uploadSingleImg },
  data () {
    return {
      getWaterMethods: getWaterMethods,
      scaleTypes: scaleTypes,
      purposes: purposes,
      treeData,
      waterSourceList: [],
      getWaterModule: 'getWaterModule',
      fileList: [],
      title: '新建',
      labelCol: { span: 8 },
      wrapperCol: { span: 15, offset: 1 },
      status: true,
      confirmLoading: false,
      form: {},
      rules: {
        name: [{ required: true, message: '取水口名称不能为空', trigger: ['blur', 'change'] }],
        regionalism_id: [{ required: true, message: '所属区域不能为空', trigger: ['blur', 'change'] }],
        source_id: [{ required: true, message: '所属水源地不能为空', trigger: ['blur', 'change'] }],
        lon_lat: [{ required: true, message: '经纬度不能为空', trigger: ['blur', 'change'] }],
        get_water_type: [{ required: true, message: '取水方式不能为空', trigger: ['blur', 'change'] }],
        ammount: [
          { required: true, message: '取水流量不能为空', trigger: ['blur', 'change'] },
          { pattern: /^[0-9]+$/, message: '请输入整数', trigger: ['blur', 'change'] }
        ]
      },
      visible: false
    }
  },
  watch: {},
  mounted () {},
  created () {
    getShuiyuandiList({ page: 1, page_size: 0 }).then(res => {
      this.waterSourceList = res.data.list
    })
  },
  methods: {
    showModal (data = {}) {
      this.visible = true
      if (JSON.stringify(data) !== '{}') {
        data.is_transfer = data.is_transfer === 1
      }
      this.form = { ...{}, ...data }
      if (this.form.get_water_id) {
        this.title = '编辑取水口'
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
          const params = Object.assign({}, _this.form, {
            ammount: _this.form.ammount * 1,
            is_transfer: _this.form.is_transfer ? 1 : -1
          })
          if (!_this.form.get_water_id) {
            // 新增
            addWater(params).then(() => {
              _this.$message.success('新增成功！')
              _this.$emit('refreshTable')
              _this.visible = false
            })
          } else {
            // 编辑
            editWater(params.get_water_id, params).then(() => {
              _this.$message.success('编辑成功！')
              _this.$emit('refreshTable')
              _this.visible = false
            })
          }
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
