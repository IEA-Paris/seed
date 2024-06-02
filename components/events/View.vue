<template>
  {{ name }}
  <v-container>
    <v-row no-gutters class="d-flex flex-wrap">
      <v-col xl="3" lg="3" md="3">
        <nuxt-img
          :src="
            data.picture !== null
              ? data.picture
              : 'https://www.paris-iea.fr/images/evenements/30395/_thumb3/vignette-generique-site-web-verticale.png'
          "
          preload
          fit="inside"
          :width="
            [200, 200, 200, 250, 350, 400][
              ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name)
            ]
          "
        >
        </nuxt-img>
      </v-col>
      <v-col xl="6" lg="6" md="8">
        <div class="mt-xl-12 mt-lg-6 mt-md-2 ml-md-6">
          <div class="text-body-2">
            {{ data.date_text != null ? data.date_text : "Not defined" }}
          </div>
          <div class="font-weight-medium text-h4 mt-xl-12 mt-lg-6 mt-md-3">
            {{ data.title }}
          </div>
          <div class="d-flex mt-xl-12 mt-lg-6 mt-md-3 text-caption">
            {{ data.bookingState != null ? data.bookingState : "Not defined" }}
          </div>

          <div class="d-flex align-center mt-xl-12 mt-lg-6 mt-md-3">
            <div>
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
            </div>

            <div class="ml-xl-16 ml-lg-10 ml-md-10">
              {{ data.category != null ? data.category : "Not defined" }}
            </div>
          </div>
        </div>
      </v-col>
      <v-col xl="3" lg="3" md="1"></v-col>
    </v-row>
  </v-container>
  <v-container class="mt-xl-16 mt-lg-4">
    <v-row no-gutters>
      <v-col class="d-flex flex-column justify-center" xl="3" lg="3" md="3">
        <div>
          <v-sheet
            class="d-flex flex-column flex-wrap"
            color="grey-lighten-3"
            :width="
              [200, 200, 200, 250, 350, 400][
                ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name)
              ]
            "
          >
            <div class="pa-xl-8 pa-lg-6 pa-md-6">
              <div>
                <div>{{ data.tag === null ? data.tag : "Date et Heure" }}</div>
                <div>
                  <div>{{ data.start }}</div>
                  <div>{{ data.stop }}</div>
                </div>
              </div>

              <div class="pt-xl-6 pt-lg-4 pt-md-2">
                <div>{{ $t("location") }}</div>
                <div>
                  <div>{{ data.start }}</div>
                  <div>{{ data.location }}</div>
                  <div>
                    <v-icon class="text-blue-accent-4"
                      >mdi-chevron-double-right
                    </v-icon>
                    <a
                      href="https://www.paris-iea.fr/fr/"
                      class="text-blue-accent-4"
                      >{{ data.url === null ? data.url : "Plus de details" }}</a
                    >

                    <div>{{ data.stop }}</div>
                    <div>{{ data.location }}</div>
                    <div>
                      <v-icon class="text-blue-accent-4"
                        >mdi-chevron-double-right
                      </v-icon>
                      <a
                        href="https://www.paris-iea.fr/fr/"
                        class="text-blue-accent-4"
                        >{{
                          data.url === null ? data.url : "Plus de details"
                        }}</a
                      >
                    </div>
                  </div>
                </div>
              </div>

              <div class="pt-xl-6 pt-lg-4 pt-md-2">
                {{
                  data.tag === null
                    ? data.tag
                    : "Inscription gratuite et obligatoire"
                }}
              </div>
            </div>
          </v-sheet>
        </div>

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

        <div class="mt-xl-16 mt-lg-10 mt-md-7">
          <div>{{ data.tag === null ? data.tag : "DOCUMENT(S)" }}</div>
          <div class="d-flex mt-2">
            <v-icon> mdi-file-pdf-box</v-icon>
            <div class="ml-2">
              {{ data.tag === null ? data.tag : "Le programme (PDF)" }}
            </div>
          </div>
          <div class="d-flex mt-2">
            <v-icon> mdi-file-pdf-box</v-icon>
            <div class="ml-2">
              {{ data.tag === null ? data.tag : "Resumés des présentations" }}
            </div>
          </div>
        </div>
      </v-col>
      <v-col xl="6" lg="6" md="8">
        <div class="ml-md-2">
          <v-card flat>
            <v-tabs v-model="tab" grow center-active>
              <v-tab
                v-for="item in data.items"
                :key="item"
                :text="item"
                :value="item"
              ></v-tab>
            </v-tabs>

            <!-- <v-tabs-window v-model="tab">
              <v-tabs-window-item
                v-for="item in data.items"
                :key="item"
                :value="item"
              >
                <v-card flat>
                  <v-card-text>{{ data.text }}</v-card-text>
                </v-card>
              </v-tabs-window-item>
            </v-tabs-window> -->
          </v-card>
        </div>
      </v-col>
      <v-col xl="3" lg="3" md="1"></v-col>
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
const tab = props.data.items[0];
</script>

<style scoped>
.custom-border {
  border: 2px solid #e53935;
  text-align: center;
}
</style>
