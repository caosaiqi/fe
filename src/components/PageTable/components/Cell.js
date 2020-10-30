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
    render: {
      type: Function,
      default: undefined
    }
  },
  render() {
    const {
      prop,
      label
    } = this

    // 绑定render内部的方法，方便以后调用listApi
    const pageTable = this.getComponent('PageTable')

    const defaultRender = (value) => {
      if (this.render && typeof _.isFunction(this.render)) {
        const vnode = this.render()
        return <div>
          {vnode}
        </div>
      }
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
          return defaultRender(value, row, pageTable)
        }
      }
    }
    
    if (this.render && typeof _.isFunction(this.render)) {
        const vnode = this.render()
        console.log(this.render())
        return <div>
            {vnode}
        </div>
    }
    return 'asdsa'
  }
}
