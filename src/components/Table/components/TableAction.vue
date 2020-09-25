<template>
  <el-table-column v-bind="config">
    <div slot-scope="scope">
      <span v-for="(btnItem, index) in actions" :key="index">
        <components :is="formatBtnName(btnItem)" v-bind="btnItem" :scope="scope" />
      </span>
    </div>
  </el-table-column>
</template>

<script>
import TableActionButton from './TableActionButton'
import TableActionPopoverButtons from './TableActionPopoverButtons'
import _ from 'lodash'

export default {
  name: 'PageTableActions',
  components: {
    TableActionButton,
    TableActionPopoverButtons
  },
  props: {
    prop: {
      type: String,
      default: '_action'
    },
    label: {
      type: String,
      default: '操作'
    },
    actions: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    config() {
      return {
        prop: this.prop,
        label: this.label
      }
    }
  },
  methods: {
    formatBtnName(btnItem) {
      const { subActions } = btnItem
      if (_.isArray(subActions) && !_.isEmpty(subActions)) {
        return 'table-action-popover-buttons'
      }
      return 'table-action-button'
    }
  }
}
</script>

<style>

</style>
