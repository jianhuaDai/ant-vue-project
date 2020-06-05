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
          <a-row :gutter="24" v-if="visible">
            <a-col :span="12">
              <a-form-model-item label="断面名称" prop="fracture_name" ref="fracture_name">
                <a-input v-model="form.fracture_name" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="断面编码" prop="fracture_id" ref="fracture_id">
                <a-input v-model="form.fracture_id" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="所属水体" prop="water_id" ref="water_id">
                <a-select v-model="form.water_id" placeholder="">
                  <a-select-option v-for="itemType in outfallTypes" :key="itemType.key">
                    {{ itemType.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="所属区域" prop="regionalism_id" ref="regionalism_id">
                <!-- <a-cascader :options="options" placeholder="" /> -->
                <a-tree-select v-model="form.regionalism_id" :treeData="treeData">
                </a-tree-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="详细地址" prop="location" ref="location">
                <a-input v-model="form.location"> </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="属性" prop="fracture_property" ref="fracture_property">
                <dictionary-select
                  v-model="form.fracture_property"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.FRACTURE_PROPERTY"
                >
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="经纬度" prop="lon_lat" ref="lon_lat">
                <mapInput v-model="form.lon_lat" v-if="visible"></mapInput>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="断面类型" prop="fracture_type" ref="fracture_type">
                <dictionary-select
                  v-model="form.fracture_type"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.FRACTURE_TYPE"
                >
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="监测频率" prop="monitoring_frequency" ref="monitoring_frequency">
                <a-input v-model="form.monitoring_frequency">
                  <template slot="addonAfter">
                    次/月
                  </template>
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="达十三五目标年限" prop="target_year" ref="target_year">
                <a-input v-model="form.target_year" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="当年考核目标" prop="current_target" ref="current_target">
                <dictionary-select
                  v-model="form.current_target"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.WATER_TARGET"
                >
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="十三五目标" prop="target" ref="target">
                <dictionary-select
                  v-model="form.target"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.WATER_TARGET"
                >
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="图片" prop="image_url" ref="image_url">
                <uploadSingleImg v-model="form.image_url"></uploadSingleImg>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="状态" prop="state" ref="state">
                <a-switch v-model="form.state" checked-children="启用" un-checked-children="停用" default-checked />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="备注" prop="note" ref="note">
                <a-input type="textarea" v-model="form.note"> </a-input>
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
import { outfallTypes } from '../data.js'
import { addSection, editSection } from '@/api/section'
import { treeData } from '@/config/areaTreeSelectData'
import mapInput from '@/components/Hczy/mapInput.vue'
import uploadSingleImg from '@/components/Hczy/Upload/uploadSingleImg.vue'
export default {
  props: {
    isAdd: {
      type: Boolean,
      default: true
    }
  },
  components: { mapInput, uploadSingleImg },
  data () {
    return {
      treeData,
      outfallTypes,
      getWaterModule: 'getWaterModule',
      title: '新建',
      labelCol: { span: 8 },
      wrapperCol: { span: 15, offset: 1 },
      confirmLoading: false,
      form: {},
      rules: {
        fracture_name: [{ required: true, message: '断面名称不能为空', trigger: ['blur', 'change'] }],
        water_id: [{ required: true, message: '所属水体不能为空', trigger: ['blur', 'change'] }],
        regionalism_id: [{ required: true, message: '所属区域不能为空', trigger: ['blur', 'change'] }],
        lon_lat: [{ required: true, message: '经纬度不能为空', trigger: ['blur', 'change'] }],
        fracture_property: [{ required: true, message: '属性不能为空', trigger: ['blur', 'change'] }],
        monitoring_frequency: [{ pattern: /^[0-9]+$/, message: '监测频率必须为整数', trigger: ['blur', 'change'] }]
      },
      visible: false,
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
  watch: {},
  mounted () {},
  created () {},
  methods: {
    showModal (data = {}) {
      console.log(data, 'kkkkkk')
      if (JSON.stringify(data) !== '{}') {
        data.state = data.state === 1
      }
      this.visible = true
      this.form = { ...{}, ...data }
      if (this.isAdd) {
        this.title = '编辑断面'
      } else {
        this.title = '新增断面'
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
            monitoring_frequency: _this.form.monitoring_frequency * 1,
            state: _this.form.state ? 1 : 0
          })
          if (_this.isAdd) {
            // 新增
            addSection(params).then(res => {
              _this.$message.success('新增成功！')
              _this.$emit('refreshTable')
              _this.visible = false
            })
          } else {
            // 编辑
            editSection(params).then(res => {
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
