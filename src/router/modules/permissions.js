import Layout from '@/layout'

export default {
  path: '/permissions',
  component: Layout,
  children: [
    {
      path: '',
      name: 'permissions',
      component: () => import('@/views/permissions/permissions'),
      meta: { title: '权限管理', icon: '伏特加' }
    }
  ]
}
