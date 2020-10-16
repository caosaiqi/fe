import Cookies from 'js-cookie'
import { apiGetLeftMenu } from '@api/app'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    menus: []
  }
}

const mutations = {
  UPDATE_SIDEBAR(state, payload) {
    state.sidebar = {
      ...state.sidebar,
      ...payload
    }
  }
}

const actions = {
  async getLeftMenus({ commit }) {
    try {
      const { data } = await apiGetLeftMenu()
      const menus = []
      if (data && data !== null && typeof data === 'object') {
        for (const key in data) {
          menus.push(data[key])
        }
      }
      commit('UPDATE_SIDEBAR', { menus })
    } catch (err) {
      throw err
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
