<template>
  {{ items[0] }}
</template>

<script setup>
const props = defineProps({ items: { type: Array, required: true } })
</script>
