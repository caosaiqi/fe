import _ from 'lodash'
import Manager from '@/utils/manager'

export default {
  data() {
    return {
      loading: false,
      pageList: {
        list: [],
        pagination: {
          page: 1,
          pages: 222,
          total: 0,
          pageSize: 15
        }
      }
    }
  },
  created() {
    this.manager = new Manager(this.resources)
    this.fetchList(this.queryParams)
  },
  methods: {
    formatPageListSuccess(pageList) {
      const { code, list = [], pagination = {}} = pageList
      // 成功状态
      if (code === 200 && _.isArray(list) && !_.isEmpty(list)) {
        return {
          list,
          pagination
        }
      }
      return {
        list: [],
        pagination: null
      }
    },
    async fetchList(params) {
      try {
        this.loading = true
        const { data } = await this.manager.list(params)
        this.pageList = this.formatPageListSuccess(data)
      // eslint-disable-next-line no-useless-catch
      } catch (err) {
        throw err
      } finally {
        setTimeout(() => {
          this.loading = false
        }, 200)
      }
    },

    refresh(id) {},

    fetchCreate() {
      
    },

    fetchRemove() {},

    fetchUpdate() {}

    // _query() {}
  }
}
