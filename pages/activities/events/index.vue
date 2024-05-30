<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ListOrganismsList type="events"></ListOrganismsList> </v-col
    ></v-row>
  </v-container>

  <EventsView />
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";

const { smAndUp } = useDisplay();
const localePath = useLocalePath();
</script>
