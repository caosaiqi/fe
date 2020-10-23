<template>
  <a class="table-action-button" v-bind="btnAttrs" @click="handleClick">
    {{ label }}
  </a>
</template>

<script>
import mixin from '../mixins/common'
import { ACTION_BUTTON_DEFAULT_ATTRS, ACTION_BUTTON_DEFAULT_LABEL } from '../constants'

export default {
  name: 'TableActionButton',
  mixins: [mixin],
  props: {
    label: {
      type: String,
      default: ACTION_BUTTON_DEFAULT_LABEL
    },
    action: {
      type: Function,
      default: () => {}
    },
    scope: {
      required: true,
      type: Object
    }
  },
  computed: {
    btnAttrs() {
      return Object.assign({}, ACTION_BUTTON_DEFAULT_ATTRS, this.$attrs)
    }
  },
  methods: {
    handleClick() {
      const pageTable = this.getTable()
      const { row = {}} = this.scope
      this.action.call(pageTable, row, this.scope)
    }
  }
}
</script>

<style lang="scss" scoped>
 .table-action-button {
    display: inline-block;
    padding: 0 3px;
    margin: 0px 5px;
    line-height: 1;
    color: #1890ff
 }
</style>
