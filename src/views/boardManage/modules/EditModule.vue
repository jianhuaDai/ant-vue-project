<template>
  <div>
    <a-modal v-model="visible" @ok="handleOk" width="60%" :title="title" :confirmLoading="confirmLoading">
      <a-spin :spinning="confirmLoading">
        <a-form-model ref="form" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-row :gutter="24">
            <a-col :md="12" :sm="24">
              <a-form-model-item label="公示牌编码" prop="billboard_num" ref="billboard_num">
                <a-input v-model="form.billboard_num"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-model-item label="河道名称" prop="water_id">
                <!-- <a-input v-model="form.water_id"></a-input> -->
                <a-select v-model="form.water_id">
                  <a-select-option v-for="item in riverData" :key="item.water_id" :value="item.water_id">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :md="12" :sm="24">
              <a-form-model-item label="行政区域">
                <a-tree-select v-model="form.regionalism_id" :treeData="regionalismTree"> </a-tree-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-model-item label="河道简介" prop="river_brief">
                <a-input v-model="form.river_brief"></a-input>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :md="12" :sm="24">
              <a-form-model-item label="经纬度" prop="lon_lat">
                <mapInput v-model="form.lon_lat" v-if="visible"></mapInput>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :md="12" :sm="24">
              <a-form-model-item prop="chief_task" label="河长任务">
                <a-input v-model="form.chief_task"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-model-item label="河长办电话" prop="organ_tel">
                <a-input v-model="form.organ_tel"></a-input>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :md="12" :sm="24">
              <a-form-model-item prop="supervisory_tel" label="河湖监督电话">
                <a-input v-model="form.supervisory_tel"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-model-item prop="report_tel" label="环境举报电话">
                <a-input v-model="form.report_tel" placeholder=""> </a-input>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :md="12" :sm="24">
              <a-form-model-item prop="img_url" label="照片">
                <uploadSingleImg v-model="form.image_url"></uploadSingleImg>
              </a-form-model-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-model-item prop="note" label="备注">
                <a-input type="textarea" v-model="form.note" placeholder=""> </a-input>
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
import { treeData } from '@/config/areaTreeSelectData'
import uploadSingleImg from '@/components/Hczy/Upload/uploadSingleImg.vue'
import { getRiverlakeList } from '@/api/riverlakemanage'
import { editBoard, addBoard, getBoardById } from '@/api/boardManage'
import mapInput from '@/components/Hczy/mapInput.vue'
export default {
  props: {
    orgData: {
      type: Array,
      default: () => []
    }
  },
  components: { uploadSingleImg, mapInput },
  data () {
    return {
      regionalismTree: treeData,
      title: '新增',
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      confirmLoading: false,
      form: {},
      rules: {
        billboard_num: [{ required: true, message: '公示牌编号不能为空', trigger: 'blur' }],
        water_id: [{ required: true, message: '请选择河道', trigger: 'change' }],
        lon_lat: [{ required: true, message: '请输入经纬度', trigger: 'change' }],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '手机号格式不正确' }
        ]
      },
      layout: 'horizontal',
      visible: false,
      riverData: []
    }
  },
  watch: {},
  created () {
    this.initRiverData()
  },
  methods: {
    initRiverData () {
      getRiverlakeList({ page_size: 0 }).then(res => {
        this.riverData = res.data.list
      })
    },
    showModal (data = {}) {
      this.title = data.employee_id ? '编辑' : '新建'
      this.visible = true
      if (data.billboard_id) {
        this.confirmLoading = true
        getBoardById(data.billboard_id)
          .then(res => {
            this.form = { ...{}, ...res.data }
            console.log('chief: ', this.form)
          })
          .finally(() => {
            this.confirmLoading = false
          })
      } else {
        this.form = { ...{}, data }
      }
      setTimeout(() => {
        this.$refs.form.clearValidate()
      }, 1)
    },
    handleOk (e) {
      const _this = this
      this.$refs.form.validate(valid => {
        if (valid) {
          const params = _this.form
          if (params.billboard_id) {
            editBoard(params)
              .then(res => {
                _this.$message.success('编辑成功！')
                _this.visible = false
                _this.$emit('ok')
              })
              .catch(err => {
                _this.$message.error(err.msg || '编辑失败！')
              })
          } else {
            addBoard(params)
              .then(res => {
                _this.$message.success('新增成功！')
                _this.visible = false
                _this.$emit('ok')
              })
              .catch(err => {
                _this.$message.error(err.msg || '新增失败！')
              })
          }
        }
      })
    }
  },
  computed: {}
}
</script>

<style scoped></style>
