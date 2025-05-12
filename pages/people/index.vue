<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <PeopleListHeader v-if="route.query.groups"></PeopleListHeader>
        <ListOrganismsList type="people"></ListOrganismsList>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const route = useRoute()
</script>
