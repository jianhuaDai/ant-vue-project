<template>
  <span class="hc-marker" :data-id="dataId">
    <img :src="icon"/>
    <span class="detail" v-show="info!==''||name!==''" :style="{backgroundColor: bgColor}">
      <span v-if="info!==''" class="info" :style="{color: bgColor}" v-html="info"></span>
      <span v-if="name!==''" class="name">{{ name }}</span>
    </span>
  </span>
</template>

<script>
  export default {
    name: 'HcMarker',
    props: {
      dataId: {
        type: null,
        default: ''
      },
      icon: {
        type: String,
        default: '/icons/intake.svg'
      },
      bgColor: {
        type: String,
        default: 'rgb(44,146,217)'
      },
      info: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="less" scoped>
  @height: 28px;
  .hc-marker {
    position: relative;
    display: flex;
    align-items: center;
    transform: translateX(50%);
    height: @height;
    cursor: pointer;
    span {
      display: inline-block;
      font-size: 12px;
      color: #FFFFFF;
      white-space: nowrap;
    }
    img {
      height: 100%;
      z-index: 10;
    }
    .detail {
      overflow: hidden;
      /*width: 0;*/
      max-width: 0;
      z-index: 1;
      height: @height - 4px;
      display: flex;
      transform: translateX(-(@height / 2));
      align-items: center;
      transition: max-width 0.7s ease;
      .info {
        padding: 0 5px 0 12px;
        background-color: #FFFFFF;
        height: @height - 10px;
        line-height: @height - 10px;
        margin-right: 5px;
      }
      .name {
        margin-right: 5px;
      }
      span {
        &:first-child {
          padding-left: 12px;
        }
      }
      sub,sup {
        transform: scale(0.1);
      }
    }
    &:hover {
      .detail {
        max-width: 350px;
        /*width: auto;*/
      }
    }
  }
</style>
