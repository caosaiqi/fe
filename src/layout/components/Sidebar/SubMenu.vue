<template>
  <el-menu background-color="#ebeef2" text-color="#000" class="sub-menus">
    <el-menu-item index="1">
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="2">
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="3">
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="5">
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="6">
      <span slot="title">导航三</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~@/styles/element-variables";
.sub-menus {
  width: 170px;
  border-right: none !important;
  .el-menu-item {
    height: 40px;
    line-height: 40px;
    transition: none;
  }
  .el-menu-item:hover {
     background-color:$--default-hover-color !important;;
  }
  .el-menu-item:focus {
    background-color: #fff !important;
    color: $--color-primary  !important;
  }
  li.is-active {
    background-color: #fff !important;
  }
  li:before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: transparent;
    content: "";
  }
  li.is-active:before {
    border-left: 3px solid !important;
    border-right: none;
  }
}
</style>

