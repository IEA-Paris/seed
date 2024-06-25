<template>
  <component :is="'NewsRelated' + view" />
</template>

<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
})

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1)

const view = ref(capitalizeFirstLetter(props.type))
</script>

<style></style>
