<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ListAtomsListHeader
          :headers="['videos', 'publications']"
          page="resources"
        ></ListAtomsListHeader>
        <v-card
          class="d-flex align-center justify-center"
          color="grey-lighten-3"
          height="424"
          :to="localePath('/resources/browse')"
          link
        >
          Overview of the different news. Link to projects, featured things,
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { smAndUp } = useDisplay()
const localePath = useLocalePath()
</script>
