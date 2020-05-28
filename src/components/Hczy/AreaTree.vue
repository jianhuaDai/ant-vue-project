<template>
  <div>
    <a-tree
      :tree-data="treeData"
      :replace-fields="replaceFields"
      @select="onSelect"
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
        title: 'name'
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

<style></style>
