<template>
      <keep-alive v-if="$route.meta.isAlive">
        <router-view />
      </keep-alive>
      <router-view v-else />
</template>
<script>
export default {
}
</script>
<style lang="less" scoped>
</style>