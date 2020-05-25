<template>
  <a-layout-sider
    :collapsedWidth="56"
    :class="['sider', isDesktop() ? null : 'shadow', theme, fixSiderbar ? 'ant-fixed-sidemenu' : null ]"
    width="256px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null">
    <logo :collapsed="collapsed" />
    <s-menu
      :collapsed="collapsed"
      :menu="menus"
      :theme="theme"
      :mode="mode"
      @select="onSelect"
      style="padding: 16px 0px"></s-menu>
<!--    <user-menu class="header-index-right"></user-menu>-->
    <img src="@/assets/icons/icon-show.svg" class="btn-fold" @click="toggle" v-if="collapsed">
    <img src="@/assets/icons/icon-fold.svg" class="btn-fold" @click="toggle" v-else>
  </a-layout-sider>
</template>

<script>
import Logo from '@/components/tools/Logo'
import UserMenu from "../tools/UserMenu";
import SMenu from './index'
import { mixin, mixinDevice } from '@/utils/mixin'

export default {
  name: 'SideMenu',
  components: { Logo, SMenu, UserMenu },
  mixins: [mixin, mixinDevice],
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    }
  },
  methods: {
    onSelect (obj) {
      this.$emit('menuSelect', obj)
    },
    toggle () {
      this.$emit('toggle')
    }
  }
}
</script>
<style scoped lang="less">
  @import '../index.less';
  .btn-fold {
    width: 16px;
    position: absolute;
    right: -16px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
  .btn-fold:hover {
    opacity: 0.6;
  }
  /*.sider.ant-fixed-sidemenu {*/
  /*  box-shadow: unset;*/
  /*}*/
  .ant-menu /deep/ .ant-menu-item.ant-menu-item-selected::after{
    right: unset;
    left: 0;
    /*<!--border-right:2px solid @primary-color;-->*/
  }
  /*<!--.ant-menu-vertical /deep/ .ant-menu-item.ant-menu-item-selected::after{-->*/
  /*<!--  right: auto;-->*/
  /*<!--  left: 0;-->*/
  /*<!--  opacity: 1;-->*/
  /*<!--  transform: scaleY(0.6);-->*/
  /*<!--  border-right:2px solid @primary-color;-->*/
  /*<!--}-->*/
   .ant-menu /deep/ .ant-menu-item.ant-menu-item-selected {
    /*<!--background-color: @layout-body-background;-->*/
    background-color: #fff;

  }

  .header-animat{
    position: relative;
    z-index: @ant-global-header-zindex;
  }
  .showHeader-enter-active {
    transition: all 0.25s ease;
  }
  .showHeader-leave-active {
    transition: all 0.5s ease;
  }
  .showHeader-enter, .showHeader-leave-to {
    opacity: 0;
  }
  .ant-menu {
    min-height: calc(100% - 210px);
  }
</style>
