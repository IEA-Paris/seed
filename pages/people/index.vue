<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!-- <ListAtomsListHeader
          :headers="[
            'scientific-advisory-board',
            'team',
            'fellows',
            'board-of-directors',
          ]"
          page="people"
        ></ListAtomsListHeader>
        <v-card
          class="d-flex align-center justify-center"
          color="grey-lighten-3"
          height="424"
          :to="localePath('/people')"
          link
        >
          Overview of the people by category: team, current fellows, recent
          speakers, featured in resources</v-card
        > -->

        <ListOrganismsList type="people"></ListOrganismsList> </v-col
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { smAndUp } = useDisplay()
// const route = useRoute()
const localePath = useLocalePath()
</script>
