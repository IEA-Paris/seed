<template>
  <section>
    <v-container>
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
        </v-col> </v-row
    ></v-container>
  </section>

  <section>
    <v-container>
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
    </v-container>
  </section>
  <section>
    <v-container>
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
        ></v-col> </v-row
    ></v-container>
  </section>

  <section>
    <v-container>
      <div class="d-flex align-center justify-center flex-column">
        <h3>{{ $t("our-members") }}</h3>
      </div>

      <div>
        <v-row class="d-flex align-center justify-center main-container">
          <v-col
            cols="12"
            md="2"
            sm="3"
            v-for="item in logos"
            :key="item.title"
          >
            <a :href="item.url">
              <nuxt-img
                :src="item.picture"
                :title="item.title"
                fit:contain
                class="fill-image"
              >
              </nuxt-img>
            </a>
          </v-col>
          <!-- <v-col cols="4" v-show="smAndUp">
            <v-sheet
              class="d-flex align-center justify-center"
              :to="localePath('activities/membership')"
              link
            >
              <ActionsSmallContainer
                :action="action"
              ></ActionsSmallContainer> </v-sheet></v-col -->
        </v-row>
      </div>
    </v-container>
  </section>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";
definePageMeta({ layout: "about" });
const { smAndUp } = useDisplay();
const localePath = useLocalePath();
const { $i18n } = useNuxtApp();
const { data: action } = await useAsyncData("actions", () =>
  queryContent("/actions/" + $i18n.locale.value)
    .limit(1)
    .find()
);

const { data: logosData } = await useAsyncData("logos", () =>
  queryContent("/logos/" + $i18n.locale.value)
    .only(["picture", "title", "url"])
    .find()
);

const logos = !logosData || !logosData.value ? undefined : logosData.value;
</script>

<style scoped>
.fill-image {
  max-width: 100%;
  min-height: 100%;
  overflow: hidden;
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  transition: filter 0.5s ease;
}

.fill-image:hover {
  filter: none;
  -webkit-filter: grayscale(0);
}
</style>
