<template>
  <v-container style="max-width: 1200px">
    <div class="d-flex justify-center">
      <h2 class="text-center">{{ $t("fellowship_location") }}</h2>
    </div>
    <ContentDoc :path="location" />
  </v-container>
</template>

<script setup>
const { locale } = useI18n()
const location = "/pages/" + locale.value + "/programs__fellowships__location"
</script>

<style lang="scss" scoped></style>
