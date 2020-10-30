<template>
  <el-row :gutter="5">
    <el-col v-for="(item, index) in inputItems" :key="index" :span="span">
      <component
        :is="getComponent(item)"
        :value.sync="model[item.id]"
        :model="model"
        v-bind="item"
      />
    </el-col>
  </el-row>
</template>

<script>
import Input from './Input'
import Select from './Select'
const ownComponentNames = ['Input', 'Select']

export default {
  name: 'PageFormMain',
  components: {
    Input,
    Select
  },
  props: {
    id: {
      type: [String, Number],
      default: undefined
    },
    componentName: {
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
    },
    label: {
      type: [String, Function],
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
      const items = []
      if (this.items && this.items.length > 0) {
        this.items.forEach(item => {
          items.push(item)
        })
      } else {
        items.push({
          id: this.id,
          componentName: this.componentName
        })
      }
      return items
    }
  },
  methods: {
    getComponent({ componentName }) {
      // 优先使用二次封装过的组件
      if (ownComponentNames.includes(componentName)) {
        return componentName
      }
    }
  }
}
</script>

<style>

</style>
