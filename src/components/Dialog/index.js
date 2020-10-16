import Vue from 'vue'
import _ from 'lodash'

export const template = {
  name: _.uniqueId('page-content-template'),
  props: {
    title: {
      type: String
    }
  },
  data() {
    return {
      visible: false,
      loading: false
    }
  },
  methods: {
    async handleOk() {
      const { ok } = this._events

      if (ok && !_.isEmpty(ok)) {
        const [_handleOk] = ok
        this.loading = true
        // eslint-disable-next-line no-useless-catch
        try {
          const f = await _handleOk()
          if (_.isBoolean(f)) {
            this.loading = f
            this.visible = f
          } else {
            this.loading = false
            this.visible = false
          }
        // eslint-disable-next-line no-useless-catch
        } catch (err) {
          throw err
        } finally {
          this.loading = false
        }
      }
    },
    handleClose() {
      this.$emit('close')
      this.visible = false
    }
  },
  render(h) {
    const { content } = this.$slots
    const Content = content
    const Footer = () => (
      <div slot='footer'>
        <el-button onClick={this.handleClose}>取 消</el-button>
        <el-button
          type='primary'
          onClick={this.handleOk}
          loading={this.loading}
        >确 定</el-button>
      </div>
    )

    return (
      <el-dialog title={this.title} visible={this.visible}>
        <Content />
        <Footer />
      </el-dialog>
    )
  }
}

const Dialog = function({
  title,
  data,
  render,
  on,
  footer
}) {
  const Constructor = Vue.extend(template)
  const vm = new Constructor({
    el: document.createElement('div')
  })
  const dom = document.body.appendChild(vm.$el)

  vm.$slots = {
    content: Vue.extend({
      data,
      render
    }),
    footer: footer
  }

  // 设置标题
  vm.$props.title = title

  // 监听dialog显示隐藏
  vm.$watch('visible', (newVisible) => {
    if (newVisible === false) {
      // 从页面删除dialog元素
      setTimeout(() => {
        dom.remove()
      }, 300)
    }
  })

  // 绑定事件
  if (on && _.isObject(on) && !_.isEmpty(on)) {
    for (const name in on) {
      const fn = on[name]
      if (_.isFunction(fn)) {
        vm.$on(name, fn)
      }
    }
  }

  // 调用默认打开
  Vue.nextTick(() => {
    vm.visible = true
  })
  return vm
}

export default Dialog
