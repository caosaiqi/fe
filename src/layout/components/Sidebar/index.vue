<template>
  <div class="sidebar-container">
    <div>
      <!-- <Logo /> -->
      <el-scrollbar>
        <el-menu class="menu" :collapse="isCollapse">
          <el-menu-item
            v-for="menu in menus"
            :key="menu.id"
            :index="menu.id"
            class="el-menu-item"
          >
            <i class="el-icon-menu" />
            <span slot="title">
              {{ menu.text }}
            </span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </div>

    <sub-menu />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SubMenu from './SubMenu'

export default {
  name: 'Sidbar',
  components: {
    // Logo,
    SubMenu
  },
  data() {
    return {
      isCollapse: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    menus() {
      return this.sidebar.menus || []
    }
  },
  beforeCreate() {
    // 获取menu信息
    this.$store.dispatch({
      type: 'app/getLeftMenus'
    })
  }
}
</script>
<style lang="scss" scoped>
  @import "~@/styles/element-variables";
  .sidebar-container {
    background-color: $--menu-background-color;
    display: flex;
  }
  .menu {
    border-right: none;
    .el-menu-item{
      height: 50px;
      line-height: 50px;
        >i {
          color: #fff;
          font-size: 15px;
          width: 17px;
          margin-right: 0;
        }
    }
    .el-menu-item.is-active>i {
      color: $--color-primary;
    }
    .el-menu-item.is-active:focus{
      color: #fff;
    }
    .el-menu-item.is-active:focus>i{
      color: #fff;
    }
  }
</style>
