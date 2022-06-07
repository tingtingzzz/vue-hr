// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import store from '@/store'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础的基础地址
  timeout: 5000 // 定义5秒超时
  // baseURL: 'http://localhost:8080'
}) // 创建一个axios的实例

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // console.log(store)
    const token = store.state.user.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    if (response.data.status === false) {
      return Promise.reject(response.data.message)
    }
    return response.data
  },
  async error => {
    // 对响应错误做点什么
    if (error.response.data.code === 10002) {
      // 清空用户信息
      await store.dispatch('user/logout')
      // 跳转首页
      // vue文件里面用 this.$route.fullPath 获取当前路径
      // js文件里面用 router.currentRoute.fullPath 获取当前路径
      router.push('/login?qwe=' + encodeURIComponent(router.currentRoute.fullPath))
    }
    return Promise.reject(error)
  }
)
export default service // 导出axios实例
