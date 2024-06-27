<template>
  <div>
    <div class="text-overline"></div>
    <component
      v-for="item in items"
      :is="capitalizeFirstLetter(type) + 'RelatedItem'"
      :item="item"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
})

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1)

console.log("STRING", capitalizeFirstLetter(props.type))
console.log("STRING", props.items)
</script>

<style></style>
