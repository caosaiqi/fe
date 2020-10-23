<template>
  <el-popover v-bind="popoverAttrs">
    <action-button slot="reference" :scope="scope" />
    <div class="table-action-popover-content">
      <span v-for="(btnItem, index) in subActions" :key="index">
        <el-divider v-if="index" direction="vertical" />
        <action-button v-bind="btnItem" :scope="scope" />
      </span>
    </div>
  </el-popover>
</template>

<script>
import mixin from '../mixins/common'
import ActionButton from './ActionButton'
import { ACTION_POPOCER_DEFAULT_ATTRS } from '../constants'

export default {
  name: 'TableActionPopoverButtons',
  components: {
    ActionButton
  },
  mixins: [mixin],
  props: {
    subActions: {
      required: true,
      type: Array
    },
    scope: {
      required: true,
      type: Object
    }
  },
  computed: {
    popoverAttrs() {
      return Object.assign({}, ACTION_POPOCER_DEFAULT_ATTRS, this.$attrs)
    }
  }
}
</script>

<style scoped>
 .table-action-popover-content{
   text-align: center;
 }
</style>

