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
              <a-form-model-item label="水功能名称" prop="func_name" ref="func_name">
                <a-input v-model="form.func_name" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="所属区域" prop="regionalism_id" ref="regionalism_id">
                <a-tree-select v-model="form.regionalism_id" :treeData="regionalismTreeData">
                </a-tree-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="位置" prop="location" ref="location">
                <a-input v-model="form.location" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="级别类型" prop="functional_type" ref="functional_type">
                <a-tree-select v-model="form.functional_type" :allowClear="true" :treeData="treeData" :treeDataSimpleMode="true" placeholder="" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="经纬度" prop="lon_lat" ref="lon_lat">
                <mapInput v-model="form.lon_lat" v-if="visible"></mapInput>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="水体类型" prop="water_type" ref="water_type">
                <dictionary-select
                  v-model="form.water_type"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.WATER_TYPE"
                >
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="是否为考核水功能区"
                prop="is_examine"
                ref="is_examine"
                :labelCol="{ span: 12 }"
                :wrapperCol="{ span: 10 }"
              >
                <a-switch v-model="form.is_examine" checked-children="开" un-checked-children="关" default-checked />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="是否达标" prop="name8" ref="name">
                <a-switch v-model="form.pass" checked-children="开" un-checked-children="关" default-checked />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="水质目标" prop="water_target" ref="water_target">
                <dictionary-select
                  v-model="form.water_target"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.WATER_TARGET"
                >
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="断面名称" prop="fracture_name" ref="fracture_name">
                <a-select v-model="form.fracture_name">
                  <a-select-option v-for="item in fractureList" :key="item.fracture_id" :value="item.fracture_id">
                    {{ item.fracture_name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="图片" prop="image_url" ref="image_url">
                <uploadSingleImg v-model="form.image_url"></uploadSingleImg>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="长度/面积" prop="area" ref="area">
                <a-input v-model="form.area" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="备注" prop="note" ref="note">
                <a-input type="textarea" v-model="form.note" />
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
import { options } from '../data.js'
import { getSectionList } from '@/api/section'
import { addWaterFun, editWaterFun } from '@/api/waterfun'
import { treeData as regionalismTreeData } from '@/config/areaTreeSelectData'
import { uploadSingle } from '@/api/upload'
import mapInput from '@/components/Hczy/mapInput.vue'
import uploadSingleImg from '@/components/Hczy/Upload/uploadSingleImg.vue'
export default {
  props: {
    treeData: {
      type: Array,
      default: () => []
    }
  },
  components: { mapInput, uploadSingleImg },
  data () {
    return {
      regionalismTreeData,
      showImage: false,
      showMapDom: false,
      getWaterMethods: [],
      scaleTypes: [],
      purposes: [],
      getWaterModule: 'getWaterModule',
      fileList: [],
      title: '新建',
      labelCol: { span: 7 },
      wrapperCol: { span: 15, offset: 1 },
      status: true,
      confirmLoading: false,
      loading: false,
      rules: {
        func_name: [{ required: true, message: '功能区名称不能为空', trigger: ['blur', 'change'] }],
        regionalism_id: [{ required: true, message: '所属区域不能为空', trigger: ['blur', 'change'] }],
        functional_type: [{ required: true, message: '级别类型不能为空', trigger: ['blur', 'change'] }],
        lon_lat: [{ required: true, message: '经纬度不能为空', trigger: ['blur', 'change'] }]
      },
      layout: 'horizontal',
      visible: false,
      options: options,
      form: {},
      fractureList: []
    }
  },
  watch: {
    form: {
      handler (value) {
        this.showImage = value.imageUrl
      },
      deep: true
    }
  },
  created () {
    this.getFractureList()
  },
  methods: {
    getFractureList () {
      getSectionList(
        { page: 1, page_size: 0 }
      ).then((res) => {
        this.fractureList = res.data.list
      })
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
      console.log(data, 'showModal')
      if (JSON.stringify(data) !== '{}') {
        data.is_examine = !!data.is_examine
        data.pass = !!data.pass
      }
      this.visible = true
      this.form = { ...{}, ...data }
      if (this.form.func_id) {
        this.title = '编辑水功能区'
      } else {
        this.title = '新增水功能区'
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
            is_examine: _this.form.is_examine ? 1 : -1,
            pass: _this.form.pass ? 1 : -1
          })
          if (!_this.form.func_id) {
            addWaterFun(params).then((res) => {
              _this.$message.success('新增成功！')
              _this.$emit('refreshTable')
              _this.visible = false
            })
          } else {
            editWaterFun(_this.form.func_id, params).then(() => {
              _this.$message.success('编辑成功！')
              _this.$emit('refreshTable')
              _this.visible = false
            })
          }
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
.getWaterModule {
  .ant-form-item-label {
    text-align: left;
    white-space: pre-wrap;
  }
  .ant-modal-body {
    padding-bottom: 0;
  }
  .avatar-uploader {
    .upload-icon {
      width: 128px;
      height: 128px;
      font-size: 32px;
      color: #999;
    }
  }
}
</style>
