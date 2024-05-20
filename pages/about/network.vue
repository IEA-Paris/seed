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
        <v-row class="d-flex align-center justify-center">
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
                class="fill-image-item"
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

  <section>
    <v-container> </v-container>
  </section>
  <section>
    <v-container>
      <div>
        <v-row no-gutters>
          <v-col cols="12" md="1">
            <v-card class="mx-auto" variant="text">
              <div>
                <v-card class="mx-auto" variant="text">
                  <v-card-item>
                    <div class="card-title">30</div>
                    <div class="card-title-subtitle">
                      Apr <br />
                      2024
                    </div>
                  </v-card-item>
                </v-card>
              </div>
            </v-card></v-col
          >

          <v-col cols="12" md="5">
            <v-card class="mx-auto" variant="text">
              <v-card-item>
                <div class="text-wrap">
                  <span
                    ><a
                      href="https://www.radcliffe.harvard.edu/event/2024-alexis-pauline-gumbs-lecture"
                      class="anchor-card-title"
                    >
                      Audre Lorde, June Jordan, and a Homemade Field of Love
                    </a>
                  </span>
                </div>
                <div class="text-wrap">
                  <span class="anchor-lecture">
                    Lectures •<a
                      href="https://www.radcliffe.harvard.edu/events-and-exhibitions/series/kim-and-judy-davis-deans-lecture-in-the-humanities"
                      title="Kim and Judy Davis Dean's Lecture in the Humanities"
                      class="anchor-lecture"
                    >
                      Kim and Judy Davis Dean's Lecture in the Humanities</a
                    ></span
                  >
                </div>
              </v-card-item>
              <v-card-text class="text-wrap content-item-event">
                Alexis Pauline Gumbs will offer an ecofeminist exploration into
                how the works of Black feminist poets Audre Lorde and June
                Jordan can speak to our current climate crisis.
              </v-card-text>

              <div class="d-flex flex-row align-center justify-start">
                <v-card-item>
                  <div class="regi-main">
                    <span>
                      <v-icon color="#32c188" class="icon-fontsz"
                        >mdi-circle</v-icon
                      >
                      <span class="ml-3 regi-item">Registration Open</span>
                    </span>
                  </div>
                </v-card-item>

                <v-card-item>
                  <div>
                    <span>
                      <v-icon class="stream-item">mdi-television-play</v-icon>
                      <span class="ml-3 stream-item"
                        >Live stream available</span
                      >
                    </span>
                  </div>
                </v-card-item>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" md="3">
            <div>
              <v-card class="mx-auto" variant="text" color="#767676">
                <v-card-item>
                  <div class="header-item">Date & Time</div>
                  <div class="text-wrap content-item">
                    Tuesday, April 30, 2024 4 PM ET
                  </div>
                </v-card-item>
              </v-card>
            </div>
            <div>
              <v-card class="mx-auto" variant="text" color="#767676">
                <v-card-item>
                  <div class="header-item">Location</div>
                  <div class="text-wrap content-item">
                    Knafel Center OR Online on Zoom 10 Garden Street Cambridge,
                    MA 02138
                  </div>
                </v-card-item>
              </v-card>
            </div>
          </v-col>

          <v-col cols="12" md="3">
            <v-sheet class="mx-auto">
              <nuxt-img
                src="https://radcliffe-harvard-edu.imgix.net/7a3318d8-16f7-437e-b8c3-fbf9bbe1f926/Alexis-Pauline-Gumbs_by-Sufia-Ikbal-Doucet.jpg?auto=compress%2Cformat&fit=min&fm=jpg&q=80&rect=0%2C0%2C1584%2C1584"
                fit:cover
                class="fill-image"
              >
              </nuxt-img>
            </v-sheet>
          </v-col>
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
/* logo component */
.fill-image-item {
  max-width: 100%;
  min-height: 100%;
  overflow: hidden;
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  transition: filter 0.5s ease;
}
/* logo component */
.fill-image-item:hover {
  filter: none;
  -webkit-filter: grayscale(0);
}

.fill-image {
  max-width: 100%;
  min-height: 100%;
}

.card-title,
.card-title-subtitle {
  text-align: right;
  color: #181818;
  font-family: "Lelo", helvetica, arial, sans-serif;
}

.card-title {
  font-size: 42px;
}

.card-title-subtitle {
  font-size: 16px;
}
.anchor-card-title {
  text-decoration: none;
  font-family: Rosart, serif;
  font-size: 28px;
  color: #181818;
}
.anchor-lecture {
  color: #767676;
  text-decoration: none;
  font-family: Lelo, helvetica, arial, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
}

.content-item {
  color: #181818;
  font-family: Lelo, helvetica, arial, sans-serif;
  font-size: 16px;
}

.content-item-event {
  font-family: Rosart, serif;
  font-size: 18px;
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
  font-family: Lelo, helvetica, arial, sans-serif;
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
</style>
