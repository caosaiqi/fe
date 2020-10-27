
import Vue from 'vue'
import _ from 'lodash'
import Drawer from './index.vue'

export default function({
  attrs = {},
  on,
  data,
  title,
  content
}) {
  // init vm
  const Constructor = Vue.extend(Drawer)
  const vm = new Constructor({
    el: document.createElement('div')
  })

  // 传入更多props
  vm.$props.title = title
  if (attrs && _.isObject(attrs) && !_.isEmpty(attrs)) {
    for (const key in attrs) {
      vm.$props[key] = attrs[key]
    }
  }

  // 绑定事件，目前仅支持确认和取消操作，分别为 ok确认 close取消
  if (on && _.isObject(on) && !_.isEmpty(on)) {
    for (const name in on) {
      const fn = on[name]
      if (_.isFunction(fn)) {
        vm.$on(name, fn)
      }
    }
  }

  vm.$slots.content = Vue.extend({
    data,
    render: content
  })

  // 控制抽屉显示隐藏
  vm.$on('update:visible', (newVisible) => {
    vm.$props.visible = newVisible
  })

  Vue.nextTick(() => {
    vm.$props.visible = true
  })
  return vm
}

