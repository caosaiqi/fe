<template>
  <div id="app">
    <router-view />
    <Drawer />
  </div>
</template>

<script>
import Drawer from '@@/Drawer'
export default {
  name: 'App',
  components: {
    Drawer
  }
}
</script>
