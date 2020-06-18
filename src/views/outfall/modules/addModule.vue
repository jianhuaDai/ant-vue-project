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
              <a-form-model-item label="排污口名称" prop="sewage_name" ref="sewage_name">
                <a-input v-model="form.sewage_name" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="排口来源" prop="come_from" ref="come_from">
                <a-input v-model="form.come_from"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="排口类型" prop="sewage_type" ref="sewage_type">
                <dictionary-select
                  v-model="form.sewage_type"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.DIC_SEWAGE_TYPE"
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
              <a-form-model-item label="所属区域" prop="regionalism_id" ref="regionalism_id">
                <a-tree-select v-model="form.regionalism_id" :treeData="treeData">
                </a-tree-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="监测频次" prop="frequency" ref="frequency">
                <a-input v-model="form.frequency">
                  <template slot="addonAfter">
                    次/月
                  </template>
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="管径" prop="diameter" ref="diameter">
                <a-input v-model="form.diameter" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="排水去向" prop="in_river_way" ref="in_river_way">
                <dictionary-select
                  v-model="form.in_river_way"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.DIC_SEWAGE_IN_WAY"
                >
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="所属水体" prop="water_id" ref="water_id">
                <a-select show-search placeholder="" option-filter-prop="children" v-model="form.water_id">
                  <a-select-option v-for="item in riversAndLakes" :value="item.water_id" :key="item.water_id">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="关注级别" prop="attention_level" ref="attention_level">
                <dictionary-select
                  v-model="form.attention_level"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.ATTENTION_LEVEL"
                >
                </dictionary-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="位置" prop="location" ref="location">
                <a-input v-model="form.location" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="设计入河量" prop="in_river_plan" ref="in_river_plan">
                <a-input v-model="form.in_river_plan">
                  <template slot="addonAfter">
                    t/a
                  </template>
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="是否有视频" prop="has_video" ref="has_video">
                <a-switch v-model="form.has_video" checked-children="开" un-checked-children="关" default-checked />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="排放方式" prop="sewage_way" ref="sewage_way">
                <dictionary-select
                  v-model="form.sewage_way"
                  :insert-option-all="false"
                  :select-first="false"
                  :dictionary-type="DictionaryEnum.DIC_SEWAGE_WAY"
                >
                </dictionary-select>
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
import { addOutfall, editOutfall } from '@/api/outfall'
import { getRiversAndLakes } from '@/api/infomanage'
import mapInput from '@/components/Hczy/mapInput.vue'
export default {
  props: {},
  components: { mapInput },
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
        sewage_name: [{ required: true, message: '排污口名称不能为空', trigger: ['blur', 'change'] }],
        sewage_type: [{ required: true, message: '排口类型不能为空', trigger: ['blur', 'change'] }],
        lon_lat: [{ required: true, message: '经纬度不能为空', trigger: ['blur', 'change'] }],
        regionalism_id: [{ required: true, message: '所属区域不能为空', trigger: ['blur', 'change'] }],
        frequency: [{ pattern: /^[0-9]+$/, message: '请输入整数', trigger: ['blur', 'change'] }],
        in_river_plan: [{ pattern: /^[0-9]+$/, message: '请输入整数', trigger: ['blur', 'change'] }]
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
          const params = Object.assign({}, _this.form, {
            has_video: _this.form.has_video ? 1 : -1,
            frequency: _this.form.frequency * 1,
            in_river_plan: _this.form.in_river_plan * 1,
            diameter: _this.form.diameter * 1
          })
          if (!_this.form.sewage_id) {
            // 新增
            addOutfall(params).then(() => {
              _this.$message.success('新增成功！')
              _this.$emit('refreshTable')
              _this.visible = false
            })
          } else {
            // 编辑
            editOutfall(_this.form.sewage_id, params).then(() => {
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
