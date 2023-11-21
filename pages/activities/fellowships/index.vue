<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ListOrganismsList type="fellowships"></ListOrganismsList> </v-col
    ></v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify"
const { smAndUp } = useDisplay()
const { $i18n } = useNuxtApp()
const localePath = useLocalePath()
const { data: fellowships } = await useAsyncData("actions", () =>
  queryContent("/fellowships/" + $i18n.locale.value).find()
)
</script>
