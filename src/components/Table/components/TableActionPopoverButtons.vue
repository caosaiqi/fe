<template>
  <el-popover v-bind="popoverAttrs">
    <table-action-button slot="reference" :scope="scope" />

    <div class="">
      <span v-for="(btnItem, index) in subActions" :key="index">
        <table-action-button v-bind="btnItem" :scope="scope" />
      </span>
    </div>

  </el-popover>
</template>

<script>
import mixin from '../mixin.js'
import TableActionButton from './TableActionButton'
import { ACTION_POPOCER_DEFAULT_ATTRS } from '../constants'

export default {
  name: 'TableActionPopoverButtons',
  components: {
    TableActionButton
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

<style>

</style>