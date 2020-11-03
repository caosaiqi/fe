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
    listSuccess({ list = [], total = 0 }) {
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

    async fetchList(params = {}) {
      try {
        this.loading = true

        const { page, pageSize } = this.pagination
        const fetchParams = Object.assign(
          {},
          {
            page,
            pageSize
          },
          this.queryParams,
          params
        )
        const { data } = await this.manager.list(fetchParams)
        this.listSuccess(data)
      } catch (err) {
        this.initPagination({
          total: 0
        })
        throw err
      } finally {
        setTimeout(() => {
          this.loading = false
        }, 200)
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
