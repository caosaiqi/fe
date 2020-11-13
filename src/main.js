import Vue from 'vue'

import 'normalize.css/normalize.css' // 初始化全集样式 https://github.com/necolas/normalize.css/blob/8.0.1/normalize.css

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons'
import './permission'

import * as filters from './filters'

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: 'medium'
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
