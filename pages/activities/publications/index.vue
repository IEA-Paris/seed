<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ListOrganismsList type="publications"></ListOrganismsList> </v-col
    ></v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "~/store/root"
/* import { useEventStore } from "~/store/root" 
const eventStore = useEventStore()*/
const store = useRootStore()
const { smAndUp } = useDisplay()
/* const item = store["publications"].items.find(
  (item) => item.slug === route.params.slug
) */
</script>
