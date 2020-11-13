<template>
  <el-form
    ref="pageSearchForm"
    :model="model"
    v-bind="formAttributes"
    class="page-search-form"
  >
    <el-form-item v-for="(item, index) in formItems" :key="`${item.name}_${index}`">
      <Label slot="label" :label="item.label" />
      <Item v-bind="item" :model="model" @setModel="setModel" />
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
import Item from './componets/Item'
import emitter from '@/mixins/emitter'

export const FORM_DEFAULT_ATTRS = {
  inline: true,
  size: 'small'
}

export default {
  name: 'PageSearch',

  componentName: 'PageSearch',

  provide() {
    return {
      pageSearch: this
    }
  },

  components: {
    Label,
    Item
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
    formAttributes() {
      return _.cloneDeep(FORM_DEFAULT_ATTRS, this.$attrs)
    }
  },
  created() {
    this.init()
  },
  methods: {
    setModel({ id, value }) {
      this.$set(this.model, id, value)
    },
    watchModel(formItem) {
    },
    init(formItems = this.formItems) {
      for (let i = 0; i < formItems.length; i++) {
        const formItem = formItems[i]
        const { items } = formItem
        if (items && items.length > 0) {
          return this.init(items)
        }
        this.watchModel(formItem)
        this.setModel(formItem)
      }
    },
    handleSeach() {
      this.dispatch('PageContent', 'onFetchList', this.model)
    },
    handleClear() {
      for (const key in this.model) {
        this.model[key] = undefined
      }
      this.dispatch('PageContent', 'onFetchList', this.model)
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-search-form {
    padding: 25px 25px 8px 25px ;
  }
</style>

