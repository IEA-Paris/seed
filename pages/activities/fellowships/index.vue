<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ListOrganismsList type="fellowship"></ListOrganismsList> </v-col
    ></v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "~/store/root"
const store = useRootStore()
const route = useRoute()
const { smAndUp } = useDisplay()
const { $i18n } = useNuxtApp()
const localePath = useLocalePath()
const item = store["fellowship"].items.find(
  (item) => item.slug === route.params.slug
)
</script>
