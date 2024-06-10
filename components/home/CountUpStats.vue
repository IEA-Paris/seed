<template>
  <v-row>
    <v-col cols="12">
      <div class="text-h4 text-md-h2 mb-3" v-motion-slide-visible-once-bottom>
        {{ $t("by-the-numbers") }}
      </div>
    </v-col>
    <v-col
      cols="12"
      md="4"
      class="d-flex justify-center flex-column"
      v-motion-slide-visible-once-bottom
    >
      <div class="text-overline">{{ $t("fellows") }}</div>
      <!-- <count-up class="text-h4 text-md-h2" :end-val="1883"></count-up> -->
      <div class="mt-3 text-h5">
        {{ $t("people-attending-our-events-since-2011") }}
      </div>
    </v-col>

    <v-col
      cols="12"
      md="4"
      class="d-flex justify-center flex-column"
      v-motion-slide-visible-once-bottom
    >
      <div class="text-overline">{{ $t("events.key") }}</div>
      <!-- <count-up class="text-h4 text-md-h2" :end-val="2628"></count-up> -->
      <div class="mt-3 text-h5">{{ $t("events-organized-at-paris-ias") }}</div>
    </v-col>

    <v-col
      cols="12"
      md="4"
      class="d-flex justify-center flex-column"
      v-motion-slide-visible-once-bottom
    >
      <div class="text-overline">{{ $t("fellowships") }}</div>
      <!-- <count-up class="text-h4 text-md-h2" :end-val="104"></count-up> -->
      <div class="mt-3 text-h5">
        {{
          $t("fellowships-programs-and-research-projects-hosted-at-paris-ias")
        }}
      </div>
    </v-col>
  </v-row>
</template>

<script setup></script>

<style lang="scss" scoped></style>
