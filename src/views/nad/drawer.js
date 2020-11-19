import createDrawer from '@@/Drawer/createDrawer.js'
import creativeList from './creative/index.vue'

export const drawerCreative = (pageTable) => createDrawer({
  title: 'asd',
  props: {
    isFull: true
  },
  render() {
    return <creativeList />
  }
})
