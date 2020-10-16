<template>
  <div class="sidebar-container">
    <el-scrollbar class="main-menu">
      <a class="switch-btn" @click="handleSwitchClick">
        <i :class="switchIcon" />
      </a>
      <el-menu
        class="menu"
        :collapse-transition="false"
        :default-active="defaultActive"
        :collapse="isMenuCollapse"
      >
        <el-menu-item
          v-for="menu in menus"
          :key="menu.id"
          :index="menu.id"
          class="el-menu-item"
          @click="handleMenuClick(menu)"
        >
          <i class="el-icon-menu" />
          <span slot="title">
            {{ menu.text }}
          </span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
    <sub-menu :menus="subMenus" />
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SubMenu from './SubMenu'

export default {
  name: 'Sidbar',
  components: {
    // Logo,
    SubMenu
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    menus() {
      const { menus = [] } = this.sidebar
      return menus
    },
    subMenus() {
      const { subMenus = [] } = this.sidebar
      return subMenus
    },
    isMenuCollapse() {
      const { isMenuCollapse } = this.sidebar
      return isMenuCollapse
    },
    defaultActive() {
      return Cookies.get('menuId')
    },
    switchIcon() {
      return this.isMenuCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    }
  },
  created() {
    this.initMenuData()
  },
  methods: {
    async initMenuData() {
      await this.$store.dispatch({ type: 'app/fecthGetMenus' })
    },
    handleMenuClick(menuItem = {}) {
      const { children, id } = menuItem
      Cookies.set('menuId', id, { expires: 30 })
      this.$store.dispatch({
        type: 'app/setSidebar',
        payload: {
          subMenus: children
        }
      })
    },
    async handleSwitchClick() {
      await this.$store.dispatch({
        type: 'app/setSidebar',
        payload: {
          isMenuCollapse: !this.isMenuCollapse
        }
      })
      Cookies.set('isMenuCollapse', this.isMenuCollapse, { expires: 30 })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "~@/styles/element-variables";
  .sidebar-container {
    background-color: $--menu-background-color;
    display: flex;
    position: relative;
  }
  .main-menu {
    position: relative;
    .switch-btn{
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      bottom: 0;
      height: 40px;
      width: 100%;
      color: #fff;
      font-size: 24px;
      background-color: $--color-primary;
    }
    .menu {
      border-right: none;
      .el-menu-item{
        height: 45px;
        line-height: 45px;
        padding: 0 15px !important;
        transition: none;
          i {
            color: #fff;
            // font-size: 15px;
            // width: 17px;
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
    .el-menu--collapse{
      .is-active {
        background-color: $--color-primary;
      }
    }
  }
</style>
