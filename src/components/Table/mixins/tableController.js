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
    this.fetchList(this.queryParams)
  },
  methods: {
    listSuccess({ list = [], total = 0 }) {
      // 为空处理
      if (total <= 0) {
        this.initList()
        return false
      }

      const { page, pageSize } = this.pagination
      this.pagination = {
        page,
        pageSize,
        total
      }
      this.pageList = list
    },

    initList() {
      this.pageList = []
      this.pagination = _.cloneDeep(DEFAULT_PAGINATION)
    },

    async fetchList(params) {
      try {
        this.loading = true
        const { data } = await this.manager.list(params)
        this.listSuccess(data)
      } catch (err) {
        this.initList()
        throw err
      } finally {
        setTimeout(() => {
          this.loading = false
        }, 200)
      }
    },
    fetchCreate() {},
    fetchRemove() {},
    fetchUpdate() {}
  }
}
