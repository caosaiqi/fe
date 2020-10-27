<template>
  <div class="footer-confirm" :class="[align, customClass]">
    <el-button :size="size" @click="$emit('close')">
      取 消
    </el-button>
    <el-button
      type="primary"
      :size="size"
      :loading="loading"
      @click="$emit('ok')"
    >
      确 定
    </el-button>
  </div>
</template>

<script>
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
    ok: {
      type: String,
      default: '确 定'
    },
    size: {
      type: String,
      default: 'small'
    },
    loading: {
      type: Boolean,
      default: false
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
