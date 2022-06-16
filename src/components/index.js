// 全局注册
import UploadImg from '@/components/UploadImg'
import imageHolder from '@/components/ImageHolder'

export default {
  install(Vue) {
    Vue.component('UploadImg', UploadImg)
    Vue.component('imageHolder', imageHolder)
  }
}
