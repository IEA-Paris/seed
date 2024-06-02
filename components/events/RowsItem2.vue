<template>
  {{ name }}
  <v-container>
    <v-row no-gutters>
      <v-col xl="1" lg="1" md="1" sm="1">
        <div
          class="d-flex flex-lg-column flex-md-column flex-sm-column text-center"
        >
          <span class="text-h4 text-black"> 04</span>
          <span class="text-subtitle-1 text-black">
            Jun <br />
            2024</span
          >
        </div>
      </v-col>

      <v-col xl="4" lg="5" md="8" sm="8">
        <a
          href="https://www.radcliffe.harvard.edu/event/2024-raising-our-ambitions-for-a-just-climate-future-virtual"
          class="anchor-text"
        >
          <div class="text-h5 text-black">
            Raising Our Ambitions for a Just Climate Future
          </div>
        </a>
        <div class="mt-3 text-h6 text-brown-lighten-3">Lectures</div>
        <div>
          <p>
            Join us for an interdisciplinary panel of Harvard Radcliffe
            Institute fellows to explore how leading researchers and
            policymakers are collaborating to raise our ambitions for climate
            action and climate justice.
          </p>
        </div>
        <div class="d-flex flex-wrap mt-xl-4 mt-lg-4 mt-md-4">
          <v-card flat class="bg-green-lighten-5 text-green-darken-4 pa-2 mr-4">
            <v-icon class="text-brown-lighten-3"> mdi-circle-medium </v-icon>
            Registration open
          </v-card>

          <v-card flat class="text-brown-lighten-3 pa-2">
            <v-icon class="text-brown-lighten-3"> mdi-television-play </v-icon>
            Live stream available
          </v-card>
        </div>

        <div class="d-none d-md-flex d-lg-none d-xl-none mt-md-4">
          <div class="mr-md-10">
            <span class="text-h6 text-brown-lighten-3"> Date & Time</span>
            <div>
              Wednesday, June 12, 2024 <br />
              4 PM ET
            </div>
          </div>

          <div>
            <span class="text-h6 text-brown-lighten-3"> Location</span>
            <div>Online on Zoom</div>
          </div>
        </div>
      </v-col>

      <v-col> </v-col>

      <v-col class="hidden-md hidden-sm hidden-xs" xl="2" lg="2" md="2">
        <div>
          <div>
            <span class="text-h6 text-brown-lighten-3"> Date & Time</span>
            <div>
              Wednesday, June 12, 2024 <br />
              4 PM ET
            </div>
          </div>

          <div class="mt-xl-6 mt-lg-6 mt-md-6">
            <span class="text-h6 text-brown-lighten-3"> Location</span>
            <div>Online on Zoom</div>
          </div>
        </div>
      </v-col>

      <v-col> </v-col>

      <v-col xl="3" lg="3" md="3">
        <a
          href="https://www.radcliffe.harvard.edu/event/2024-climate-justice-and-mass-incarceration-discussion-virtual"
        >
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
        </a>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { useDisplay } from "vuetify";
const { smAndUp, mdAndUp, name } = useDisplay();
const localePath = useLocalePath();

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
