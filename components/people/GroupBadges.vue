<template>
  <div>
    <v-skeleton-loader
      v-if="rootStore.loading || rootStore.people.loading"
      type="chip"
    ></v-skeleton-loader>

    <template v-else v-for="(value, key, index) in item.groups" :key="key">
      <v-chip
        class="mt-3 mr-3"
        v-if="value && key === 'vintage'"
        v-for="(vintage, index2) in item.groups.vintage"
        :key="index2"
        variant="outlined"
        tile
        style="background-color: white; color: black"
      >
        {{ $t("vintage", [vintage.year]) }}
      </v-chip>
      <v-chip
        class="mt-3 mr-3"
        color="black"
        style="background-color: white; color: black"
        v-if="
          value &&
          ((!item.groups.vintage && key === 'vintage') || key !== 'vintage')
        "
        tile
        variant="outlined"
      >
        {{ $t("list.filters.people.groups." + key) }}</v-chip
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
