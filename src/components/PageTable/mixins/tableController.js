import _ from 'lodash'
import Manager from '@/utils/manager'

const DEFAULT_PAGINATION = {
  page: 1,
  pageSize: 20,
  total: 0
}

export default {
  data() {
    const pagination = _.cloneDeep(DEFAULT_PAGINATION)
    return {
      pagination,
      loading: false,
      pageList: []
    }
  },
  created() {
    this.manager = new Manager(this.resources)
    this.fetchList()
  },
  methods: {
    listSuccess(data = {}) {
      let { total = 0, list = [] } = data

      if (this.onFetchSuccess && _.isFunction(this.onFetchSuccess)) {
        const newData = this.onFetchSuccess(data)
        if (newData === false) return false
        if (newData && _.isObject(newData)) {
          list = newData.list
          total = newData.total
        }
      }

      // 为空处理
      if (total <= 0) {
        this.initPagination({
          total: 0
        })
        this.pageList = []
        return false
      }

      this.pagination.total = total
      this.pageList = list
    },

    initPagination(newPagination = {}) {
      this.pagination = Object.assign({}, this.pagination, newPagination)

      if (!this.pagination.total) {
        this.pagination.page = 1
        this.pageList = []
      }
    },

    getParasm(params) {
      const { page, pageSize } = this.pagination
      const newParams = Object.assign(
        {},
        {
          page,
          pageSize
        },
        this.queryParams,
        params
      )

      if (_.isFunction(this.formatParams)) {
        return this.formatParams(newParams)
      }
      return newParams
    },

    async fetchList(params = {}) {
      try {
        this.loading = true
        const { data } = await this.manager.list({
          params: this.getParasm(params),
          baseUrl: this.baseUrl,
          path: this.path
        })

        this.listSuccess(data)
      } catch (err) {
        this.initPagination({
          total: 0
        })
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchCreate(params) {
      try {
        await this.manager.create({ params })
        await this.fetchList()
        return true
      } catch (err) {
        throw err
      }
    },

    async fetchUpdate(params) {
      try {
        await this.fetchList()
        return true
      } catch (err) {
        throw err
      }
    },

    async fetchRemove(row) {
      try {
        await this.manager.remove({
          params: row
        })
        await this.fetchList()
        return true
      } catch (err) {
        throw err
      }
    }
  }
}
