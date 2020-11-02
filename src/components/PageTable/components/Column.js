import mixin from '../mixins/common'
import _ from 'lodash'

export default {
  name: 'PageTableColumn',
  mixins: [mixin],
  props: {
    prop: {
      required: true,
      type: String
    },
    label: {
      required: true,
      type: String
    },
    value: {
      type: Function,
      default: undefined
    }
  },
  render(h) {
    const {
      prop,
      label
    } = this

    // 绑定render内部的方法，方便以后调用listApi
    const pageTable = this.getComponent('PageTable')

    const defaultRender = (value) => {
      return (
        <div class='table-colunm'>
          { value }
        </div>
      )
    }

    const slots = {
      scopedSlots: {
        default: scope => {
          const { row = {}} = scope
          const value = row[prop]
          if (this.value && typeof _.isFunction(this.value)) {
            const vnode = this.value()
            return vnode
          }
          return defaultRender(value, row, pageTable)
        }
      }
    }

    return (
      <el-table-column prop={prop} label={ label } {...slots} />
    )
  }
}
