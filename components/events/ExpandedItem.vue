<template>
  <div class="text-h4">{{ item.title }}</div>
</template>

<script lang="ts" setup>
const props = defineProps({
  item: { type: Object, required: true },
})
</script>

<style></style>
