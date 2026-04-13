<template>
  <v-container style="max-width: 1200px">
    <div class="d-flex justify-center">
      <h2 class="text-center">{{ capitalize($t("items.projects", 2)) }}</h2>
    </div>
    <ListOrganismsList
      type="projects"
      pathPrefix="activities-projects-slug"
    ></ListOrganismsList>
  </v-container>
</template>

<script setup></script>
