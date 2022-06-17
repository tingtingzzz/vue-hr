import { constantRoutes } from '@/router'

export default {
  namespaced: true,
  state() {
    return {
      menuList: [...constantRoutes]
    }
  },
  mutations: {
    updateMenuList(state, asyncRouter) {
      state.menuList = [...constantRoutes, ...asyncRouter]
    }
  }
}
