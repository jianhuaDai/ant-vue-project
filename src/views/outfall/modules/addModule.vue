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
              <a-form-model-item label="排污口名称" prop="name" ref="name">
                <a-input v-model="form.name" />
              </a-form-model-item>
            </a-col>
            <!-- <a-col :span="12">
              <a-form-model-item label="位置" prop="name2" ref="name">
                <a-cascader :options="options" placeholder="" />
              </a-form-model-item>
            </a-col> -->
            <a-col :span="12">
              <a-form-model-item label="排口来源" prop="name3" ref="name">
                <a-input v-model="form.name3" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="排口类型" prop="name4" ref="name">
                <a-select v-model="form.name4" placeholder="">
                  <a-select-option v-for="itemType in outfallTypes" :key="itemType.key">
                    {{ itemType.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="经纬度" prop="name5" ref="name5">
                <mapInput v-model="form.location" v-if="visible"></mapInput>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="所属区域" prop="name6" ref="name">
                <a-cascader :options="options" placeholder="" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="监测频次" prop="name7" ref="name">
                <a-input v-model="form.name5">
                  <template slot="addonAfter">
                    次/月
                  </template>
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="管径" prop="name9" ref="name">
                <a-input v-model="form.name9" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="排水去向" prop="name10" ref="name">
                <a-select v-model="form.name10">
                  <a-select-option v-for="item in drainageDirection" :key="item.key" :value="item.key">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="所属水体" prop="name11" ref="name">
                <a-input v-model="form.name11" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="关注级别" prop="name12" ref="name">
                <a-select v-model="form.name12">
                  <a-select-option value="1">省级</a-select-option>
                  <a-select-option value="2">市级</a-select-option>
                  <a-select-option value="3">区县级</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="所属河长" prop="name13" ref="name">
                <a-input v-model="form.name13" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="设计入河量" prop="name14" ref="name">
                <a-input v-model="form.name14">
                  <template slot="addonAfter">
                    t/a
                  </template>
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="是否有视频" prop="name15" ref="name">
                <a-switch checked-children="开" un-checked-children="关" default-checked />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="排放方式" prop="name17" ref="name">
                <a-select v-model="form.name17" placeholder="">
                  <a-select-option value="1">连续</a-select-option>
                  <a-select-option value="2">间接</a-select-option>
                  <a-select-option value="3">季节</a-select-option>
                </a-select>
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
import { outfallTypes, drainageDirection } from '../data.js'
import { uploadSingle } from '@/api/upload'
import mapInput from '@/components/Hczy/mapInput.vue'
export default {
  props: {
    orgData: {
      type: Array,
      default: () => []
    },
    formData: {
      type: Object,
      default: function () {
        return {
          id: '',
          name: '',
          site: '',
          principal: '',
          participant: '',
          progress: '',
          imageUrl: '',
          location: '1, 1'
        }
      }
    }
  },
  components: { mapInput },
  data () {
    return {
      outfallTypes,
      drainageDirection,
      getWaterModule: 'getWaterModule',
      fileList: [],
      title: '新建',
      labelCol: { span: 8 },
      wrapperCol: { span: 15, offset: 1 },
      status: true,
      confirmLoading: false,
      form: {},
      rules: {
        name: [{ required: true, message: '取水口名称不能为空', trigger: 'blur' }],
        site: [{ required: true, message: '地点不能为空', trigger: 'blur' }],
        principal: [{ required: true, message: '负责人不能为空', trigger: 'blur' }],
        participant: [{ required: true, message: '参与人不能为空', trigger: 'blur' }]
      },
      layout: 'horizontal',
      visible: false,
      showMapDom: false,
      showImage: false,
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
    form: {
      handler (value) {
        this.showImage = value.imageUrl
      },
      deep: true
    }
  },
  mounted () {},
  created () {
    this.form = this.formData
  },
  methods: {
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
        this.title = '编辑排污口'
      } else {
        this.title = '新增排污口'
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
