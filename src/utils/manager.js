import request from './request'

export default class Manager {
  constructor(resource) {
    this.resource = resource
  }

  /**
   * @params {object} body
   * @returns {object} promise
  */
  list(params) {
    return request.get(`${this.resource}`, params)
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
  post({ path, params } = {}) {
    return request.post(`${this.resource}/${path}`, params)
  }

  /**
   * @path {string} url
   * @params {object} body
   * @returns {object} promise
  */
  remove({ path = 'delete', params } = {}) {
    return request.post(`${this.resource}/${path}`, params)
  }
}
