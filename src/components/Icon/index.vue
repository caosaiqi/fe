<script>
export default {
  name: 'SearchMenu',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    id: {
      type: String
    }
  },
  data() {
    return {
      state: ''
    }
  },
  methods: {
    querySearch(queryString, cb) {
      console.log('ad')
      cb([])
    },
    handleSelect(item) {
      console.log(item)
    }
  },
  render() {
    return (
      <i
        class={{
          iconfont: true

        }}
      />
    )
  }
}
</script>

<style lang="scss" scoped>
  .search-menu{
    position: relative;
    .menu-list {
      position: absolute;
    }
  }
</style>
