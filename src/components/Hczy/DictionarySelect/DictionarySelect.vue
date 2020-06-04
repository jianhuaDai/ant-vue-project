<template>
  <a-select
    :mode="mode"
    :disabled="disabled"
    v-model="val"
    :placeholder="placeholder">
    <a-spin v-if="fetching" slot="notFoundContent" />
    <a-select-option v-for="item in data" :key="item.value">{{ item.name }}</a-select-option>
  </a-select>
</template>

<script>
    import { getDictionary } from '@/api/dictionary'

    export default {
        name: 'DictionarySelect',
        model: {
          prop: 'value',
          event: 'change'
        },
        props: {
          value: {
            type: null,
            default: null
          },
          insertOptionAll: {
            type: Boolean,
            default: false
          },
          dictionaryType: {
            type: String,
            default: ''
          },
          disabled: {
            type: Boolean,
            default: false
          },
          mode: {
            type: String,
            default: 'default'
          },
          placeholder: {
            type: String,
            default: '请选择'
          },
          selectFirst: {
            type: Boolean,
            default: false
          }
        },
        watch: {
          val: function (val, oldVal) {
            this.handleChange(val)
          },
          value: {
            handler: function (val, oldVal) {
              this.val = this.value === 0 ? null : this.value
            },
            immediate: true
          }
        },
        data: function () {
          return {
            fetching: false,
            val: '',
            data: []
          }
        },
        methods: {
          loadData () {
            this.fetching = true
            getDictionary(this.dictionaryType).then(res => {
              if (this.insertOptionAll) {
                this.data.unshift({ value: '', name: '全部' })
              }
              this.data = this.data.concat(res.data || [])
              if (this.selectFirst && this.data.length > 0 && this.value === '') {
                this.val = this.data[0].value
              } else {
                this.val = this.value
              }
            }).finally(() => {
              this.fetching = false
            })
          },
          handleChange (value) {
            this.$emit('change', value)
          }
        },
        mounted () {
          this.loadData()
        }
    }
</script>

<style scoped>

</style>
