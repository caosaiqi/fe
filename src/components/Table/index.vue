<template>
  <div class="page-table">
    <el-table
      v-loading="loading"
      v-bind="tableConfig"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="39" />
      <table-column
        v-for="(col, index) in columns"
        :key="`${index}-${col.prop || ''}`"
        v-bind="col"
        :row="tableData[index]"
      />
      <table-action
        v-if="actions && actions.length > 0"
        :actions="actions"
      />
    </el-table>

    <Pagination
      v-if="pageList.length > 0"
      :total="pagination.total"
      :page.sync="pagination.page"
      :page-size.sync="pagination.pageSize"
      @change="handlePaginationChange"
    />
  </div>
</template>
<script>
import tableController from './mixins/tableController'
import TableColumn from './components/Column'
import TableAction from './components/Action'
import Pagination from '@@/Pagination'

const tableDefaultAttributes = {
  'border': true,
  'highlight-current-row': true
}

export default {
  name: 'PageTable',

  // 组件固定唯一ID
  componentName: 'PageTable',

  components: {
    TableColumn,
    TableAction,
    Pagination
  },
  mixins: [tableController],
  props: {
    // 列表资源
    resources: {
      required: true,
      type: String
    },
    // 列表查询参数
    queryParams: {
      required: true,
      type: Object
    },
    // 列配置
    columns: {
      required: true,
      type: Array
    },
    // 单行操作配置
    actions: {
      type: Array,
      default: undefined
    }
  },
  data() {
    return {
      multipleSelection: []
    }
  },
  computed: {
    tableData() {
      return this.pageList || []
    },
    tableConfig() {
      if (this.$attrs) {
        return Object.assign(tableDefaultAttributes, this.$attrs, {
          data: this.tableData
        })
      }
      return tableDefaultAttributes
    }
  },
  watch: {
    queryParams: {
      handler(newQueryParams) {
        this.fetchList(newQueryParams)
      },
      deep: true
    }
  },
  methods: {
    handleSelectionChange(rows) {
      this.multipleSelection = rows
    },
    handlePaginationChange() {
      this.fetchList(this.pagination)
    }
  }
}
</script>
<style lang="scss" scoped>
  .page-table {
    padding: 5px 25px 8px 25px ;
  }
</style>
