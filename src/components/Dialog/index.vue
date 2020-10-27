<script>
import _ from 'lodash'
import FooterConfirm from '@@/FooterConfirm'

const size = {
  small: '20%',
  default: '40%',
  large: '70%'
}

export default {
  name: 'MdDialog',
  props: {
    visible: {
      type: Boolean
    },
    title: {
      type: String,
      default: undefined
    },
    size: {
      type: String,
      default: 'default'
    },
    width: {
      type: String,
      default: undefined
    },
    center: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    customClass: {
      type: String,
      default: undefined
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    destroyOnClose: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async handleOk() {
      const { ok } = this._events
      if (ok && !_.isEmpty(ok)) {
        const [_handleOk] = ok
        this.loading = true
        try {
          const f = await _handleOk()
          if (_.isBoolean(f) && !f) {
            return
          }
          this.handleClose()
        } catch (err) {
          throw err
        } finally {
          this.loading = false
        }
      } else {
        this.handleClose
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
        return <Component />
      }
      return slot
    }
  },
  render(h) {
    const RenderContent = () => {
      return (
        <section class='dialog-content'>
          { this.getSlot('content') }
        </section>
      )
    }

    const FooterRender = () => {
      const footer = this.getSlot('footer')
      if (footer === undefined) {
        return (
          <FooterConfirm
            slot='footer'
            loading={this.loading}
            onOk={this.handleOk}
            onClose={this.handleClose}
          />
        )
      }
      return footer
    }

    const width = this.width || size[this.size]
    const config = {
      on: {
        'update:visible': (v) => {
          this.handleClose()
        }
      },
      props: {
        ...this.$props,
        width
      }
    }
    return (
      <el-dialog {...config}>
        <RenderContent />
        <FooterRender />
      </el-dialog>
    )
  }
}

</script>

