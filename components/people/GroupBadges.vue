<template>
  <div>
    <v-skeleton-loader
      v-if="rootStore.loading || rootStore.people.loading"
      type="chip"
    ></v-skeleton-loader>

    <template v-else v-for="(value, key, index) in item.groups" :key="key">
      <v-chip
        :class="index === 0 ? 'my-3 mr-3' : 'ma-3'"
        v-if="value && key === 'vintage'"
        v-for="(vintage, index2) in item.groups.vintage"
        :key="index"
        variant="outlined"
        tile
        style="background-color: white; color: black"
      >
        {{ $t("vintage", [vintage.year]) }}
      </v-chip>
      <v-chip
        :class="index === 0 ? 'my-3 mr-3' : 'ma-3'"
        color="black"
        style="background-color: white; color: black"
        v-else-if="
          value &&
          ((!item.groups.vintage && key === 'fellows') || key !== 'fellows')
        "
        tile
        variant="outlined"
      >
        {{ $t("list.filters.people.categories." + key) }}</v-chip
      ></template
    >
  </div>
</template>

<script setup>
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<style lang="scss" scoped></style>
