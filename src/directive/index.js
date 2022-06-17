import Vue from 'vue'
import store from '@/store'

export default function directive() {
  Vue.directive('allow', {
    inserted: function(el, binding) {
      if (!store.state.user.userInfo.roles.points.includes(binding.value)) {
        el.parentNode.removeChild(el)
      } else {
        console.log()
      }
    }
  })
}

