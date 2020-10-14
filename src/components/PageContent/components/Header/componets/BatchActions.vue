<script>
import _ from 'lodash'

const btnDefaultConfig = {
  type: 'primary',
  size: 'small'
}

export default {
  name: 'PageHeaderBatchActions',
  props: {
    batchActions: {
      type: Array,
      default: undefined
    }
  },
  methods: {
    async getPageTabe() {
      // 等待pageTabel组件加载完
      await this.$nextTick()

      const componentName = 'PageContent'
      let component = this.$parent
      while (component && (component.$options && component.$options.componentName !== componentName)) {
        component = component.$parent
      }
      if (component.$refs && component.$refs.PageTable) {
        return component.$refs.PageTable
      }
      return null
    }
  },
  render(h) {
    if (!this.batchActions || _.isEmpty(this.batchActions)) {
      return null
    }

    // 获取页面Table组件
    let pageTable = null
    this.getPageTabe().then((component) => {
      pageTable = component
    })

    const btnsRender = this.batchActions.map(btnItem => {
      const { label, action, ...attrs } = btnItem

      return h('el-button', {
        attrs: Object.assign({}, btnDefaultConfig, attrs),
        domProps: {
          innerHTML: label
        },
        on: {
          click: () => {
            const { multipleSelection = [] } = pageTable
            const ids = multipleSelection.map(row => row.id)
            action.call(pageTable, {
              ids,
              rows: multipleSelection
            })
          }
        }
      })
    })

    return (
      <div>
        { btnsRender }
      </div>
    )
  }
}
</script>
