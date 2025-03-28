<template>
  <v-row
    v-ripple
    no-gutters
    class="cursor-pointer highlight-on-hover"
    @click="$router.push(localePath('/people/' + getSlugFromPath(item._path)))"
  >
    <v-col align-self="center" class="text-h6 pl-2">
      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.people.loading"
        type="heading"
      ></v-skeleton-loader>
      <template v-else>
        {{ item.firstname + " " + item.lastname }}
      </template>
    </v-col>
    <v-col align-self="center">
      <PeopleGroupBadges :item="item" />
    </v-col>
  </v-row>
</template>
<script setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "~/store/root"

const { locale } = useI18n()
const { name, smAndUp, mdAndDown, lgAndUp } = useDisplay()
import { getSlugFromPath } from "~/composables/useUtils"
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
