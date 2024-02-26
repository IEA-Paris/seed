<template>
  <section>
    <v-row class="d-flex align-center justify-center">
      <v-col cols="12" sm="3">
        <v-sheet
          class="d-flex align-center justify-center"
          color="grey-lighten-3"
          height="400"
        >
          <v-img
            height="400"
            fit="contain"
            :aspectRatio="1 / 1"
            src="/images/durandcecile.jpg"
          ></v-img
        ></v-sheet>
      </v-col>
      <v-col cols="12" sm="9">
        <v-sheet
          class="d-flex align-center justify-center"
          color="grey-lighten-3"
          height="250"
          link
        >
          <ContentDoc :path="'/pages/' + $i18n.locale.value + '/network'" />
        </v-sheet>
      </v-col>
    </v-row>
  </section>
  <section>
    <v-row class="d-flex align-center justify-center">
      <v-col cols="12" sm="8">
        <div class="d-flex align-center justify-center flex-column" link>
          <h3>{{ $t("our-members") }}</h3>
          <v-img fit="contain" src="/images/partners/partners.jpg"></v-img>
        </div>
      </v-col>
      <v-col cols="4" v-show="smAndUp">
        <v-sheet
          class="d-flex align-center justify-center"
          :to="localePath('activities/membership')"
          link
        >
          <ActionsSmallContainer
            :action="action"
          ></ActionsSmallContainer> </v-sheet></v-col
    ></v-row>
  </section>
  <section>
    <v-row class="d-flex align-center justify-center">
      <v-col cols="12" sm="6">
        <v-sheet
          class="d-flex align-center justify-center"
          :to="localePath('/support')"
          link
        >
          <ContentDoc
            :path="'/pages/' + $i18n.locale.value + '/partners'"
          /> </v-sheet
      ></v-col>
      <v-col cols="12" sm="6">
        <v-sheet class="d-flex align-center justify-center">
          List of partners</v-sheet
        >
      </v-col>
    </v-row>
  </section>
  <section>
    <v-row class="d-flex align-center justify-center">
      <v-col cols="12" sm="8">
        <v-sheet class="d-flex align-center justify-center">
          List of sponsors</v-sheet
        >
      </v-col>
      <v-col cols="4" v-show="smAndUp">
        <v-sheet
          class="d-flex align-center justify-center"
          :to="localePath('/support')"
          link
        >
          <ActionsSmallContainer
            :action="action"
          ></ActionsSmallContainer></v-sheet
      ></v-col>
    </v-row>
  </section>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify"
const { smAndUp } = useDisplay()
const localePath = useLocalePath()
const { $i18n } = useNuxtApp()
const { data: action } = await useAsyncData("actions", () =>
  queryContent("/actions/" + $i18n.locale.value)
    .limit(1)
    .find()
)
</script>
