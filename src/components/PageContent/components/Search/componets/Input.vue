<template>
  <div>
    <el-input v-model="data" v-bind="$attrs" :placeholder="placeholder" @input="handleInput" />
  </div>
</template>

<script>
import emitter from '@/mixins/emitter'

export default {
  name: 'PageFormItemInput',
  mixins: [emitter],
  props: {
    id: {
      required: true,
      type: [String, Number]
    },
    value: {
      required: true,
      type: [String, Number]
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    }
  },
  data() {
    return {
      data: undefined
    }
  },
  watch: {
    value: {
      handler(v) {
        this.data = v
      },
      immediate: true
    }
  },
  methods: {
    handleInput(newValue) {
      this.dispatch('PageForm', 'onSetModel', {
        [this.id]: newValue
      })
      this.$emit('input', newValue)
    }
  }
}
</script>

<style>

</style>
