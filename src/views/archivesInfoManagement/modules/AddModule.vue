<template>
  <div>
    <a-modal v-model="visible" @ok="handleOk" width="40%" :title="title" :confirmLoading="confirmLoading">
      <a-spin :spinning="confirmLoading">
        <a-form-model ref="form" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item label="河湖名称" prop="water_id" ref="water_id">
            <a-select show-search placeholder="Select a person" option-filter-prop="children" v-model="form.water_id">
              <a-select-option v-for="item in riversAndLakes" :value="item.water_id" :key="item.water_id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="区域选择" prop="regionalism_id" ref="regionalism_id">
            <a-tree-select v-model="form.regionalism_id" :treeData="options"> </a-tree-select>
          </a-form-model-item>
          <a-form-model-item label="标题" prop="site" ref="address">
            <a-input v-model="form.title" />
          </a-form-model-item>
          <a-form-model-item label="上传文件" prop="file" ref="leader">
            <a-upload :customRequest="customRequest" :showUploadList="false" :multiple="true">
              <a-button> <a-icon type="upload" /> Upload </a-button>
            </a-upload>
            <div v-for="(item, index) in fileList" :key="index">
              {{ item.name }}
              <span @click="fileList.splice(index, 1)"><a-icon type="delete" /></span>
            </div>
          </a-form-model-item>
          <a-form-model-item label="发布人">
            <a-input v-model="form.author" />
          </a-form-model-item>
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
import { treeData } from '@/config/areaTree'
import { addArchivesInfo, getRiversAndLakes, updateArchivesInfo } from '@/api/infomanage'
import { uploadSingle } from '@/api/upload'
export default {
  props: {
    orgData: {
      type: Array,
      default: () => []
    },
    type: {
      type: Number,
      default: () => 1
    }
  },
  data () {
    return {
      title: '新增',
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      status: true,
      confirmLoading: false,
      form: {
        water_id: '',
        title: '',
        author: '',
        attachment_url: [],
        type: 1,
        regionalism_id: ''
      },
      rules: {
        water_id: [{ required: true, message: '河湖名称不能为空', trigger: 'blur' }]
      },
      layout: 'horizontal',
      visible: false,
      fileList: [],
      options: treeData,
      fieldNames: {
        title: 'name',
        key: 'id',
        children: 'children'
      },
      riversAndLakes: []
    }
  },
  created () {
    getRiversAndLakes({ page: 1, page_size: 0 }).then(res => {
      console.log(res.data, 'oooooo')
      this.riversAndLakes = res.data.list
    })
    this.setData()
  },
  watch: {},
  methods: {
    setData () {
      this.options = this.options.map(item => {
        if (item.children && item.children.length > 0) {
          item.children = item.children.map(child => {
            if (child.children && child.children.length > 0) {
              child.children = child.children.map(son => {
                return {
                  ...son,
                  label: son.name,
                  value: son.id
                }
              })
            }
            return {
              ...child,
              label: child.name,
              value: child.id
            }
          })
        }
        return {
          ...item,
          label: item.name,
          value: item.id
        }
      })
    },
    onChange (value) {
      value.length > 0 && (this.form.regionalism_id = value[value.length - 1])
    },
    customRequest (data) {
      const formData = new FormData()
      formData.append('file', data.file)
      uploadSingle(formData).then(res => {
        this.fileList.push({
          name: data.file.name,
          url: res.data
        })
      })
    },
    showModal (data = {}) {
      this.visible = true
      this.form = {
        ...{
          water_id: '',
          title: '',
          author: '',
          attachment_url: [],
          type: 1,
          regionalism_id: ''
        },
        ...data
      }
      this.fileList = this.form.attachment_url
      if (this.form.document_id) {
        this.title = '编辑'
      } else {
        this.title = '新建'
      }
      setTimeout(() => {
        this.$refs.form.clearValidate()
      }, 1)
    },
    handleOk (e) {
      const _this = this
      this.$refs.form.validate(valid => {
        if (valid) {
          // _this.confirmLoading = true
          const params = Object.assign({}, _this.form, { type: this.type, attachment_url: this.fileList })
          if (!_this.form.document_id) {
            addArchivesInfo(params).then(res => {
              this.$message.success('新增成功！')
              this.$emit('refreshTable')
              _this.visible = false
            })
          } else {
            // 编辑
            updateArchivesInfo(_this.form.document_id, params).then(res => {
              this.$message.success('修改成功！')
              this.$emit('refreshTable')
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
  },
  computed: {}
}
</script>

<style scoped></style>
