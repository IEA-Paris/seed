<template>
  <div>
    {{
      $t("0-articles-found-page-1-of-2", [
        rootStore[props.type].total || 0,
        rootStore.page || 1,
        rootStore.numberOfPages || 1,
      ])
    }}
  </div>
</template>

<script setup>
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped></style>
