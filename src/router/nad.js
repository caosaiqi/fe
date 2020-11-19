import Layout from '@@/RouterView'
import NadIndex from '@/views/nad'
import Creative from '@/views/nad/creative'
import Form from '@/views/nad/creative/form'
export default {
  path: 'nad',
  name: 'nad',
  component: Layout,
  children: [
    {
      path: '/',
      component: NadIndex,
      meta: { title: '广告位信息列表', icon: 'dashboard' }
    },
    {
      path: 'creative',
      component: Creative,
      meta: { title: '广告位信息列表', icon: 'dashboard' }
    },
    {
      path: 'form',
      component: Form,
      meta: { title: '广告位信息列表', icon: 'dashboard' }
    }
  ]
}
