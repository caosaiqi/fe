import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import jsCookies from 'js-cookie'
// import _ from 'lodash'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      //  config.headers['X-Token'] = getToken()
    }
    console.log(jsCookies.get('MDACPUSERINFO'))
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers['user_id'] = jsCookies.get('MDACPUSERINFO') ? jsCookies.get('MDACPUSERINFO').split(':')[1] : ''
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const { data, status } = response
    if ((status === 200 || status === 304) && data) {
      return Promise.resolve(data)
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default {
  get: (url, params) => {
    const method = 'get'
    return service({
      url,
      method,
      params
    })
  },
  post: (url, params) => {
    const method = 'post'
    return service({
      url,
      method,
      params
    })
  }
}
