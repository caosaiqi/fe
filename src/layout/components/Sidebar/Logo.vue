<template>
  <div class="sidebar-logo">
    <a>
      <!-- <img src="../../../assets/images/logo-grey.png" alt=""> -->
      <template v-if="sidebar.isMenuCollapse"> 摩点 </template>
      <template v-else> 摩点后台管理 </template>
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SidebarLogo',
  props: {
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables";
@import "~@/styles/element-variables";
.sidebar-logo {
  background: $--color-primary;
  a {
    height: $pageHeaderHeight;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 21px;
    color: #fff;
  }
  img {
    width: 140px;
  }
}
</style>
