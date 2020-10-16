import request from '@/utils/request'

/**
 * @获取左侧菜单
 * @returns {object}
*/
export const apiGetLeftMenu = () => request.get('acp_api/auth_access/left_menu')

