<template>
  <div>
    <a-card :bordered="false" :title="title">
      <a-spin :spinning="confirmLoading">
        <a-form-model ref="form" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-model-item
                label="方案名称"
                :labelCol="{span:6}"
                prop="name"
                ref="name"
                @blur="() => {$refs.name.onFieldBlur()}">
                <a-input v-model="form.name"/>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-model-item label="任务地点" :labelCol="{span:6}" prop="location" ref="address" @blur="() => {$refs.address.onFieldBlur()}">
                <a-input v-model="form.location"/>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-model-item label="负责人" prop="principal" :labelCol="{span:6}" ref="leader" @blur="() => {$refs.leader.onFieldBlur()}">
                <a-input v-model="form.principal"/>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-model-item
                label="参与人员"
                :labelCol="{span:6}"
                style="margin-bottom: 0"
                prop="participant"
                ref="participant"
                @blur="() => {$refs.participant.onFieldBlur()}">
                <!--            <a-input v-model="form.participant"/>-->
                <a-select
                  mode="multiple"
                  style="width: 100%"
                  v-model="form.participant"
                  placeholder="请选择参与人员"
                >
                  <a-select-option :key="item.id" v-for="item in participantData">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-model-item
                label="具体内容"
                :labelCol="{span:6}"
                style="margin-bottom: 0"
                prop="context"
                ref="context"
                @blur="() => {$refs.context.onFieldBlur()}">
                <a-textarea
                  v-model="form.context"
                  placeholder=""
                  auto-size
                />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </a-spin>
    </a-card>
    <a-card :bordered="false" style="margin-top: 12px" title="监测点" :bodyStyle="{padding: 0}" >
      <template slot="extra">
        <a-radio-group :default-value="1" v-model="pointType" button-style="solid">
          <a-radio-button :value="1">
            大气
          </a-radio-button>
          <a-radio-button :value="2">
            水质
          </a-radio-button>
        </a-radio-group>
      </template>
      <div style="height: 540px">
        <map-view @mapLoad="mapLoaded" @loaded="sceneLoaded" :options="mapOption"></map-view>
      </div>
    </a-card>
    <div class="bottom-operate">
      <a-button style="margin-right: 24px" @click="()=>{this.$router.go(-1)}">返回</a-button>
      <a-button type="primary" style="margin-right: 48px" @click="submit">提交</a-button>
    </div>
  </div>
</template>

<script>
  import PageView from '../../layouts/PageView'
  import { STable, Ellipsis } from '@/components'
  import { getSolutions, addSolution, updateSolution } from '@/api/task'
  import City from '../map/config/City'
  import SolutionModule from './modules/SolutionModule'
  import MapView from '@/components/Hczy/Map/MapView'
  import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
  import MapboxDraw from '@mapbox/mapbox-gl-draw'
  import { PointLayer } from '@antv/l7'
  // var MapboxDraw = require('@mapbox/mapbox-gl-draw')
  let Draw = null
  let Scene = null
  let pointLayers = null
  export default {
    name: 'SolutionDetail',
    components: { PageView, STable, Ellipsis, SolutionModule, MapView },
    methods: {
      submit () {
        this.$refs.form.validate(valid => {
          if (valid) {
            if (!this.form.id) {
              addSolution(this.form).then(res => {
                this.$message.success('提交成功')
                this.$router.go(-1)
              })
            } else {
              updateSolution(this.form).then(res => {
                this.$message.success('提交成功')
                this.$router.go(-1)
              })
            }
          }
        })
      },
      renderPoint () {
        this.form.geo_info = Draw.getAll()
        console.log('render point:')
        if (pointLayers) {
          console.log('render=== point:')
          pointLayers.setData(this.form.geo_info)
        }
      },
      sceneLoaded (scene) {
        console.log('===scene load===')
        Scene = scene
        scene.addImage(1, '/icons/outfall.svg')
        scene.addImage(2, '/icons/water.svg')

        pointLayers = new PointLayer({
          name: 'MonitorPoint'
        }).source(this.form.geo_info).shape('type', (type) => {
          return type
        }).size(12).select(true)
        pointLayers.on('click', (e) => {
          pointLayers.setSelect(e.feature.id)
        })
        Scene.addLayer(pointLayers)
        Draw = new MapboxDraw({
          displayControlsDefault: false,
          controls: { point: true, trash: true, polygon: false, line_string: true }
        })
        scene.map.addControl(Draw, 'top-right')
        scene.map.on('draw.delete', (e) => {
          this.renderPoint()
        })
        scene.map.on('draw.create', (e) => {
          Draw.setFeatureProperty(e.features[0].id, 'type', this.pointType)
          this.renderPoint()
          console.log('draw', Draw.get(e.features[0].id))
        })
      },
      mapLoaded (map) {
        map.on('click', (e) => {
          console.log('map:', map.getZoom(), map.getCenter(), map.getPitch(), map.getBearing())
        })
      },
      getSerial (num) {
        return `S-${num}`
      },
      cityChange (value) {
        this.queryParam.area_id = this.city.value.slice(-1)[0]
      },
      goTo (record) {
        this.$router.push({ path: '/task/solution', query: { taskId: record.id } })
      },
      resetQuery () {
        this.queryParam.task_id = { task_id: this.queryParam.task_id }
        this.city.value = ['32']
      },
      handleEditOrNew (record) {
        this.$refs.solutionModel.showModal(record)
      },
      handleDel (record) {
        this.$confirm({
          title: '删除操作',
          content: `确定要删除${record.name}吗`,
          onOk () {
          },
          onCancel () {
          }
        })
      }
    },
    created () {
      const solutionId = this.$route.query.solutionId
      this.form.task_id = this.$route.query.taskId
      if (solutionId) {
        this.title = '方案编辑'
        getSolutions({ id: solutionId }).then(res => {
          this.form = { ...this.form, ...res.data.list[0] }
          if (this.form.geo_info && !this.form.geo_info.features) {
            this.form.geo_info = {
              type: 'FeatureCollection',
              features: []
            }
          }
          if (this.form.geo_info.features.length > 0) {
            Draw.add(this.form.geo_info)
            pointLayers.setData(this.form.geo_info)
          }
        })
      }
    },
    data () {
      return {
        mapOption: {
          center: [118.88803780820865, 32.432131439304996],
          pitch: 47,
          zoom: 6.2
        },
        featureCollection: {
          type: 'FeatureCollection',
          features: []
        },
        pointType: 1,
        participantData: [
          {
            id: 1,
            name: '李明'
          }, {
            id: 2,
            name: '方楠'
          }, {
            id: 3,
            name: '史青'
          }
        ],
        title: '方案制定',
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
        status: true,
        confirmLoading: false,
        form: {
          id: '',
          name: '',
          area_id: '',
          participant: undefined,
          principal: '',
          geo_info: {
            type: 'FeatureCollection',
            features: []
          },
          location: '',
          time: '',
          context: ''
        },
        rules: {
          name: [
            { required: true, message: '任务名称不能为空', trigger: 'blur' }
          ],
          location: [
            { required: true, message: '地点不能为空', trigger: 'blur' }
          ],
          principal: [
            { required: true, message: '负责人不能为空', trigger: 'blur' }
          ],
          participant: [
            { required: true, message: '参与人不能为空', trigger: 'blur' }
          ],
          context: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ]
        },
        selectedRowKeys: [],
        selectedRows: [],
        city: {
          options: City,
          fieldNames: {
            label: 'name',
            value: 'id',
            children: 'children'
          },
          value: ['32'],
          city: {
            options: City,
            fieldNames: {
              label: 'name',
              value: 'id',
              children: 'children'
            },
            value: ['32']
          }
        }

      }
    },
    filters: {
    }
  }
</script>
<style scoped>
  .bottom-operate {
    width: 100%;
    display: flex;
    position: fixed;
    background: #fff;
    height: 60px;
    bottom: 0;
    right: 0;
    align-items: center;
    justify-content: flex-end;
    z-index: 10;
    box-shadow: 0 -1px 2px rgba(0,0,0,.03);
  }
</style>
