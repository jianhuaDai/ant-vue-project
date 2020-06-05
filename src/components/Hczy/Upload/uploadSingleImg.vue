<template>
  <div>
    <a-upload
      :customRequest="customRequest"
      :fileList="fileList"
      class="avatar-uploader"
      :show-upload-list="false"
      accept=".png,.jpg,.bmp"
    >
      <img width="100" height="100" v-if="showImage" :src="image_url[0]" alt="avatar" />
      <div v-else style="width: 100px;height: 100px;border: 1px solid #ddd;">
        <a-icon style="fontSize: 20px;transform: translate(37px, 37px);" type="plus" />
      </div>
    </a-upload>
  </div>
</template>

<script>
import { uploadSingle } from '@/api/upload'
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      image_url: [],
      fileList: [],
      showImage: false
    }
  },
  created () {
    this.image_url = this.value
    if (this.image_url.length > 0) {
      this.showImage = true
    }
  },
  methods: {
    customRequest (data) {
      const formData = new FormData()
      formData.append('file', data.file)
      uploadSingle(formData)
        .then(res => {
          this.image_url = [res.data]
          this.showImage = res.data
          this.$emit('change', this.image_url)
        })
        .catch(() => {})
      this.fileList = [data.file]
    }
  }
}
</script>

<style></style>
