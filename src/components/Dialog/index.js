import Vue from 'vue'
import _ from 'lodash'

const size = {
  small: '17%',
  default: '30%',
  large: '70%'
}

export const template = {
  name: _.uniqueId('page-content-template'),
  props: {
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
        try {
          const f = await _handleOk()
          if (_.isBoolean(f)) {
            this.loading = f
            this.visible = f
          } else {
            this.loading = false
            this.visible = false
          }
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
    const { content, footer } = this.$slots
    const Content = content
    const Footer = () => {
      if (footer !== undefined) {
        return footer()
      }
      return (
        <div slot='footer'>
          <el-button onClick={this.handleClose}>取 消</el-button>
          <el-button
            type='primary'
            onClick={this.handleOk}
            loading={this.loading}
          >确 定</el-button>
        </div>
      )
    }
    console.log(this)
    const width = this.width || size[this.size]
    return (
      <el-dialog
        destroy-on-close={true}
        title={this.title}
        width={width}
        visible={this.visible}
      >
        <Content />
        <Footer />
      </el-dialog>
    )
  }
}

const Dialog = function({
  attrs,
  data,
  on,
  title,
  content,
  footer
}) {
  const Constructor = Vue.extend(template)
  const vm = new Constructor({
    el: document.createElement('div')
  })
  const dom = document.body.appendChild(vm.$el)

  // 设置标题
  vm.$props.title = title

  // 传入更多props
  if (attrs && _.isObject(attrs) && !_.isEmpty(attrs)) {
    for (const key in attrs) {
      vm.$props[key] = attrs[key]
    }
  }

  // 传入slot
  vm.$slots = {
    content: Vue.extend({
      data,
      render: content
    }),
    footer: footer
  }

  // 监听dialog显示隐藏
  vm.$watch('visible', (newVisible) => {
    if (newVisible === false) {
      // 从页面删除dialog元素
      setTimeout(() => {
        dom.remove()
      }, 300)
    }
  })

  // 绑定事件，目前dialog仅支持确认和取消操作，分别为 ok确认 close取消
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
