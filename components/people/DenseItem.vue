<template>
  <v-row
    v-ripple
    class="cursor-pointer"
    @click="$router.push(localePath('/people/' + getSlugFromPath(item._path)))"
  >
    <v-col align-self="center" cols="6" sm="5" md="4" lg="3" class="text-h6">
      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.people.loading"
        type="heading"
      ></v-skeleton-loader>
      <template v-else>
        {{ item.title }}
      </template>
    </v-col>
    <v-col align-self="center" cols="6">
      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.people.loading"
        type="chip"
      ></v-skeleton-loader>

      <template v-else v-for="(value, key, index) in item.groups" :key="key">
        <v-chip v-if="key === 'vintage'">
          {{ $t("vintage") }} {{ item.groups.vintage }}
        </v-chip>
        <v-chip class="mr-2 mt-3" variant="text" v-else>
          {{ $t("groups." + key) }}</v-chip
        ></template
      >
    </v-col>
  </v-row>
</template>
<script setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "~/store/root"

const localePath = useLocalePath()
const rootStore = useRootStore()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})
</script>
