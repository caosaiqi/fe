<template>
  <div>
    asdas
  </div>
</template>

<script>
export default {
  name: 'PageFormItemLabel',
  props: {
    label: {
      type: [String, Function],
      default: undefined
    }
  },
  created() {
    console.log(this)
  }
}
</script>

<style>

</style>
