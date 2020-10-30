<template>
  <div class="sidebar-container" @mouseleave="handleSidebarMouseout">
    <el-scrollbar class="main-menu">
      <a class="switch-btn" @click="handleSwitchClick">
        <i :class="switchIcon" />
      </a>
      <Logo />
      <el-menu
        class="menu"
        :class="{
          'el-menu--collapse': isMenuCollapse
        }"
        :collapse-transition="false"
        :default-active="defaultActive"
        :collapse="isMenuCollapse"
      >
        <el-menu-item
          v-for="menu in menus"
          :key="menu.id"
          :popper-append-to-body="false"
          :index="menu.id"
          class="el-menu-item"
          :class="{
            'el-menu-item-hover': menu.id === tmpMenu.id
          }"
          @click="handleMenuClick(menu)"
        >
          <a
            @mouseover="handleMenuMouseover(menu)"
          >
            <i :class="getIcon(menu)" />
            <span class="title">
              {{ menu.text }}
            </span>
          </a>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
    <sub-menu @action="handeSubAction" />
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SubMenu from './SubMenu'
import menuConfig from './config'

export default {
  name: 'Sidbar',
  components: {
    Logo,
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
    tmpMenu() {
      const { tmpMenu = {}} = this.sidebar
      return tmpMenu
    },
    isMenuCollapse() {
      const { isMenuCollapse } = this.sidebar
      return isMenuCollapse
    },
    defaultActive() {
      const { actionMenu = {}} = this.sidebar
      return actionMenu.id
    },
    switchIcon() {
      return this.isMenuCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    }
  },
  created() {
    this.initMenuData()
  },
  methods: {
    getIcon({ id }) {
      if (!menuConfig[id]) return
      const { icon } = menuConfig[id]

      return `iconfont ${icon}`
    },
    async initMenuData() {
      await this.$store.dispatch({ type: 'app/fecthGetMenus' })
    },
    async handleSwitchClick() {
      await this.$store.dispatch({
        type: 'app/setSidebar',
        payload: {
          isMenuCollapse: !this.isMenuCollapse
        }
      })
      Cookies.set('isMenuCollapse', this.isMenuCollapse, { expires: 30 })
    },
    handleMenuClick(menuItem = {}) {
      Cookies.set('menuId', menuItem.id, { expires: 30 })
      this.$store.dispatch({
        type: 'app/setSidebar',
        payload: {
          actionMenu: menuItem
        }
      })
    },
    handleMenuMouseover(menuItem) {
      // if (!this.isMenuCollapse) return false
      this.$store.dispatch({
        type: 'app/setSidebar',
        payload: {
          isSubMenuCollapse: false,
          tmpMenu: menuItem
        }
      })
    },
    handleSidebarMouseout(e) {
      if (!Object.keys(this.tmpMenu).length) return false

      this.$store.dispatch({
        type: 'app/setSidebar',
        payload: {
          tmpMenu: {},
          isSubMenuCollapse: Cookies.get('isSubMenuCollapse') === 'true'
        }
      })
    },
    handeSubAction(subItem) {
      if (!Object.keys(this.tmpMenu).length) return false

      const { children } = this.tmpMenu
      this.$store.dispatch({
        type: 'app/setSidebar',
        payload: {
          actionMenu: { ...this.tmpMenu },
          subMenus: children,
          tmpMenu: {},
          isSubMenuCollapse: Cookies.get('isSubMenuCollapse') === 'true'
        }
      })
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
    z-index: 5;
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
      width: 173px;
      .el-menu-item{
        height: 43px;
        line-height: 43px;
        padding: 0!important;
        transition: none;
        a {
          display: block;
          padding: 0 15px;
        }
        i {
          color: #fff;
          font-size: 15px;
          width: 17px;
          margin-right: 2px;
        }
      }
      .el-menu-item.is-active:hover{
        color: #fff;
      }
      .el-menu-item.is-active>a>i {
        color: $--color-primary;
      }
      .el-menu-item.is-active:focus{
        color: #fff;
      }
      .el-menu-item.is-active:focus>a>i{
        color: #fff;
      }
      .el-menu-item.is-active:hover>a>i{
        color: #fff;
      }
      .el-menu-item-hover{
        background-color: $--color-primary;
      }
    }
    .el-menu--collapse{
      width: 52px;
      .is-active {
        // background-color: $--color-primary;
        font-weight: 600;
      }
      .el-menu-item a i{
        font-size: 17px;
      }
      .el-menu-item {
        text-align: center;
      }
    }
  }
</style>
