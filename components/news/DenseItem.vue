<template>
  <v-row
    v-ripple
    class="cursor-pointer"
    @click="$router.push(localePath('/news/' + getSlugFromPath(item._path)))"
  >
    <v-col align-self="center" cols="6" class="text-h6 dense">
      {{ item.title }}
    </v-col>
    <v-col align-self="center" cols="6" class="dense">
      <MiscMoleculesChipContainer
        :items="item.tags"
      ></MiscMoleculesChipContainer
    ></v-col>
  </v-row>
</template>
<script setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "~/store/root"

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
</script>
