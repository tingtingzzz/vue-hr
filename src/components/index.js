// 全局注册
import pageTools from '@/components/PageTools'
import UploadImg from '@/components/UploadImg'

export default {
  install(Vue) {
    Vue.component('pageTools', pageTools)
    Vue.component('UploadImg', UploadImg)
  }
}
