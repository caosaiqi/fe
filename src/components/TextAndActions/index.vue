<template>
  <div class="d-flex">
    <div class="flex-1 ellipsis">
      <slot />
    </div>
    <div>
      <slot name="actions" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAndActions'
}
</script>

