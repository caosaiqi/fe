import axios from 'axios'
import { Message } from 'element-ui'
import jsCookies from 'js-cookie'
import _ from 'lodash'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 6000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['user_id'] = jsCookies.get('MDACPUSERINFO') ? jsCookies.get('MDACPUSERINFO').split(':')[1] : ''
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers['Request-From'] = 'Newacp'
    console.log(config.headers, config)
    // const { setConfig } = config
    // if (_.isFunction(setConfig)) {
    //   setConfig(config)
    // }
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
  get: (url, params, setConfig) => {
    const method = 'get'
    return service({
      url,
      method,
      params,
      setConfig
    })
  },
  post: (url, params, setConfig) => {
    const method = 'POST'
    return service({
      url,
      method,
      data: params,
      setConfig
    })
  }
}
