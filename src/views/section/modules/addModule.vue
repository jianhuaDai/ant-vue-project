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
              <a-form-model-item label="所属区域" prop="name6" ref="name">
                <!-- <a-cascader :options="options" placeholder="" /> -->
                <a-tree-select :treeData="treeData">
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
              <a-form-model-item label="经纬度" prop="name5" ref="name5">
                <mapInput v-model="form.location" v-if="visible"></mapInput>
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
              <a-form-model-item label="状态" prop="status" ref="status">
                <a-input v-model="form.status"> </a-input>
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
        name: [{ required: true, message: '取水口名称不能为空', trigger: 'blur' }],
        site: [{ required: true, message: '地点不能为空', trigger: 'blur' }],
        principal: [{ required: true, message: '负责人不能为空', trigger: 'blur' }],
        participant: [{ required: true, message: '参与人不能为空', trigger: 'blur' }]
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
          if (_this.isAdd) {
            // 新增
            addSection(this.form).then(res => {
              _this.$message.success('新增成功！')
              _this.$emit('refreshTable')
              _this.visible = false
            })
          } else {
            // 编辑
            editSection(this.form).then(res => {
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
