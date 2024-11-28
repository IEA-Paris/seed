<template>
  <v-row
    v-ripple
    class="cursor-pointer"
    @click="
      $router.push(
        localePath('/activities/fellowships' + getSlugFromPath(item._path)),
      )
    "
  >
    <v-col align-self="center" cols="8" class="text-h6">
      {{ item.title }}
      <FellowshipBadges :item="item"></FellowshipBadges>
    </v-col>
    <v-col align-self="center" cols="4">
      <MiscMoleculesChipContainer
        :items="[...fellowshipType, ...item.disciplines]"
        class="mt-2"
      ></MiscMoleculesChipContainer
    ></v-col>
  </v-row>
</template>
<script setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "~/store/root"
import { getSlugFromPath } from "~/composables/useUtils"

const { locale } = useI18n()
const { name, smAndUp, mdAndDown, lgAndUp } = useDisplay()
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
const fellowshipType = ref([
  ...(props.item.fellowshipType === 2
    ? [{ name: "short-stay" }, { name: "in-groups" }]
    : [
        {
          name: ["long-stay", "short-stay"][props.item.fellowshipType],
        },
      ]),
])
</script>
