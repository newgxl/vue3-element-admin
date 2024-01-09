<template>
  <svg
    class="w-[1em] h-[1em] align-[-0.15em] fill-current overflow-hidden mr-[10px]"
    aria-hidden="true"
  >
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>
<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>
