<template>
  <div>
    <a-row :gutter="8">
      <a-col :span="6">
        <a-card
          title="区域数据"
          :style="{height:leftTreeHeight + 'px'}"
          :bodyStyle="{padding:'10px 10px 10px 10px'}">
          <!-- <div
            style="border:0px solid #ddd; overflow:auto;"
            :style="{height:treeHeight+'px'}"
            class="tree-scroll">
            <a-tree
              :treeData="treeData"
              @select="onSelecttree" />
          </div> -->
          <div :style="{height: carddivHeight + 'px'}">
            <AreaTree @sendSelectNode="getSelectNode"></AreaTree>
          </div>
        </a-card>
      </a-col>
      <a-col :span="18">
        <a-row :gutter="8">
          <a-col :span="24">
            <a-card :bodyStyle="{padding:'10px 20px 10px 10px'}">
              <a-form
                :form="form"
                :style="{'margin-top':'16px'}">
                <a-row>
                  <a-col :span="15">
                    <a-form-item
                      label="行政区划名称:"
                      :label-col="{span:9}"
                      :wrapper-col="{span:15}">
                      <a-input v-decorator="['name']"></a-input>
                    </a-form-item>
                  </a-col>
                  <a-col :span="15">
                    <a-form-item
                      label="行政区划编码:"
                      :label-col="{span:9}"
                      :wrapper-col="{span:15}">
                      <a-input v-decorator="['areaname']"></a-input>
                    </a-form-item>
                  </a-col>
                  <a-col :span="15">
                    <a-form-item
                      label="上级名称:"
                      :label-col="{span:9}"
                      :wrapper-col="{span:15}">
                      <a-input v-decorator="['shangjiname']"></a-input>
                    </a-form-item>
                  </a-col>
                  <a-col
                    :span="15"
                    :offset="5"
                    style="text-align:center;">
                    <a-form-item
                      label
                      :label-col="{span:0}"
                      :wrapper-col="{span:24}">
                      <a-button
                        type="default"
                        @click="addClick">新增</a-button>
                      <a-button
                        type="default"
                        style="margin-left:8px;"
                        @click="delClick">删除</a-button>
                      <a-button
                        type="primary"
                        class="resertBtn"
                        style="margin-left:8px;"
                        @click="modifyClick">编辑</a-button>
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-form>
            </a-card>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { STable } from '@/components'
import { treeData } from './data.js'
import AreaTree from '@com/Hczy/AreaTree.vue'
export default {
  components: {
    STable,
    AreaTree
  },
  data () {
    return {
      treeHeight: window.innerHeight - 205,
      tableHeight: window.innerHeight - 420,
      listHeight: window.innerHeight - 225,
      leftTreeHeight: window.innerHeight - 115,
      carddivHeight: window.innerHeight - 200,
      visible: false,
      hehutypevalue: '0',
      treeSelectData: {},
      form: this.$form.createForm(this),
      treeData: treeData,
      columns: [
        // {
        //   title: '序号',
        //   scopedSlots: { customRender: 'serial' }
        // },
        {
          title: '河湖名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '河湖编号',
          dataIndex: 'site'
        },
        {
          title: '河长名称',
          dataIndex: 'personname'
        },
        {
          title: '起点',
          dataIndex: 'start'
        },
        {
          title: '终点',
          dataIndex: 'end'
          // sorter: true
        },
        {
          title: '类型',
          dataIndex: 'type'
          // sorter: true
        },
        {
          title: '状态',
          dataIndex: 'status'
          // sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '160px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
        // alert('123')
        return [{ name: 'sss' }]
        // return getTasks(Object.assign(parameter, this.queryParam))
        //   .then(res => {
        //     return res.data
        //   })
      }
    }
  },
  created () {

  },
  methods: {
    getSelectNode (node) {},
    // 左侧树形触发
    onSelecttree (selectedKeys, info) {
      // console.log(selectedKeys)
      this.treeSelectData = info.selectedNodes[0].data.props
      console.log(info)
      console.log(info.selectedNodes[0].data.props)
    },
    // 河湖类型--查询
    hehutypeSelectClick (value) {
    },
    // 新增按钮触发
    gcAddClick () {
      this.visible = true
    },
    handleOk () {

    },
    handleCancelDel () {
      this.visible = false
    },
    // 查询按钮触发
    searchClick () {

    },
    // 新增按钮触发
    addClick () {

    },
    // 删除按钮触发
    delClick () {

    },
    // 编辑按钮触发
    modifyClick () {

    },
    // 重置按钮触发
    resertClick () {

    }
  }
}
</script>
<style scoped>
</style>
