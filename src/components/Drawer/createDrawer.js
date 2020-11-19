
import Vue from 'vue'
import _ from 'lodash'
import Drawer from './index.vue'

export default function({ props = {}, title, footer, ...content }) {
  console.log(Drawer)
  // init vm
  const Constructor = Vue.extend(Drawer)
  const vm = new Constructor({
    el: document.createElement('div')
  })
  // 传入更多props
  vm.$props.title = title
  if (props && _.isObject(props) && !_.isEmpty(props)) {
    for (const key in props) {
      vm.$props[key] = props[key]
    }
  }

  vm.$slots.content = Vue.extend(content)

  // 控制抽屉显示隐藏
  vm.$on('update:visible', (newVisible) => {
    vm.$props.visible = newVisible
  })

  Vue.nextTick(() => {
    vm.$props.visible = true
  })
  return vm
}

