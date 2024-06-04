<template>
  {{ name }}

  <v-container> </v-container>
  <v-row no-gutters>
    <v-col cols="12" md="1" lg="1" xl="1">
      <v-card flat>
        <v-card-item>
          <v-card-title
            class="d-flex flex-xl-column flex-lg-column flex-md-column text-md-right text-lg-right text-xl-right"
          >
            <span
              class="text-h3 text-black mr-2 mr-sm-2 mr-md-0 mr-lg-0 mr-xl-0"
            >
              04</span
            >
            <span
              class="text-subtitle-2 pt-1 pt-sm-1 pt-md-0 pt-lg-0 pt-xl-0 text-black"
            >
              Jun <br />
              2024</span
            >
          </v-card-title>
        </v-card-item>
      </v-card>
    </v-col>

    <v-col cols="12" md="6" lg="5" xl="5">
      <div class="ml-xl-15 ml-lg-10 ml-md-10">
        <v-card flat class="mx-auto">
          <v-card-item>
            <v-card-title>
              <nuxt-link to="/" class="text-h4 text-black text-wrap">
                {{ item.title }}
              </nuxt-link>
            </v-card-title>
            <v-card-subtitle class="mt-3 text-h6 text-brown-lighten">
              Lectures
            </v-card-subtitle>
          </v-card-item>
          <v-card-text class="text-h6 text-wrap">
            {{ item.summary }}
          </v-card-text>
        </v-card>

        <v-card flat class="d-flex flex-wrap">
          <v-card-item>
            <v-card-title
              flat
              class="bg-green-lighten-5 text-green-darken-4 pa-3"
            >
              <v-icon class="text-brown-lighten-3"> mdi-circle-medium </v-icon>
              Registration open
            </v-card-title>
          </v-card-item>

          <v-card-item>
            <v-card-title flat class="text-brown-lighten-3">
              <v-icon class="text-brown-lighten-3">
                mdi-television-play
              </v-icon>
              Live stream available
            </v-card-title>
          </v-card-item>
        </v-card>

        <v-row class="d-none d-md-flex d-lg-none">
          <v-col cols="6">
            <v-card flat>
              <v-card-item>
                <v-card-title class="text-h6 text-brown-lighten-3 text-wrap">
                  Date & Time
                </v-card-title>
              </v-card-item>
              <v-card-text class="text-h6">
                {{ item.date_text }} <br />
                {{ formatDate(item.start, "fr-FR") }}
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="6">
            <v-card flat>
              <v-card-item>
                <v-card-title class="text-h6 text-brown-lighten-3 text-wrap">
                  Location
                </v-card-title>
              </v-card-item>
              <v-card-text class="text-h6 text-wrap">
                {{ item.location }}</v-card-text
              >
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-col>

    <v-col cols="12" md="1" lg="1" xl="1"> </v-col>

    <v-col cols="12" lg="2" xl="2" class="hidden-md-and-down">
      <v-card flat class="mx-auto">
        <v-card-item>
          <v-card-title class="text-h6 text-brown-lighten-3">
            Date & Time
          </v-card-title>
        </v-card-item>
        <v-card-text class="text-h6">
          {{ item.date_text }} <br />
          {{ formatDate(item.start, "fr-FR") }}
        </v-card-text>
      </v-card>

      <v-card flat class="mx-auto">
        <v-card-item>
          <v-card-title class="text-h6 text-brown-lighten-3">
            location
          </v-card-title>
        </v-card-item>
        <v-card-text class="text-h6"> {{ item.location }}</v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="1" lg="1" xl="1"> </v-col>

    <v-col cols="12" md="3" lg="2" xl="2">
      <v-card flat class="mx-auto"> </v-card>
      <v-card-item>
        <v-card-title class="card-title">
          <nuxt-link to="/">
            <v-img
              :src="item.picture"
              :aspect-ratio="1 / 1"
              cover
              class="img-animation"
            >
            </v-img> </nuxt-link></v-card-title
      ></v-card-item>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { useDisplay } from "vuetify";
import { formatDate } from "~/composables/useUtils";

const { smAndUp, mdAndUp, name } = useDisplay();

const localePath = useLocalePath();

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.card-title {
  overflow: hidden;
}
.img-animation {
  transition: all 1.1s;
}

.img-animation:hover {
  transform: scale(1.1);
}
</style>
