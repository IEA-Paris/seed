<template>
  <v-row
    v-ripple
    class="cursor-pointer"
    @click="$router.push(localePath('/news/' + getSlugFromPath(item._path)))"
  >
    <v-col align-self="center" cols="2" class="text-h6 dense" v-if="mdAndUp">
      <v-chip class="mb-4">{{ $t("news.categories." + item.category) }}</v-chip>
    </v-col>
    <v-col align-self="center" cols="6" class="text-h6 dense">
      {{ item.title }}
    </v-col>
    <v-col align-self="center" cols="4" lg="4" class="dense">
      <MiscMoleculesChipContainer
        :items="item.tags"
        size="small"
      ></MiscMoleculesChipContainer
    ></v-col>
  </v-row>
</template>
<script setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "~/store/root"

const { locale } = useI18n()
const { name, smAndUp, mdAndDown, mdAndUp, lgAndUp } = useDisplay()
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
