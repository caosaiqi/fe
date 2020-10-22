import request from '@/utils/request'

export default request

// 获取区域
export const fetchGetCity = (params) => request.get('/city', params)

// 获取区域
export const fetchGetRegion = (params) => request.get('/region', params)
