<template>
  <v-container style="max-width: 1200px">
    <div class="d-flex justify-center">
      <h2 class="text-center">{{ capitalize($t("items.events", 2)) }}</h2>
    </div>
    <ListOrganismsList
      type="events"
      pathPrefix="activities-events-slug"
    ></ListOrganismsList
  ></v-container>
</template>

<script setup></script>
