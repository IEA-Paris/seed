<template>
  <section>
    <v-row class="d-flex align-center justify-center">
      <v-col cols="4" v-if="smAndUp">
        <v-card class="d-flex align-center justify-center">
          <v-img aspect-ratio="1/1" src="/images/Paulius_Yamin.jpg"></v-img
        ></v-card>
      </v-col>
      <v-col cols="12" sm="8">
        <v-card class="d-flex align-center justify-center">
          <ContentDoc
            :path="'/pages/' + $i18n.locale.value + '/scientific_policy'"
          />
        </v-card> </v-col
    ></v-row>
  </section>
  <section>
    <v-row>
      <v-col cols="12">
        <v-card class="d-flex align-center justify-center" link>
          <PeopleSlidingGroup :items="sab"
            ><div class="text-h2" v-motion-slide-visible-once-bottom>
              {{ $t("scientific-advisory-board") }}
            </div></PeopleSlidingGroup
          >
        </v-card>
      </v-col>
    </v-row>
  </section>
  <section>
    <v-row>
      <v-col cols="4" v-if="smAndUp">
        <v-card
          class="d-flex align-center justify-center"
          height="400"
          :to="localePath('reports')"
          link
        >
          Link to annual reports</v-card
        >
      </v-col>
      <v-col cols="4" v-if="smAndUp">
        <v-card class="d-flex align-center justify-center" height="400" link>
          Link to fellows (?)</v-card
        >
      </v-col>
      <v-col cols="4" v-if="smAndUp">
        <v-card class="d-flex align-center justify-center" height="400" link>
          Link to proceedings (?)</v-card
        >
      </v-col>
    </v-row>
  </section>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { smAndUp } = useDisplay()
const localePath = useLocalePath()
const { $i18n } = useNuxtApp()
console.log($i18n.locale.value)
const { data: sab } = await useAsyncData("sab-list", () =>
  queryContent("/sab/" + $i18n.locale.value).find()
)
</script>
