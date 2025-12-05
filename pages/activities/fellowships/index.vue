<template>
  <v-container style="max-width: 1200px">
    <div class="d-flex justify-center">
      <h2 class="text-center">{{ capitalize($t("items.fellowships", 2)) }}</h2>
    </div>
    <ListOrganismsList
      type="fellowships"
      pathPrefix="activities-fellowships-slug"
    ></ListOrganismsList
  ></v-container>
</template>

<script setup></script>
