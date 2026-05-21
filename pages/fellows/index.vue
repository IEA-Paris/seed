<template>
  <v-container style="max-width: 1200px">
    <PeopleListHeader v-if="route.query.groups"></PeopleListHeader>
    <div v-else class="d-flex justify-center">
      <h2 class="text-center">{{ capitalize($t("items.fellow", 2)) }}</h2>
    </div>

    <ListOrganismsList
      type="people"
      path-prefix="fellows-slug"
    ></ListOrganismsList>
  </v-container>
</template>

<script setup>
const route = useRoute()
</script>
