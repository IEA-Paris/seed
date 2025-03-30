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
const store = useRootStore()
const { smAndUp } = useDisplay()
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()

onBeforeUnmount(() => {
  rootStore.resetState()
})
</script>
