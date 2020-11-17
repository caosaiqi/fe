import request from './request'
import _ from 'lodash'

export default class Manager {
  constructor(resource) {
    this.resource = resource
  }

  formatPath({
    baseUrl = '/',
    path = ''
  }) {
    return `${baseUrl}${this.resource}${path}`
  }

  /**
   * @params {object} body
   * @returns {object} promise
   */
  list({ params, baseUrl, path } = {}) {
    const url = this.formatPath({
      baseUrl,
      path
    })
    return request.get(url, params)
  }

  /**
   * @path {string} url
   * @params {object} body
   * @returns {object} promise
   */
  get({ path, params } = {}) {
    return request.get(`${this.resource}/${path}`, { params })
  }

  /**
   * @path {string} url
   * @params {object} body
   * @returns {object} promise
   */
  post({ baseUrl, path, params, setConfig } = {}) {
    const url = this.formatPath({
      baseUrl,
      path
    })
    return request.post(url, params, setConfig)
  }

  /**
   * @path {string} url
   * @params {object} body
   * @returns {object} promise
   */
  remove({ path = 'delete', params } = {}) {
    return request.post(`${this.resource}/${path}`, params)
  }

  /**
   * @path {string} url
   * @params {object} body
   * @returns {object} promise
   */
  create({ path = 'create', params } = {}) {
    return request.post(`${this.resource}/${path}`, params)
  }
}
