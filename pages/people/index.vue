<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <PeopleListHeader v-if="route.query.categories"></PeopleListHeader>
        <ListOrganismsList type="people"></ListOrganismsList>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { smAndUp } = useDisplay()
const route = useRoute()
const localePath = useLocalePath()
</script>
