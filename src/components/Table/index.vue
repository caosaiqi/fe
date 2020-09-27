<template>
  <div style="padding:20px">
    <h2>
      {{ queryParams }}
    </h2>
    <el-table
      v-loading="loading"
      v-bind="tableConfig"
    >
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
  </div>
</template>
<script>
import controller from './controller'
import TableColumn from './components/TableColumn'
import TableAction from './components/TableAction'
import { TABLE_ID } from './constants'

const tableDefaultAttributes = {
  'border': true,
  'highlight-current-row': true
}

export default {
  name: 'PageTable',

  // 组件固定唯一ID
  componentName: TABLE_ID,

  components: {
    TableColumn,
    TableAction
  },
  mixins: [controller],
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
  computed: {
    tableData() {
      // mixins data
      const { list = [] } = this.pageList
      return list
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
  }
}
</script>
