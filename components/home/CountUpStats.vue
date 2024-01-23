<template>
  <v-row>
    <v-col cols="12">
      <h1 class="mb-3">{{ $t("by-the-numbers") }}</h1>
    </v-col>
    <v-col cols="4" class="d-flex justify-center flex-column">
      <div class="text-overline">{{ $t("fellows") }}</div>
      <count-up class="text-h3" :end-val="1883"></count-up>
      <div class="mt-3">Paris IAS Fellowships awarded since 2011</div>
    </v-col>

    <v-col cols="4" class="d-flex justify-center flex-column">
      <div class="text-overline">{{ $t("events") }}</div>
      <count-up class="text-h3" :end-val="2628"></count-up>
      <div class="mt-3">Events organized at Paris IAS</div>
    </v-col>

    <v-col cols="4" class="d-flex justify-center flex-column">
      <div class="text-overline">{{ $t("fellowships") }}</div>
      <count-up class="text-h3" :end-val="104"></count-up>
      <div class="mt-3">
        Fellowships programs and research projects hosted at Paris IAS
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import CountUp from "vue-countup-v3"
</script>

<style lang="scss" scoped></style>
