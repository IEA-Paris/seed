<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <PeopleListHeader v-if="route.query.groups"></PeopleListHeader>
        <div class="d-flex justify-center" v-else>
          <h2 class="text-center">{{ capitalize($t("items.people", 2)) }}</h2>
        </div>

        <ListOrganismsList
          type="people"
          pathPrefix="people-slug"
        ></ListOrganismsList>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const route = useRoute()
</script>
