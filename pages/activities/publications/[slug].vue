<template>
  <v-container style="max-width: 1600px">
    <PublicationsView :item="publication" :loading />
  </v-container>
</template>

<script setup>
const { $queries } = useNuxtApp()

const { resourceItem: publication, loading } = await useI18nResourceItem({
  resourceName: "publication",
  documentGql: $queries.publications.get,
  responseKey: "getPublication",
  appId: "iea",
})
</script>
