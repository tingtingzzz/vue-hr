import request from '@/utils/request'

export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

/**
 * @description: 获取部门详情
 * @param {*} id 表示当前要编辑项的id值
 * @return {*}
 */
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}
/**
 * @description: 更新部门数据
 * @param {*} data:form表单数据 但是要有id值
 * @return {*}
 */
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
