<template>
  <el-input v-model="data" v-bind="$attrs" placeholder="请输入内容" @input="handleInput" />
</template>

<script>
import emitter from '@/mixins/emitter'

export default {
  name: 'PageFormItemInput',
  mixins: [emitter],
  props: {
    value: {
      required: true,
      type: [String, Number]
    },
    id: {
      required: true,
      type: [String, Number]
    }
  },
  data() {
    return {
      data: this.value
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
