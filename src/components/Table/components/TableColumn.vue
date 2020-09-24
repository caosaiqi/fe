
<script>
export default {
  name: 'PageTableColumn',
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
  methods: {
    getComponent(componentName) {
      let parent = this.$parent
      let name = parent.$options.componentName
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.componentName
        }
      }
      if (name !== componentName) {
        return this
      }
      return parent
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
