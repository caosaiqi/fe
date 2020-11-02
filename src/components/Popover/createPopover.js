import Vue from 'vue'
import Popover from './index.vue'

// 未开发完成 待不全

export default function({ attrs, title, footer, ...content }) {
  // init vm
  const Constructor = Vue.extend(Popover)
  const vm = new Constructor()
  console.log(vm)
  return vm
}

