<script>
import Item from '@@/PageSearch/componets/Item'
import Input from './Input'
import Select from './Select'

export default {
  name: 'PageSearchItem',
  components: {
    Input,
    Select
  },
  props: {
    span: {
      type: Number,
      default: 24
    },
    id: {
      type: [String, Number],
      default: undefined
    },
    componentName: {
      type: String,
      default: 'Input'
    },
    model: {
      required: true,
      type: Object
    },
    items: {
      type: Array,
      default: undefined
    },
    label: {
      type: [String, Function],
      default: undefined
    },
    customRender: {
      type: Function,
      default: undefined
    }
  },
  methods: {
    setModel({ id = this.id, value }) {
      this.$emit('setModel', {
        id,
        value
      })
    }
  },
  render(createElement) {
    // 组件递归调用
    if (this.items && this.items.length > 0) {
      const items = this.items.map(item => {
        const props = {
          span: 24 / this.items.length,
          model: this.model,
          ...item
        }
        const on = this.$listeners
        return <Item {...{ props, on }}/>
      })
      return (
        <el-row>
          {items}
        </el-row>
      )
    }

    // 输入框内容
    const content = () => {
      const id = this.id
      if (!!this.customRender && typeof this.customRender === 'function') {
        return this.customRender(this.model, this)
      }
      return createElement(this.componentName, {
        props: {
          id,
          value: this.model[id],
          ...this.$attrs
        },
        on: {
          'update:value': (value) => this.setModel({ value })
        }
      })
    }
    return (
      <el-col span={this.span}>
        {content()}
      </el-col>
    )
  }
}
</script>

<style>

</style>
