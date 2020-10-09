import { TABLE_ID } from '../constants'

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
    getTable(table = TABLE_ID) {
      return this.getComponent(table)
    }
  }
}
