import Layout from '@/layout'

export default {
  path: '/attendances',
  component: Layout,
  children: [
    {
      path: '',
      name: 'attendances',
      component: () => import('@/views/attendances/attendances'),
      meta: { title: '考勤管理', icon: '糯米糍' }
    }
  ]
}