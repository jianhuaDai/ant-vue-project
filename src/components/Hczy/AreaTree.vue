<template>
  <div class="tree">
    <a-tree-select
      :tree-data="treeData"
      :replaceFields="replaceFields"
      @select="onSelect"
      :props="replaceFields"
      :defaultExpandedKeys="['32']"
    />
  </div>
</template>

<script>
import { treeData } from '../../config/areaTree.js'
export default {
  data () {
    return {
      replaceFields: {
        key: 'id',
        title: 'name',
        value: 'id'
      },
      treeData
    }
  },
  methods: {
    onSelect (keys, e) {
      this.$emit('sendSelectNode', keys)
    }
  }
}
</script>

<style lang="less" scoped>
.tree {
  height: 100%;
  width: 100%;
  overflow: auto;
}
</style>
