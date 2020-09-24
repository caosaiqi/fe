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
  },
  methods: {
    async fetchList(params) {
      try {
        this.loading = true
        const { data } = this.manager.list(params)
        console.log(data)
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

    fetchCreate() {},

    fetchRemove() {},

    fetchUpdate() {}

    // _query() {}
  }
}
