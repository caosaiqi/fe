import request from '@/utils/request'

export default request

export function fetchList(query) {
  return request({
    url: '/orders',
    method: 'get',
    params: query
  })
}
