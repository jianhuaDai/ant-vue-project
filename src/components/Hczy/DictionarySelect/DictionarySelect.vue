<template>
  <a-select :mode="mode" :disabled="disabled" :default-value="value" :placeholder="placeholder" @change="handleChange">
    <a-spin v-if="fetching" slot="notFoundContent" />
    <a-select-option v-for="item in data" :key="item.id">{{ item.name }}</a-select-option>
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
            default: ''
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
          }
        },
        data: function () {
          return {
            fetching: false,
            data: []
          }
        },
        methods: {
          loadData () {
            this.fetching = true
            getDictionary(this.dictionaryType).then(res => {
              if (this.insertOptionAll) {
                this.data.unshift({ id: '', name: '全部' })
              }
              this.data = this.data.concat(res.data || [])
            }).finally(() => {
              this.fetching = false
            })
          },
          handleChange (value, ...rest) {
            console.log('==change:', value)
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
