<template>
  <div class="d-flex flex-md-row flex-sm-column">
    <div class="ml-xl-40 ml-lg-5 ml-md-4">
      <v-sheet class="mx-auto" variant="text">
        <div class="text-wrap">
          <span>
            <a
              href="https://www.radcliffe.harvard.edu/event/2024-alexis-pauline-gumbs-lecture"
              class="anchor-card-title"
            >
              Audre Lorde, June Jordan, and a Homemade Field of Love
            </a>
          </span>

          <div class="text-wrap mt-3">
            <span class="lecture">
              Lectures •<a
                href="https://www.radcliffe.harvard.edu/events-and-exhibitions/series/kim-and-judy-davis-deans-lecture-in-the-humanities"
                title="Kim and Judy Davis Dean's Lecture in the Humanities"
                class="anchor-lecture"
              >
                Kim and Judy Davis Dean's Lecture in the Humanities</a
              ></span
            >
          </div>
        </div>

        <p class="text-wrap content-item-event">
          Alexis Pauline Gumbs will offer an ecofeminist exploration into how
          the works of Black feminist poets Audre Lorde and June Jordan can
          speak to our current climate crisis.
        </p>

        <div
          class="d-flex flex-lg-row flex-md-row flex-sm-row flex-row flex-wrap align-center justify-lg-start justify-md-start justify-sm-start justify-start"
        >
          <div>
            <div class="regi-main">
              <span>
                <v-icon color="#32c188" class="icon-fontsz">mdi-circle</v-icon>
                <span class="ml-3 regi-item">REGISTRATION OPEN</span>
              </span>
            </div>
          </div>

          <div>
            <div class="stream-main">
              <span>
                <v-icon class="stream-item">mdi-television-play</v-icon>
                <span class="ml-3 stream-item">Live stream available</span>
              </span>
            </div>
          </div>
        </div>
      </v-sheet>
    </div>

    <div
      class="d-flex flex-md-column flex-sm-row flex-sm-row hidden-xs ml-xl-48 ml-lg-48 ml-md-12"
    >
      <div>
        <v-card class="mx-auto" variant="text" color="#767676">
          <v-card-item>
            <span class="header-item">Date & Time</span>
            <div class="text-wrap content-item">
              Tuesday, April 30, 2024 4 PM ET
            </div>
          </v-card-item>
        </v-card>
      </div>
      <div>
        <v-card class="mx-auto" variant="text" color="#767676">
          <v-card-item>
            <span class="header-item">Location</span>
            <div class="text-wrap content-item">
              Knafel Center OR Online on Zoom 10 Garden Street Cambridge, MA
              02138
            </div>
          </v-card-item>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import slugify from "~/assets/utils/slugify"

import { useDisplay } from "vuetify"
const { smAndUp, mdAndUp, name } = useDisplay()
const localePath = useLocalePath()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>
<style lang="scss"></style>
