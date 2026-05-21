<template>
  <v-container style="max-width: 1200px">
    <div class="d-flex justify-center">
      <h2 class="text-center">{{ capitalize($t("items.initiatives", 2)) }}</h2>
    </div>
    <ContentDoc :path="initiatives" />
    <ListOrganismsList
      type="projects"
      path-prefix="activities-initiatives-slug"
      modifier="initiatives"
    ></ListOrganismsList>
  </v-container>
</template>

<script setup>
const { locale } = useI18n()
const initiatives = "/pages/" + locale.value + "/programs_initiatives"
</script>
