<script>
export default {
  name: 'SearchMenu',
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
  }
  // render() {
  //   return (
  //     <div class='search-menu'>
  //       <el-input />
  //       <div class='menu-list'>
  //       </div>
  //     </div>
  //   )
  // }
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

