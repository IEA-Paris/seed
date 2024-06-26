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
          <HomeLogoGallery :items="logos"></HomeLogoGallery>
        </v-col>
        <v-col cols="4" v-show="smAndUp">
          <v-sheet
            class="d-flex align-center justify-center"
            :to="localePath('/support')"
            link
          >
            <ActionsSmallContainer
              :action="action"
              :ratio="1"
            ></ActionsSmallContainer></v-sheet
        ></v-col> </v-row
    ></v-container>
  </section>

  <section>
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="d-flex align-center justify-center flex-column">
            <h3>{{ $t("our-members") }}</h3>
          </div>
          <HomeLogoGallery :items="logos"></HomeLogoGallery
        ></v-col>
      </v-row>
    </v-container>
  </section>

  <section>
    {{ name }}
    <v-container
      class="d-flex flex-xxl-row flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-sm-start"
    >
      <div>
        <v-sheet
          class="d-flex flex-md-column flex-sm-row flex-row"
          variant="text"
        >
          <div
            class="card-title align-self-lg-end align-self-md-end align-self-sm-start align-self-start mr-2 mr-sm-2 mr-md-0"
          >
            30
          </div>
          <div
            class="card-title-subtitle align-self-sm-center align-self-center"
            :class="mdAndUp ? 'text-right' : 'text-left'"
          >
            Apr <br />
            2024
          </div>
        </v-sheet>
      </div>

      <div>
        <div class="ml-lg-20 ml-md-12 mt-lg-0 mt-md-0 mt-12 mt-sm-12 mt-12">
          <v-sheet class="mx-auto sheet-component">
            <nuxt-img
              src="https://radcliffe-harvard-edu.imgix.net/7a3318d8-16f7-437e-b8c3-fbf9bbe1f926/Alexis-Pauline-Gumbs_by-Sufia-Ikbal-Doucet.jpg?auto=compress%2Cformat&fit=min&fm=jpg&q=80&rect=0%2C0%2C1584%2C1584"
              fit:cover
              class="fill-image"
            >
            </nuxt-img>
          </v-sheet>
        </div>
      </div>
    </v-container>
  </section>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";
definePageMeta({ layout: "about" });
const { smAndUp, name, mdAndUp } = useDisplay();
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

<style lang="scss" scoped>
.base-fill-container {
  width: 10px;
  height: 10px;
}

// event component
.fill-image {
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
}

.fill-image:hover {
  transform: scale(1.1);
}

.sheet-component {
  overflow: hidden;
}

.card-title,
.card-title-subtitle {
  color: #181818;
  font-family: "Lelo", helvetica, arial, sans-serif;
}

.card-title {
  font-size: 42px;
}

.card-title-subtitle {
  font-size: 14px;
}

.anchor-card-title {
  text-decoration: none;
  font-family: Rosart, serif;
  font-size: 28px;
  color: #181818;
}

.lecture {
  color: #767676;
  font-family: Lelo, helvetica, arial, sans-serif;
  font-weight: 500;
  font-size: 14px;
}
.anchor-lecture {
  color: #767676;
  text-decoration: none;
  font-family: Lelo, helvetica, arial, sans-serif;
  font-weight: 500;
  font-size: 14px;
}

.content-item {
  color: #181818;
  font-family: Lelo, helvetica, arial, sans-serif;
  font-size: 16px;
}

.content-item-event {
  font-family: Rosart, serif;
  font-size: 18px;
  margin-top: 24px;
  margin-bottom: 0;
}

.card-align-item {
  text-align: left;
}

.icon-fontsz {
  font-size: 8px;
}

.regi-item {
  font-size: 14px;
  color: #767676;
  font-family: Lelo, helvetica, arial, sans-serif;
}

.regi-main {
  background-color: #f1f1f1;
  padding: 11px 16px;
  margin-right: 20px;
  margin-top: 20px;
  font-family: Lelo, helvetica, arial, sans-serif;
}

.stream-main {
  margin-top: 20px;
  margin-right: 20px;
}
.stream-item {
  color: #767676;
  font-family: Lelo, helvetica, arial, sans-serif;
  font-size: 16px;
}

.header-item {
  font-family: Lelo, helvetica, arial, sans-serif;
  font-size: 14px;
}
.test {
  text-align: right;
}
</style>
