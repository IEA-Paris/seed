<template>
  <v-container style="max-width: 1200px">
    <div class="d-flex justify-center">
      <h2 class="text-center">{{ $t("fellowship_conditions") }}</h2>
    </div>
    <ContentDoc :path="commitments" />
  </v-container>
</template>

<script setup>
const { locale } = useI18n()
const commitments = "/pages/" + locale.value + "/programs__fellowships__conditions"
</script>

<style lang="scss" scoped></style>
