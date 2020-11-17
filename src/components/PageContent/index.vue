<template>
  <el-container class="page-content" direction="vertical">
    <page-header v-bind="headerConfig" />
    <page-search v-if="searchConfig" v-bind="searchConfig" />
    <page-table v-if="tableConfig" ref="PageTable" v-bind="tableConfig" />
  </el-container>
</template>

<script>
import _ from 'lodash'
import PageHeader from '@@/PageHeader'
import PageSearch from '@@/PageSearch'
import PageTable from '@@/PageTable'

export default {
  name: 'PageContent',

  // 组件唯一固定ID
  componentName: 'PageContent',

  components: {
    PageHeader,
    PageSearch,
    PageTable
  },
  props: {
    headerContent: {
      type: [Object, String],
      default: undefined
    },
    searchContent: {
      type: Object,
      default: undefined
    },
    tableContent: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      tableQueryParams: {}
    }
  },
  computed: {
    headerConfig() {
      const { batchActions } = this.tableConfig
      if (_.isEmpty(this.headerContent)) {
        return false
      }
      if (_.isString(this.headerContent)) {
        return {
          title: this.headerContent,
          batchActions
        }
      }
      return Object.assign(this.headerContent, { batchActions })
    },
    searchConfig() {
      if (_.isEmpty(this.searchContent) || _.isEmpty(this.searchContent.formItems)) {
        return false
      }
      return this.searchContent
    },
    tableConfig() {
      if (_.isEmpty(this.tableContent) || _.isEmpty(this.tableContent.resources)) {
        return false
      }
      const { queryParams } = this.tableContent
      if (queryParams === undefined) {
        this.$set(this.tableContent, 'queryParams', {})
      }
      if (_.isFunction(queryParams)) {
        this.$set(this.tableContent, 'queryParams', queryParams())
      }
      return this.tableContent
    }
  },
  created() {
    // 处理列表请求
    this.$on('onFetchList', this.handleFetchList)
  },
  methods: {
    handleFetchList(formModel) {
      // 避免出现坑
      console.log(formModel)
      this.$set(this.tableConfig, 'queryParams', formModel)
    }
  }
}
</script>

