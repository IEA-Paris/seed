<template>
  <v-container style="max-width: 1200px">
    <ListOrganismsList type="events"></ListOrganismsList
  ></v-container>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "~/store/root"

const { smAndUp } = useDisplay()
const localePath = useLocalePath()

const rootStore = useRootStore()

const data = rootStore.$state.events.list.items
</script>
