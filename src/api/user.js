import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户档案信息
export function getUserProfile() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

// 获取头像
export function userInfo(id) {
  return request({
    url: '/sys/user/' + id,
    method: 'get'
  })
}

/**
 * @description: 获取用某个用户的信息
 * @param {*} id
 * @return {*}
 */
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function getInfo(token) {}

export function logout() {}
