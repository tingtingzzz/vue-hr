import Layout from '@/layout'

export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      name: 'employees',
      component: () => import('@/views/employees/employees'),
      meta: { title: '员工管理', icon: '啤酒' }
    }
  ]
}