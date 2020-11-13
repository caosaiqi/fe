<template>
  <div class="footer-confirm" :class="[align, customClass]">
    <el-button :size="size" @click="handleClose">
      取 消
    </el-button>
    <el-button
      type="primary"
      :size="size"
      :loading="loading"
      @click="handleOk"
    >
      确 定
    </el-button>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'FooterConfirm',
  props: {
    customClass: {
      type: String,
      default: ''
    },
    align: {
      type: String,
      default: 'right'
    },
    closeText: {
      type: String,
      default: '取 消'
    },
    okText: {
      type: String,
      default: '确 定'
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    getPopver() {
      var parent = this.$parent
      while (parent) {
        if (parent.tooltipId) {
          return parent
        }
        parent = parent.$parent
      }
      return undefined
    },
    getOkFn() {
      const { ok } = this.$listeners
      if (ok && _.isFunction(ok)) {
        return ok
      }
      return undefined
    },
    async handleClose() {
      const popver = this.getPopver()
      if (popver && popver.doShow) {
        popver.doClose()
      }
      this.$emit('close')
    },
    async handleOk() {
      const okFn = this.getOkFn()
      this.loading = true
      try {
        const f = await okFn()
        if (_.isBoolean(f) && !f) {
          return
        }
        this.handleClose()
      } catch (err) {
        throw err
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .footer-confirm{
    text-align: right;
  }
  .footer-confirm.right {
      text-align: right;
  }
  .footer-confirm.left {
      text-align: left;
  }
  .footer-confirm.center {
      text-align: center;
  }
</style>
