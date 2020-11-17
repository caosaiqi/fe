import Vue from 'vue'
import Router from 'vue-router'
import demo from '@/views/demo3'

import nadRouters from './nad.js'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    children: [
      nadRouters,
      {
        path: 'demo',
        component: demo,
        meta: { title: 'demo3', icon: 'dashboard', affix: true }
      }
    ]
  }
]

console.log(constantRoutes)
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
