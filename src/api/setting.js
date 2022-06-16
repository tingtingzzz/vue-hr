/**
 * 获取所有角色信息
 * @param {*} params  {page, pagesize}
 * @returns
 */
import request from '@/utils/request'

export function getRoles(params) {
  return request({
    url: '/sys/role',
    method: 'GET',
    params: params
  })
}
