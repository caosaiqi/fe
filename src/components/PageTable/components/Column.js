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
    },
    className: {
      type: String,
      default: () => ''
    },
    copy: {
      type: [Boolean, Function],
      default: () => false
    }
  },
  render(h) {
    const {
      prop,
      label,
      className
    } = this

    // 绑定render内部的方法，方便以后调用listApi
    const pageTable = this.getComponent('PageTable')

    const config = {
      props: {
        prop,
        label,
        className,
        ...this.$attrs
      },

      scopedSlots: {
        default: scope => {
          const { row = {}, column } = scope
          const value = row[prop]
          if (this.value && typeof _.isFunction(this.value)) {
            const vnode = this.value({
              [prop]: value,
              row,
              pageTable,
              scope: scope
            })
            return vnode
          }

          const isEllipsis = className && className.indexOf('ellipsis') > -1
          if (isEllipsis) {
            let isOverflow = false
            {
              const { realWidth } = column
              const dom = document.createElement('span')
              dom.innerHTML = value
              document.body.appendChild(dom)
              const width = dom.offsetWidth
              isOverflow = width > realWidth + 50
              dom.remove()
            }

            return (
              <el-tooltip effect='light' placement='top' content={value} disabled={!isOverflow}>
                <span> {value}</span>
              </el-tooltip>
            )
          }

          return (
            <span>
              {value}
            </span>
          )
        }
      }
    }

    return (
      <el-table-column ref='table-column' {
        ...config
      } />
    )
  }
}
