<template>
  <div class="mx-sm-6 my-6 pa-6 border-thin">
    <div class="text-overline">{{ $t("related." + type) }}</div>
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
console.log("items: ", props.items)

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1)
</script>

<style></style>
