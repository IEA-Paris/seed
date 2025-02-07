<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card
          class="d-flex align-center justify-center"
          color="grey-lighten-3"
          height="424"
          link
        >
          <ContentDoc :path="'/pages/' + locale + '/membership_overview'" />
        </v-card>
      </v-col>
      <v-col cols="4" v-if="smAndUp">
        <v-card
          class="d-flex align-center justify-center"
          color="red-lighten-3"
          height="400"
          :to="localePath('/activities/fellowships/help')"
          link
        >
          How can my institution join?/help/faq/guidelines</v-card
        >
      </v-col>
      <v-col cols="4" v-if="smAndUp">
        <v-card
          class="d-flex align-center justify-center"
          color="green-lighten-3"
          height="400"
          :to="localePath('/activities/memberships/hosting')"
          link
        >
          Event hosting overview</v-card
        >
      </v-col>
      <v-col cols="4" v-if="smAndUp">
        <v-card
          class="d-flex align-center justify-center"
          color="pink-lighten-3"
          height="400"
          :to="localePath('/activities/research')"
          link
        >
          Research support overview</v-card
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { smAndUp } = useDisplay()
const localePath = useLocalePath()
</script>
