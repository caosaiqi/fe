<template>
  <section
    class="app-main"
    :style="{'padding-left': left}"
  >
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
import Cookies from 'js-cookie'
import { mapGetters } from 'vuex'
export default {
  name: 'AppMain',
  data() {
    return {
      left: '0'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    key() {
      return this.$route.path
    }
  },
  watch: {
    'sidebar.isSubMenuCollapse': {
      handler(f) {
        setTimeout(() => {
          if (Cookies.get('isSubMenuCollapse') === 'true') {
            this.left = '0'
          } else {
            this.left = '180px'
          }
        }, 1)
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  height: calc(100vh - 60px);
  width: 100%;
  position: relative;
  overflow-y: auto;
  // padding: 20px;
}

.fixed-header+.app-main {
  padding-top: 60px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
