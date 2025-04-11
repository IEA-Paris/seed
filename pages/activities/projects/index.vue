<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ListOrganismsList type="projects"></ListOrganismsList> </v-col
    ></v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify"
const { smAndUp } = useDisplay()
</script>
