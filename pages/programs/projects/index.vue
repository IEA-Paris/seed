<template>
  <v-container style="max-width: 1200px">
    <div class="d-flex justify-center">
      <h2 class="text-center">{{ capitalize($t("items.projects", 2)) }}</h2>
    </div>
    <ContentDoc :path="projects" />
    <ListOrganismsList
      type="projects"
      path-prefix="activities-projects-slug"
      modifier="projects"
    ></ListOrganismsList>
  </v-container>
</template>

<script setup>
const { locale } = useI18n()
const projects = "/pages/" + locale.value + "/programs_projects"
</script>
