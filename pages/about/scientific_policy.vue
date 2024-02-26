<template>
  <v-container class="scroller">
    <section>
      <v-row class="d-flex align-center justify-center">
        <v-col cols="4" v-if="smAndUp">
          <v-card
            class="d-flex align-center justify-center"
            color="yellow-lighten-3"
            height="400"
          >
            <v-img
              height="400"
              fit="contain"
              src="/images/Paulius_Yamin.jpg"
            ></v-img
          ></v-card>
        </v-col>
        <v-col cols="12" sm="8">
          <v-card
            class="d-flex align-center justify-center"
            color="blue-lighten-3"
            height="400"
          >
            <ContentDoc
              :path="'/pages/' + $i18n.locale.value + '/scientific_policy'"
            />
          </v-card> </v-col
      ></v-row>
    </section>
    <section>
      <v-row>
        <v-col cols="12">
          <v-card
            class="d-flex align-center justify-center"
            color="orange-lighten-3"
            height="424"
            link
          >
            <PeopleDesktopItem
              v-for="(people, index) in sab"
              :key="index"
              :item="people"
              :index="index"
            />
            Scientific advisory board
          </v-card>
        </v-col>
      </v-row>
    </section>
    <section>
      <v-row>
        <v-col cols="4" v-if="smAndUp">
          <v-card
            class="d-flex align-center justify-center"
            color="red-lighten-3"
            height="400"
            :to="localePath('reports')"
            link
          >
            Link to annual reports</v-card
          >
        </v-col>
        <v-col cols="4" v-if="smAndUp">
          <v-card
            class="d-flex align-center justify-center"
            color="green-lighten-3"
            height="400"
            link
          >
            Link to fellows (?)</v-card
          >
        </v-col>
        <v-col cols="4" v-if="smAndUp">
          <v-card
            class="d-flex align-center justify-center"
            color="pink-lighten-3"
            height="400"
            link
          >
            Link to proceedings (?)</v-card
          >
        </v-col>
      </v-row>
    </section>
  </v-container>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify"
const { smAndUp } = useDisplay()
const localePath = useLocalePath()
const { $i18n } = useNuxtApp()
console.log($i18n.locale.value)
const { data: sab } = await useAsyncData("sab-list", () =>
  queryContent("/sab/" + $i18n.locale.value).find()
)
</script>
