<template>
  <el-row :gutter="5">
    <el-col v-for="(inputItem, index) in inputItems" :key="index" :span="span">
      <component :is="getComponent(inputItem)" v-bind="inputItem" />
    </el-col>
  </el-row>
</template>

<script>
import Input from './Input'

const inputDefaultAttributes = {
  width: 210
}
const ownComponentTypes = ['Input']

export default {
  name: 'PageFormMain',
  components: {
    Input
  },
  props: {
    id: {
      type: [String, Number],
      default: undefined
    },
    type: {
      type: String,
      default: 'Input'
    },
    model: {
      required: true,
      type: Object
    },
    items: {
      type: Array,
      default: undefined
    }
  },
  computed: {
    span() {
      if (this.items && this.items.length > 0) {
        return 24 / this.items.length
      }
      return 24
    },
    inputItems() {
      const placeholderType = {
        input: '请输入',
        select: '请选择'
      }
      if (this.items && this.items.length > 0) {
        return this.items.map((item) => {
          const type = item.type || 'Input'
          const id = this.id ? `${this.id}__${item.id}` : item.id
          const value = this.model[id]
          return {
            type,
            id,
            value,
            // 同步model的id
            placeholder: placeholderType[type],
            ...inputDefaultAttributes,
            ...item
          }
        })
      }
      const id = this.id
      const value = this.model[id]
      return [{
        type: this.type,
        id,
        value,
        placeholder: placeholderType[this.type],
        ...inputDefaultAttributes
      }]
    }
  },
  methods: {
    getComponent({ type }) {
      // 优先使用二次封装过的组件
      if (ownComponentTypes.includes(type)) {
        return type
      }
      return `el-${type}`
    }
  }
}
</script>

<style>

</style>
