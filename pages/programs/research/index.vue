<template>
  <v-container style="max-width: 1200px">
    <div class="d-flex justify-center">
      <h2 class="text-center">{{ capitalize($t("research", 2)) }}</h2>
    </div>
    <ContentDoc :path="research" />
    <ListOrganismsList
      type="projects"
      path-prefix="activities-research-slug"
      modifier="projects"
    ></ListOrganismsList>
  </v-container>
</template>

<script setup>
const { locale } = useI18n()
const research = "/pages/" + locale.value + "/programs_projects"
</script>
