<template>
  <div class="pa-6 border-thin">
    <div class="text-overline">{{ $t("related." + type) }}</div>
    <component
      v-for="item in items"
      :is="capitalize(type) + 'RelatedItem'"
      :item="item"
    />
  </div>
</template>

<script setup>
import { useRootStore } from "~/store/root"
import { capitalize } from "~/composables/useUtils"
const rootStore = useRootStore()
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
</script>

<style></style>
