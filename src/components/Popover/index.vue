<template>
  <el-popover v-bind="config">
    <div>
      <slot name="content" />
      <FooterConfirm v-if="$listeners.ok" @ok="$listeners.ok" />
    </div>
    <slot slot="reference" />
  </el-popover>
</template>

<script>
import FooterConfirm from '@@/FooterConfirm'
export default {
  name: 'MdPopover',
  components: {
    FooterConfirm
  },
  computed: {
    config() {
      return Object.assign({ width: 320 }, this.$attrs)
    }
  }
}
</script>

