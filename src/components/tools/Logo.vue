<template>
  <div class="logo" :style="{paddingLeft: collapsed?'12px':'24px'}">
    <router-link :to="{name:'Home'}">
<!--      <img class="expand" style="width: calc(100% - 24px);height: auto" src="@/assets/logo2.png" />-->
      <img src="@/assets/logo.svg">
      <h1 :style="{color: '#000'}" v-if="showTitle">{{ title }}</h1>
<!--      <img src="@/assets/logo.svg" class="collapse" />-->
    </router-link>
  </div>
</template>

<script>
// import LogoSvg from '@/assets/logo.svg?inline'

export default {
  name: 'Logo',
  components: {
    // LogoSvg
  },
  props: {
    title: {
      type: String,
      default: '江苏河长制',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    },
    collapsed: {
      type: Boolean,
      default: false,
      required: false
    }
  }
}
</script>
<style scoped>
  .ant-layout-sider-collapsed img.expand {
    opacity: 0;
    display: none;
  }
  img.expand {
    opacity: 1;
    transition: e 2s;
    transition-delay: 1s;
  }
  img.collapse {
    display: none;
  }
  .ant-layout-sider-collapsed img.collapse {
    display: inherit;
  }
</style>
