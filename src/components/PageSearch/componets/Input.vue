<template>
  <el-input
    :value="value"
    v-bind="$attrs"
    :placeholder="placeholder"
    :width="width"
    @input="handleInput"
  />
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
      type: [String, Number],
      default: undefined
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    width: {
      type: [String, Number],
      default: () => 210
    }
  },
  methods: {
    handleInput(newValue) {
      this.$emit('update:value', newValue)
    }
  }
}
</script>

<style>

</style>
