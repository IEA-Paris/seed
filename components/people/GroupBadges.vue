<template>
  <div>
    <v-skeleton-loader
      v-if="rootStore.loading || rootStore.people.loading"
      type="chip"
    ></v-skeleton-loader>

    <template v-else v-for="(value, key, index) in item.groups" :key="key">
      <v-chip
        v-if="value && key === 'vintage'"
        class="ma-3"
        v-for="(vintage, index) in item.groups.vintage"
        :key="index"
        variant="outlined"
        tile
        style="background-color: white; color: black"
      >
        {{ $t("vintage") }} {{ vintage.year }}
      </v-chip>
      <v-chip
        color="black"
        style="background-color: white; color: black"
        class="ma-3"
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
