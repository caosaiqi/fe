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
    customRender: {
      type: Function,
      default: undefined
    },
    className: {
      type: String,
      default: () => ''
    },
    hide: {
      type: [Boolean, Function],
      default: false
    }
  },
  methods: {
    getIsOverflow(value, column) {
      const isEllipsis = this.className && this.className.indexOf('ellipsis') > -1
      let isOverflow = false
      if (isEllipsis) {
        const { realWidth } = column
        const dom = document.createElement('span')
        dom.innerHTML = value
        document.body.appendChild(dom)
        const width = dom.offsetWidth
        isOverflow = width > realWidth + 50
        dom.remove()
      }
      return isOverflow
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
          const renderParams = {
            row,
            pageTable,
            [prop]: value,
            scope: scope
          }

          const formatContent = (vm) => {
            const isOverflow = this.getIsOverflow(value, column)
            if (isOverflow) {
              return (
                <el-tooltip effect='light' placement='top' content={`${value}`}>
                  <div>{vm}</div>
                </el-tooltip>
              )
            }
            return <div>{vm}</div>
          }
          let refContent = value
          if (this.customRender && typeof _.isFunction(this.customRender)) {
            refContent = this.customRender(renderParams)
          }

          return (
            <div>
              { formatContent(refContent) }
            </div>
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
