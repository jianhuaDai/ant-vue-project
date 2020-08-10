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
              <a-form-model-item label="所属区域" prop="regionalism_id" ref="regionalism_id">
                <a-tree-select v-model="form.regionalism_id" :treeData="treeData">
                </a-tree-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="所属岸线" prop="river_line_id" ref="river_line_id">
                <a-input v-model="form.river_line_id"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="采砂公司" prop="company" ref="company">
                <a-input v-model="form.company"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="法人" prop="legal_person" ref="legal_person">
                <a-input v-model="form.legal_person"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="采砂船号" prop="hull_no" ref="hull_no">
                <a-input v-model="form.hull_no"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="采砂船主" prop="ship_owner" ref="ship_owner">
                <a-input v-model="form.ship_owner">
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="采砂规划" prop="plane" ref="plane">
                <a-input v-model="form.plane" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="船舶和船员证书" prop="certificate" ref="certificate">
                <uploadMutiImg v-model="form.certificate"></uploadMutiImg>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="开采范围起点" prop="start_at" ref="start_at">
                <mapInput v-model="form.start_at" v-if="visible"></mapInput>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="开采范围终点" prop="end_at" ref="end_at">
                <mapInput v-model="form.end_at" v-if="visible"></mapInput>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="采砂设备" prop="equipment" ref="equipment">
                <a-input v-model="form.equipment" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </a-spin>

      <template slot="footer">
        <a-button type="primary" @click="handleOk">保存</a-button>
        <a-button type="primary" @click="handleOk2">提交审批</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { treeData } from '@/config/areaTreeSelectData'
import { addSendMing, editSendMing } from '@/api/sendMing'
import { getRiversAndLakes } from '@/api/infomanage'
import mapInput from '@/components/Hczy/mapInput.vue'
import uploadMutiImg from '@/components/Hczy/Upload/uploadMutiImg.vue'
export default {
  props: {},
  components: { mapInput, uploadMutiImg },
  data () {
    return {
      riversAndLakes: [],
      treeData,
      getWaterModule: 'getWaterModule',
      title: '新建',
      labelCol: { span: 8 },
      wrapperCol: { span: 15, offset: 1 },
      confirmLoading: false,
      form: {},
      rules: {
        company: [{ required: true, message: '采砂公司不能为空', trigger: ['blur', 'change'] }],
        legal_person: [{ required: true, message: '法人不能为空', trigger: ['blur', 'change'] }]
      },
      visible: false
    }
  },
  watch: {},
  mounted () {},
  created () {
    getRiversAndLakes({ page: 1, page_size: 0 }).then(res => {
      this.riversAndLakes = res.data.list
    })
  },
  methods: {
    showModal (data = {}) {
      this.visible = true
      if (JSON.stringify(data) !== '{}') {
        data.has_video = data.has_video === 1
      }
      this.form = { ...{}, ...data }
      if (this.form.sewage_id) {
        this.title = '编辑采砂'
      } else {
        this.title = '新增采砂'
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
            approval_status: 0
          })
          if (!_this.form.sand_mining_id) {
            // 新增
            addSendMing(params).then(() => {
              _this.$message.success('新增成功！')
              _this.$emit('refreshTable')
              _this.visible = false
            })
          } else {
            // 编辑
            editSendMing(_this.form.sand_mining_id, params).then(() => {
              _this.$message.success('编辑成功！')
              _this.$emit('refreshTable')
              _this.visible = false
            })
          }
        }
      })
    },
    handleOk2 (e) {
      const _this = this
      this.$refs.form.validate(valid => {
        if (valid) {
          const params = Object.assign({}, _this.form, {
            approval_status: 1
          })
          if (!_this.form.sand_mining_id) {
            // 新增
            addSendMing(params).then(() => {
              _this.$message.success('新增成功！')
              _this.$emit('refreshTable')
              _this.visible = false
            })
          } else {
            // 编辑
            editSendMing(_this.form.sand_mining_id, params).then(() => {
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
