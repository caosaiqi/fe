
<script>
import mixin from '../mixin.js'
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
    row: {
      required: true,
      type: Object
    },
    render: {
      type: Function,
      default: undefined
    }
  },
  render(h) {
    const {
      prop,
      label,
      row,
      render
    } = this
    // 绑定render内部的方法，方便以后调用listApi
    const renderCallThis = this.getComponent('PageTable')
    const defaultRender = () => {
      return (
        <div class='table-colunm'>
          {
            row[prop]
          }
        </div>
      )
    }
    return (
      <el-table-column prop={prop} label={label}>
        { render
          ? render.call(renderCallThis, row, {
            prop,
            label
          })
          : defaultRender() }
      </el-table-column>
    )
  }
}
</script>
