<template>
  <v-container style="max-width: 1200px">
    <div class="d-flex justify-center">
      <h2 class="text-center">{{ capitalize($t("items.platforms", 2)) }}</h2>
    </div>
    <ContentDoc :path="platforms" />
    <ListOrganismsList
      type="projects"
      path-prefix="activities-platforms-slug"
      modifier="platforms"
    ></ListOrganismsList>
  </v-container>
</template>

<script setup>
const { locale } = useI18n()
const platforms = "/pages/" + locale.value + "/programs_platforms"
</script>
