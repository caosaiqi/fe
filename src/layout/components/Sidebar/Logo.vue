<template>
  <div class="sidebar-logo">
    <a>
      <img src="../../../assets/images/logo-txt.png" alt="">
    </a>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
    }
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
  }
  img {
    width: 140px;
  }
}
</style>
