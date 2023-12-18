<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12" sm="10">
        <v-row>
          <v-col cols="12" sm="6">
            <v-card
              class="d-flex align-center justify-center"
              height="424"
              flat
            >
              Picture
              <v-img fit="contain" src="/images/lahlou_saadi.jpg"></v-img
            ></v-card>
          </v-col>

          <v-col cols="12" sm="6">
            <v-card
              class="d-flex align-center justify-center"
              color="blue-lighten-3"
            >
              <HomeMoto></HomeMoto>
            </v-card>
          </v-col>
          <v-col cols="12" class="justify-center">
            <v-card
              class="d-flex align-center justify-center flex-row pa-12"
              color="green-lighten-3"
            >
              <v-card-text>
                <ContentDoc
                  :path="'/pages/' + $i18n.locale + '/institute_description'"
              /></v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card class="d-flex align-center justify-center" flat>
              <v-carousel cycle hide-delimiters show-arrows="hover">
                <v-carousel-item
                  v-for="i in 7"
                  :key="i"
                  :src="'/images/location/' + i + '.jpg'"
                  cover
                ></v-carousel-item> </v-carousel
            ></v-card>
          </v-col>
          <v-col cols="8">
            <v-card
              class="d-flex align-center justify-center pa-12"
              color="brown-lighten-3"
            >
              <ContentDoc
                :path="
                  '/pages/' + $i18n.locale + '/institute_location_description'
                "
              />
            </v-card>
          </v-col>
          <v-col cols="8">
            <v-card
              class="d-flex align-center justify-center pa-12"
              color="red-lighten-3"
            >
              <ContentDoc
                :path="'/pages/' + $i18n.locale + '/institute_governance'"
              />
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card
              class="d-flex align-center justify-center pa-12"
              color="purple-lighten-3"
              :to="localePath('/about/network')"
            >
              Network overview</v-card
            >
          </v-col>
          <v-col cols="4">
            <v-card class="d-flex align-center justify-center" flat>
              <v-carousel cycle hide-delimiters show-arrows="hover">
                <v-carousel-item
                  v-for="i in 7"
                  :key="i"
                  :src="'/images/location/' + i + '.jpg'"
                  cover
                ></v-carousel-item> </v-carousel
            ></v-card>
          </v-col>
          <v-col cols="8">
            <v-card
              class="d-flex align-center justify-center pa-12"
              color="green-darken-3"
            >
              <ContentDoc
                :path="'/pages/' + $i18n.locale + '/institute_history'"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { smAndUp } = useDisplay()
const localePath = useLocalePath()
</script>
