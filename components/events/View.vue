<template>
  {{ name }}
  <v-container>
    <v-row no-gutters class="d-flex flex-wrap">
      <v-col xl="3" lg="3" md="3">
        <nuxt-img
          src="https://radcliffe-harvard-edu.imgix.net/ec5f9088-c7ce-48ef-be6c-876028f54fb2/iStock-664514716.jpg?auto=compress%2Cformat&fit=min&fm=jpg&q=80&rect=1390%2C0%2C3257%2C3256"
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
          <div class="text-body-2">3 et 4 Octobre</div>
          <div class="font-weight-medium text-h4 mt-xl-12 mt-lg-6 mt-md-3">
            Quelle sociolinguistique critique il y a 20 ans et aujourd'hui
          </div>
          <div class="d-flex mt-xl-12 mt-lg-6 mt-md-3 text-caption">
            En partenariat avec l'EPHE et le CNRS
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
                Inscription Ouverte
              </v-btn>
            </div>

            <div class="ml-xl-16 ml-lg-10 ml-md-10">Colloquium</div>
          </div>
        </div>
      </v-col>
      <v-col xl="3" lg="3" md="1"></v-col>
    </v-row>
  </v-container>
  <v-container class="mt-xl-16 mt-lg-4">
    <v-row no-gutters class="d-flex flex-wrap">
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
                <div>Date et Heure</div>
                <div>
                  <div>Le 03 Octobre 2024 de 8h à 17h</div>
                  <div>Le 04 octobre 2024 de 10h à 16h</div>
                </div>
              </div>

              <div class="pt-xl-6 pt-lg-4 pt-md-2">
                <div>Lieu</div>
                <div>
                  <div>Le 03 octobre 2024</div>
                  <div>IEA de Paris</div>
                  <div>
                    <v-icon class="text-blue-accent-4"
                      >mdi-chevron-double-right
                    </v-icon>
                    <a
                      href="https://www.paris-iea.fr/fr/"
                      class="text-blue-accent-4"
                      >Plus de details</a
                    >

                    <div>Le 04 octobre 2024</div>
                    <div>EPHE - Site Condorcet</div>
                    <div>
                      <v-icon class="text-blue-accent-4"
                        >mdi-chevron-double-right
                      </v-icon>
                      <a
                        href="https://www.paris-iea.fr/fr/"
                        class="text-blue-accent-4"
                        >Plus de details</a
                      >
                    </div>
                  </div>
                </div>
              </div>

              <div class="pt-xl-6 pt-lg-4 pt-md-2">
                Inscription gratuite et obligatoire
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
            JE M'INSCRIS
          </v-btn>
        </div>

        <div class="mt-xl-16 mt-lg-10 mt-md-7">
          <div>DOCUMENT (S)</div>
          <div class="d-flex mt-2">
            <v-icon> mdi-file-pdf-box</v-icon>
            <div class="ml-2">Le programme (PDF)</div>
          </div>
          <div class="d-flex mt-2">
            <v-icon> mdi-file-pdf-box</v-icon>
            <div class="ml-2">Resumés des présentations</div>
          </div>
        </div>
      </v-col>
      <v-col xl="6" lg="6" md="8">
        <div class="ml-md-2">
          <v-card flat>
            <v-tabs v-model="tab" grow center-active>
              <v-tab
                v-for="item in items"
                :key="item"
                :text="item"
                :value="item"
              ></v-tab>
            </v-tabs>

            <v-tabs-window v-model="tab">
              <v-tabs-window-item
                v-for="item in items"
                :key="item"
                :value="item"
              >
                <v-card flat>
                  <v-card-text>{{ text }}</v-card-text>
                </v-card>
              </v-tabs-window-item>
            </v-tabs-window>
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

const tab = ref(null);
const items = ref(["Presentation", "Programme"]);
const text = ref(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
);
</script>

<style scoped>
.custom-border {
  border: 2px solid #e53935;
  text-align: center;
}
</style>
