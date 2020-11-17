import Layout from '@@/RouterView'
import NadIndex from '@/views/nad'

export default {
  path: 'nad',
  name: 'nad',
  component: Layout,
  children: [
    {
      path: '/',
      component: NadIndex,
      meta: { title: '广告位信息列表', icon: 'dashboard' }
    }
  ]
}
