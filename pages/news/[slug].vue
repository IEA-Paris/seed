<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card
            class="d-flex align-center justify-center"
            color="grey-lighten-3"
            height="424"
            :to="localePath('/resources')"
            link
          >
            Carousel</v-card
          >
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts" setup>
  import { useDisplay } from "vuetify"
  const { smAndUp } = useDisplay()
  const localePath = useLocalePath()
  useSchemaOrg([
  defineArticle({
    //  image: '/photos/16x9/photo.jpg',
    headline: "My Article",
    id: "",
    author: [
      { name: "John doe", url: "https://johndoe.com" },
      { name: "Jane doe", url: "https://janedoe.com" },
    ],
   // publisher:"PARIS IAS"
  }),
])
  </script>
  