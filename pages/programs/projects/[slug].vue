<template>
  <v-container style="max-width: 1600px">
    <ProjectsView :item="project" :loading />
  </v-container>
</template>

<script setup>
const { $queries } = useNuxtApp()

const { resourceItem: project, loading } = useI18nResourceItem({
  resourceName: "project",
  documentGql: $queries.projects.get,
  responseKey: "getProject",
  appId: "iea",
})
</script>
