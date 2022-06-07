import Layout from '@/layout'

export default {
  path: '/settings',
  component: Layout,
  children: [
    {
      path: '',
      name: 'settings',
      component: () => import('@/views/settings/settings'),
      meta: { title: '公司管理', icon: '青柠' }
    }
  ]
}