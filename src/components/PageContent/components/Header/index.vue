<template>
  <el-header class="page-header d-flex align-items-center">
    <h2 class="title flex-grow-1">{{ title }}</h2>
    <div>
      <el-button size="small" type="primary">主要按钮</el-button>
    </div>
  </el-header>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String
    },
    actions: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-header {
    border-bottom: 1px solid #ddd;
  }
 h2.title{
   margin: 0;
   font-size: 16px;
 }
</style>
