<template>
  <div style="padding:20px">
    <el-table
      v-loading="loading"
      :data="tableData"
      v-bind="attributes"
    >
      <table-column
        v-for="(col, index) in columns"
        :key="`${index}-${col.prop}`"
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
    resources: {
      required: true,
      type: String
    },
    queryParams: {
      required: true,
      type: [Function, Object]
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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎1',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎2',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎3',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎4',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  computed: {
    attributes() {
      if (this.$attrs) {
        return Object.assign(tableDefaultAttributes, this.$attrs)
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
