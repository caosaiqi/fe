<template>
  <el-form style="padding:20px" v-bind="attributes" :model="model">
    <el-form-item v-for="(item, index) in formItems" :key="`${item.name}-${index}`">
      <Label slot="label" :lable="item.label" />
      <Main v-bind="item" :model="model" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSeach">搜索</el-button>
      <el-button>全部</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import _ from 'lodash'
import Label from './componets/Label'
import Main from './componets/Mian'
import emitter from '@/mixins/emitter'

const formDefaultAttributes = {
  inline: true,
  size: 'small'
}

export default {
  name: 'PageForm',

  componentName: 'PageForm',

  components: {
    Label,
    Main
  },
  mixins: [emitter],
  props: {
    formItems: {
      type: Array,
      default: undefined
    }
  },
  data() {
    return {
      model: {}
    }
  },
  computed: {
    attributes() {
      if (this.$attrs) {
        return Object.assign(formDefaultAttributes, this.$attrs)
      }
      return formDefaultAttributes
    }
  },
  created() {
    this.formatModel(this.formItems)
    this.$on('onSetModel', (object) => {
      if (_ && _.isObject(object)) {
        Object.assign(this.model, object)
      }
    })
  },
  methods: {
    setDefaultValue(type, value) {
      const defaultValues = {
        input: '',
        select: undefined
        // 后续再加
      }
      return defaultValues[type]
    },
    formatModel(formItems) {
      const setDefaultValue = (type, value) => {
        const defaultValues = {
          input: '',
          select: undefined
        }
        return defaultValues[type]
      }
      for (let i = 0; i < formItems.length; i++) {
        const { id, type = 'input', items, value } = formItems[i]
        if (items && items.length > 0) {
          return this.formatModel(items.map(item => {
            return {
              ...item,
              id: id ? `${id}__${item.id}` : item.id
            }
          }))
        }
        this.$set(this.model, id, value || setDefaultValue(type))
        // this.model[id] = value || setDefaultValue(type)
      }
    },
    handleSeach() {
      this.dispatch('PageContent', 'onFetchList', this.model)
    }
  }
}
</script>

<style>

</style>
