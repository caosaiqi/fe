<script>
import Cookies from 'js-cookie'
import { mapGetters } from 'vuex'

export default {
  name: 'LayoutSubMenu',
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    // 主菜单属否展开
    isMenuCollapse() {
      return this.sidebar.isMenuCollapse
    },
    isSubMenuCollapse() {
      return this.sidebar.isSubMenuCollapse
    },
    actionMenu() {
      return this.sidebar.actionMenu || {}
    },
    tmpMenu() {
      return this.sidebar.tmpMenu || {}
    },
    menus() {
      return this.tmpMenu.children || this.actionMenu.children
    }
  },
  methods: {
    async handleSwitchClick() {
      await this.$store.dispatch({
        type: 'app/setSidebar',
        payload: {
          isSubMenuCollapse: !this.isSubMenuCollapse
        }
      })
      Cookies.set('isSubMenuCollapse', this.isSubMenuCollapse, { expires: 30 })
    },
    handleMenuClick(item) {
      this.$emit('action', item)
    }
  },
  render() {
    const menuItemRender = (item) => {
      const { id, text } = item
      return (
        <el-menu-item
          key={id}
          index={id}
          onClick={() => this.handleMenuClick(item)}
        >
          { text }
        </el-menu-item>
      )
    }

    const MenuItemsRender = () => {
      if (!this.menus) return null
      const mapFn = (menuItem, index) => {
        const { children, id, text } = menuItem
        if (children && children.length > 0) {
          return (
            <el-submenu key={id} index={id}>
              <span slot='title'>{ text }</span>
              {
                children.map(menuItemRender)
              }
            </el-submenu>
          )
        }
        return menuItemRender(menuItem)
      }
      return this.menus.map(mapFn)
    }

    const SwitchBtnRender = () => {
      if (this.tmpMenu && this.tmpMenu.children) return null
      return (
        <a
          onClick={this.handleSwitchClick}
          class={{
            'switch-btn': true,
            'switch-btn-open': !this.isSubMenuCollapse,
            'switch-btn-hide': this.isSubMenuCollapse
          }}
        >
          <i class={{
            'el-icon-s-unfold': this.isSubMenuCollapse,
            'el-icon-s-fold': !this.isSubMenuCollapse
          }} />
        </a>
      )
    }

    const ParentMenuRender = () => !this.isSubMenuCollapse && (
      <div class='parent-menu'>
        <span>
          {this.tmpMenu.text || this.actionMenu.text}
        </span>
      </div>
    )

    const style = {
      // 主菜单宽度
      left: this.isMenuCollapse ? '52px' : '172px'
    }
    return (
      <div
        class={{
          'sub-menus': true,
          'sub-menus-hide': this.isSubMenuCollapse
        }}
        style={ style }
      >
        <SwitchBtnRender />
        <ParentMenuRender />
        <el-scrollbar>
          <el-menu
            text-color='#000'
            background-color='#ebeef2'
            style='border-right:none'
          >
            <MenuItemsRender />
          </el-menu>
        </el-scrollbar>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/element-variables";
@import "~@/styles/variables";
.parent-menu{
  background-color: #e8e8e8;
  padding:0 15px ;
  height: 40px;
  line-height: 40px;
  color:rgba(0,0,0,.85);
  font-size: 14px;
  font-weight: 600;
}
.sub-menus-hide {
  width: 0 !important;
}
.sub-menus {
  width: $subMenuWidth;
  border-right: none !important;
  position: absolute;
  top: $pageHeaderHeight;
  left: 70px;
  height: calc(100vh - 60px);
  background-color:#ebeef2;
  z-index: 3;
   transition: width .15s;
  .el-menu-item {
    height: 40px;
    line-height: 40px;
    transition: none;
  }
  .el-menu-item:hover {
     background-color:$--default-hover-color !important;
  }
  .el-menu-item:focus {
    background-color: #fff !important;
    color: $--color-primary  !important;
  }
  .el-submenu{
    .el-submenu__title {
      height: 40px;
      line-height: 40px;
    }
  }
  li.is-active {
    background-color: #fff !important;
  }
  li.el-menu-item:before {
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
  .switch-btn {
    position: absolute;
    top: 35%;
    background-color: $--color-primary;
    z-index: 3;
    padding: 5px 2px;
    cursor: pointer;
    font-weight: 700;
    width: 23px;
    i {
      font-size: 20px;
      color: #fff;
    }
  }
  .switch-btn-open {
    border-radius: 5px 0 0 5px;
    right: 0px;
  }
  .switch-btn-open:hover {
    border-radius: 13px 0 0 13px;
    width: 27px;
  }
  .switch-btn-hide{
    right: -23px;
    border-radius: 0px 5px 5px 0;
  }
  .switch-btn-hide:hover {
    border-radius: 0 13px 13px 0px;
    width: 27px;
    right: -26px;
  }
}
</style>

