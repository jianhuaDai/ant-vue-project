<template>
  <div style="padding: 10px">
    <video
      width="100%"
      :controls="false"
      autoplay
      muted
      :loop="-1">
      <source
        :src="videoPath"
        type="video/mp4" />
    </video>
  </div>
</template>
<script>
export default {
  props: {
      videoPath: {
          type: String,
          default: 'https://river-chief.susinnovation.com/river-chief/mp4/7327a81b10ecaa7781c98c8fe9bb52cd.mp4'
      }
  },
  data () {
    return {
    }
  }
}
</script>
<style scoped>
</style>
