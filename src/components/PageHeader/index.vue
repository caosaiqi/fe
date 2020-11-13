<template>
  <el-header class="page-header d-flex align-items-center">
    <h2 class="title flex-grow-1">{{ title || defaultTitle}}</h2>
    <!-- 列表按钮批量操作 -->
    <batch-actions :batch-actions="batchActions" />
  </el-header>
</template>

<script>
import BatchActions from './componets/BatchActions'

export default {
  name: 'PageHeader',
  components: {
    BatchActions
  },
  props: {
    title: {
      type: String,
      default: undefined
    },
    batchActions: {
      type: Array,
      default: undefined
    }
  },
  data() {
    return {
      defaultTitle: ''
    }
  },
  watch: {
    '$route': {
      handler(newRoute) {
        const { meta } = newRoute
        if (meta && meta.title) {
          this.defaultTitle = meta.title
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-header {
    border-bottom: 1px solid #ddd;
    padding: 0 25px;
  }
 h2.title{
   margin: 0;
   font-size: 16px;
 }
</style>
