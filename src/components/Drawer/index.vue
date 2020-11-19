<script>
import _ from 'lodash'
import FooterConfirm from '@@/FooterConfirm'

const size = {
  small: '20%',
  default: '40%',
  large: '70%'
}

export default {
  name: 'MdDrawer',
  props: {
    customClass: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'default'
    },
    width: {
      type: String,
      default: undefined
    },
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    isFull: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false
    }
  },
  watch: {
    visible(val) {
      if (val) {
        document.body.appendChild(this.$el)
      }
    }
  },
  methods: {
    getOkFn() {
      // 如果是通过createDrawer创建的Drawer，则使用methods下ok方法作为触发事件
      const refContent = this.$refs.content
      if (refContent && refContent.ok && _.isFunction(refContent.ok)) {
        return refContent.ok
      }

      // 通过模版方式创建的
      const { ok } = (this._events || {})
      if (ok && ok.length > 0 && _.isFunction(ok[0])) {
        return ok[0]
      }
      return undefined
    },
    async handleOk() {
      const okFn = this.getOkFn()
      if (!okFn) return this.handleClose()

      this.loading = true
      try {
        const f = await okFn()
        if (_.isBoolean(f) && !f) {
          return
        }
        this.handleClose()
      } catch (err) {
        throw err
      } finally {
        this.loading = false
      }
    },
    handleClose() {
      this.$emit('close')
      this.$emit('update:visible', false)
    },
    getSlot(name) {
      const slot = this.$slots[name]
      if (slot === undefined) return undefined
      if (_.isFunction(slot)) {
        const Component = slot
        return <Component ref={ name } />
      }
      return slot
    }
  },
  render(h) {
    const RenderHeader = () => {
      if (!this.title) return false
      return (
        <header class='el-drawer__header d-flex '>
          <span class='flex-grow-1'>
            { this.title }
          </span>
          <a
            class='el-drawer__close-btn'
            onClick={this.handleClose}
          >
            <i class='el-dialog__close el-icon el-icon-close' />
          </a>
        </header>
      )
    }

    const RenderContent = () => {
      return (
        <section class='el-drawer__body'>
          { this.getSlot('content') }
        </section>
      )
    }

    const FooterRender = () => {
      const footer = this.getSlot('footer')
      const okfn = this.getOkFn()
      if (footer === undefined && okfn) {
        return (
          <FooterConfirm
            custom-class='body-drawer-footer'
            loading={this.loading}
            onOk={this.handleOk}
            onClose={this.handleClose}
          />
        )
      }
      return footer
    }

    const Drawer = () => {
      if (!this.visible) return null
      const width = this.width || size[this.size]
      return (
        <div
          class='el-drawer md-drawer'
          style={{ width }}
        >
          <RenderHeader />
          <RenderContent />
          <FooterRender />
        </div>
      )
    }
    return (
      <transition name='drawer'>
        <Drawer />
      </transition>
    )
  }
}
</script>
