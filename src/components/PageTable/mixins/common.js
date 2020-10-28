export default {
  methods: {
    getComponent(componentName) {
      let parent = this.$parent
      let name = parent.$options.componentName
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.componentName
        }
      }
      if (name !== componentName) {
        return this
      }
      return parent
    },
    getTable(table = 'PageTable') {
      return this.getComponent(table)
    }
  }
}
