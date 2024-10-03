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
    <v-col align-self="center" cols="2">{{
      formatDate(item.publicationDate)
    }}</v-col>
    <v-col align-self="center" cols="6" class="text-h6">
      {{ item.title }}
    </v-col>
    <v-col align-self="center" cols="4"> </v-col>
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
