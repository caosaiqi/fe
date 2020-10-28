
<script>
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
    // row: {
    //   required: true,
    //   type: Object,
    //   default: () => ({})
    // },
    render: {
      type: Function,
      default: undefined
    }
  },
  render(h) {
    const {
      prop,
      label,
      // row,
      render
    } = this

    // 绑定render内部的方法，方便以后调用listApi
    const pageTable = this.getComponent('PageTable')

    const defaultRender = (value) => {
      return (
        <div class='table-colunm'>
          {
            value
          }
        </div>
      )
    }

    const slots = {
      scopedSlots: {
        default: scope => {
          const { row = {}} = scope
          const value = row[prop]
          if (render && typeof _.isFunction(render)) {
            return render({
              value,
              row,
              pageTable
            })
          }
          return defaultRender(value, row, pageTable)
        }
      }
    }

    return (
      <el-table-column prop = {prop} label ={ label } {...slots} />
    )
  }
}
</script>
