<template>
  <el-table-column v-bind="config">
    <div slot-scope="scope">
      <span v-for="(btnItem, index) in actions" :key="index">
        <el-divider v-if="index" direction="vertical" />
        <components :is="formatBtnName(btnItem)" v-bind="btnItem" :scope="scope" />
      </span>
    </div>
  </el-table-column>
</template>

<script>
import _ from 'lodash'
import TableActionButton from './ActionButton'
import TableActionPopoverButtons from './ActionPopoverButtons'

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
