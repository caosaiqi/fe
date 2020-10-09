<template>
  <el-form class="page-search-form" v-bind="formAttributes" :model="model">
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

import {
  FORM_DEFAULT_ATTRS,
  INPUT_DEFAULT_VALUES
} from '@@/PageContent/constants'

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
    formAttributes() {
      return _.cloneDeep(FORM_DEFAULT_ATTRS, this.$attrs)
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
        this.$set(this.model, id, (value || INPUT_DEFAULT_VALUES[type]))
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

<style lang="scss" scoped>
  .page-search-form {
    padding: 20px
  }
</style>

