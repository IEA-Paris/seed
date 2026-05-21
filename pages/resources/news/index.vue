<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-center">
          <h2 class="text-center">{{ capitalize($t("items.news", 2)) }}</h2>
        </div>
        <ListOrganismsList
          type="news"
          path-prefix="resources-news-slug"
        ></ListOrganismsList> </v-col
    ></v-row>
  </v-container>
</template>

<script setup></script>
