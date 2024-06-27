<template>
  {{ item }}
</template>

<script setup>
const props = defineProps({ item: { type: Object, required: true } })
</script>
