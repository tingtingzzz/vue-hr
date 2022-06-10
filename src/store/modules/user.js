import { login, getUserProfile, userInfo } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'

export default {
  namespaced: true,
  state: () => {
    return {
      // 保存token
      token: getToken() || '',
      userInfo: {}
    }
  },
  mutations: {
    // 定义修改token的方法
    setToken(state, newToken) {
      // 保存token
      state.token = newToken
      //  持久化
      setToken(newToken)
    },
    setUserInfo(state, token) {
      state.userInfo = token
    }
  },
  actions: {
    async userLogin(context, data) {
      const res = await login(data)
      context.commit('setToken', res.data)
    },
    // 获取用户档案信息
    async getUserProfile(context) {
      const { data: res } = await getUserProfile()
      const { data: resInfo } = await userInfo(res.userId)
      const obj = { ...res, ...resInfo }
      // 调用mutations
      context.commit('setUserInfo', obj)
    },
    // 清空用户信息
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
    }
  },
  getter: {}
}
