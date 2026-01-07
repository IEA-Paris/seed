<template>
  <v-container> <PeopleView :item="people" :loading /></v-container>
</template>

<script setup>
const { $queries } = useNuxtApp()
const { resourceItem: people, loading } = await useI18nResourceItem({
  resourceName: "people",
  documentGql: $queries.people.get,
  responseKey: "getPeople",
  appId: "iea",
})
</script>
