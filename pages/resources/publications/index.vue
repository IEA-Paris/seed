<template>
  <v-container style="max-width: 1200px">
    <div class="d-flex justify-center">
      <h2 class="text-center">{{ capitalize($t("items.publications", 2)) }}</h2>
    </div>
    <ListOrganismsList
      type="publications"
      path-prefix="resources-publications-slug"
    ></ListOrganismsList
  ></v-container>
</template>

<script setup></script>
