import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@/views/demo/index.js'
import Demo2 from '@/views/demo2/index'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/demo',
    children: [
      {
        path: 'demo',
        component: Demo,
        name: '电商管理-POP店管理-店铺管理',
        meta: { title: '电商管理-POP店管理-店铺管理', icon: 'dashboard', affix: true }
      },
      {
        path: 'demo2',
        component: Demo2
      }
    ]
  }
]

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
