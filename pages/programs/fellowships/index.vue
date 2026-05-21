<template>
  <v-container style="max-width: 1200px">
    <div class="d-flex justify-center">
      <h2 class="text-center">{{ capitalize($t("calls")) }}</h2>
    </div>
    <ContentDoc :path="intro" />
    <ListOrganismsList
      type="fellowships"
      path-prefix="activities-fellowships-slug"
    ></ListOrganismsList
  ></v-container>
</template>

<script setup>
const { locale } = useI18n()
const intro = "/pages/" + locale.value + "/fellowships_intro"
</script>
