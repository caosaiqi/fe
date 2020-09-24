<template>
  <el-container class="page" direction="vertical">
    <page-header v-if="headerConfig" v-bind="headerConfig" />
    <page-form v-if="seachFormConfig" v-bind="seachFormConfig" />
    <page-table v-if="tableConfig" v-bind="tableConfig" />
  </el-container>
</template>

<script>
import _ from 'lodash'
import PageHeader from './components/Header'
import PageForm from './components/Form'
import PageTable from '@@/Table'

export default {
  name: 'PageContent',

  // 组件唯一固定ID
  componentName: 'PageContent',

  components: {
    PageHeader,
    PageForm,
    PageTable
  },
  props: {
    header: {
      type: [String, Object],
      default: undefined
    },
    seachForm: {
      type: Object,
      default: undefined
    },
    table: {
      type: Object,
      default: undefined
    }
  },
  computed: {
    headerConfig() {
      if (_.isEmpty(this.header)) {
        return false
      }
      if (_.isString(this.header)) {
        return {
          title: this.header
        }
      }
      return this.header
    },
    seachFormConfig() {
      if (_.isEmpty(this.seachForm) || _.isEmpty(this.seachForm.formItems)) {
        return false
      }
      return this.seachForm
    },
    tableConfig() {
      if (_.isEmpty(this.table) || _.isEmpty(this.table.resources)) {
        return false
      }

      const { queryParams } = this.table
      if (queryParams === undefined) {
        this.$set(this.table, 'queryParams', {})
      }
      if (_.isFunction(queryParams)) {
        this.$set(this.table, 'queryParams', queryParams())
      }

      return this.table
    }
  },
  created() {
    // 处理列表请求
    this.$on('onFetchList', this.handleFetchList)
  },
  methods: {
    handleFetchList(formModel) {
      // 避免出现坑
      let _formModel = _.cloneDeep(formModel)
      if (this.seachFormConfig && this.seachFormConfig.onSearch) {
        const { onSearch } = this.seachFormConfig
        if (_.isFunction(onSearch)) {
          const values = onSearch(_formModel)
          // 返回false 不刷新列表
          if (values === false) {
            return
          }
          if (typeof values === 'object' && values !== null) {
            _formModel = values
          }
        }
      }
      this.tableConfig['queryParams'] = _formModel
    }
  }
}
</script>

<style lang="scss" scoped>
  .page {
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
</style>>
