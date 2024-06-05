<template>
  {{ name }}
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" xl="3" lg="3" md="3">
        <v-img
          :src="data.picture"
          :aspect-ratio="1 / 1"
          cover
          class="img-animation"
        >
        </v-img>
      </v-col>

      <v-col
        cols="12"
        xl="6"
        lg="6"
        md="9"
        class="d-flex flex-md-column justify-md-end flex-wrap ml-md-10 ml-md-12 ml-md-14"
      >
        <v-card flat>
          <v-card-item>
            <v-card-title class="text-wrap text-body-1">
              {{ data.date_text != null ? data.date_text : "Not defined" }}
            </v-card-title>
          </v-card-item>
        </v-card>

        <v-card flat>
          <v-card-item>
            <v-card-title class="text-wrap text-h5">
              {{ data.title }}
            </v-card-title>
          </v-card-item>
        </v-card>

        <v-card flat>
          <v-card-item>
            <v-card-title class="text-body-1">
              {{
                data.bookingState != null ? data.bookingState : "Not defined"
              }}
            </v-card-title>
          </v-card-item>
        </v-card>

        <v-card flat class="d-flex">
          <v-card-item>
            <v-card-title>
              <v-btn
                class="text-body-1"
                rounded
                variant="tonal"
                append-icon="mdi-circle-medium"
              >
                <template v-slot:append>
                  <v-icon class="text-brown-lighten-3">
                    mdi-circle-medium</v-icon
                  >
                </template>
                {{ data.title ? "Inscription Ouverte" : "Inscription Ferme" }}
              </v-btn>
            </v-card-title>
          </v-card-item>

          <v-card-item>
            <v-card-title class="text-body-1">
              {{ data.category != null ? data.category : "Not defined" }}
            </v-card-title>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="12" xl="3" lg="3" md="1"></v-col>
    </v-row>
  </v-container>

  <v-container>
    <v-row no-gutters>
      <v-col
        class="d-flex flex-column justify-center mt-lg-6"
        cols="12"
        xl="3"
        lg="3"
        md="3"
      >
        <v-img :aspect-ratio="1 / 2" class="bg-grey-lighten-3">
          <div class="mt-lg-8 ml-lg-8 mt-xl-16 ml-xl-14">
            <div class="text-body-1">Date et Heure</div>
            <div>
              <div>{{ data.start }}</div>
              <div>{{ data.stop }}</div>
            </div>

            <div class="text-body-1 mt-lg-8 mt-xl-16">
              {{ $t("location") }}
            </div>
            <div>
              <div>{{ data.start }}</div>
              <div>{{ data.location }}</div>
              <div>
                <v-icon class="text-blue-accent-4"
                  >mdi-chevron-double-right
                </v-icon>
                <nuxt-link to="/"> Plus de details </nuxt-link>

                <div>{{ data.stop }}</div>
                <div>{{ data.location }}</div>
                <div>
                  <v-icon class="text-blue-accent-4"
                    >mdi-chevron-double-right
                  </v-icon>
                  <nuxt-link to="/">Plus de details </nuxt-link>
                </div>
              </div>
            </div>

            <div class="mt-lg-8 mt-xl-16">
              {{
                data.tag === null
                  ? data.tag
                  : "Inscription gratuite et obligatoire"
              }}
            </div>
          </div>
        </v-img>

        <div class="mt-xl-16 mt-lg-12 mt-md-8">
          <v-btn
            :width="
              [200, 200, 200, 250, 350, 400][
                ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name)
              ]
            "
            class="rounded-pill bg-blue-accent-4 text-center"
          >
            {{ data.tag === null ? data.tag : "JE M'INSCRIS" }}
          </v-btn>
        </div>

        <v-card flat>
          <v-list>
            <v-list-subheader>{{
              data.tag === null ? data.tag : "DOCUMENT(S)"
            }}</v-list-subheader>
            <v-list-item v-for="(item, i) in items" :key="i" :value="item">
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" xl="6" lg="6" md="8"> </v-col>
      <v-col cols="12" xl="3" lg="3" md="1"></v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";
const { name } = useDisplay();
const { smAndUp } = useDisplay();
const localePath = useLocalePath();

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const itemsValue = ["Presentation", "Programme"];

const items = [
  { text: "Le programme (PDF)", icon: "mdi-file-pdf-box" },
  { text: "Resumés des présentations", icon: "mdi-file-pdf-box" },
];
</script>

<style scoped></style>
