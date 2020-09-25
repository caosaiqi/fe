<template>
  <el-form style="padding:20px" v-bind="attributes" :model="model">
    <el-form-item v-for="(item, index) in formItems" :key="`${item.name}-${index}`">
      <Label slot="label" :label="item.label" />
      <Main v-bind="item" :model="model" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSeach">搜索</el-button>
      <el-button @click="handleClear">全部</el-button>
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

const defaultTypeValues = {
  input: '',
  select: undefined
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
    this.initModel(this.formItems)
    this.$on('onSetModel', this.handleSetModel)
  },
  methods: {
    initModel(formItems) {
      for (let i = 0; i < formItems.length; i++) {
        const { id, type = 'input', items, value } = formItems[i]
        if (items && items.length > 0) {
          return this.initModel(items.map(item => {
            return {
              ...item,
              id: id ? `${id}__${item.id}` : item.id
            }
          }))
        }
        this.$set(this.model, id, (value || defaultTypeValues[type]))
      }
    },
    handleSetModel(data) {
      if (data && _.isObject(data)) {
        Object.assign(this.model, data)
      }
    },
    handleSeach() {
      this.dispatch('PageContent', 'onFetchList', this.model)
    },
    handleClear() {
      this.initModel(this.formItems)
      this.dispatch('PageContent', 'onFetchList', this.model)
    }
  }
}
</script>

<style>

</style>
