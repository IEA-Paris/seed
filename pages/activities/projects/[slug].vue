<template>
  <v-container>
    <ProjectsView :item="project" :loading="loading"></ProjectsView
  ></v-container>
</template>

<script setup>
import { useContentItem } from "~/composables/useContentItem"
import GET_PROJECT from "~/graphql/queries/item/projects.gql"

const { data: project, loading } = useContentItem(
  GET_PROJECT,
  "getProject",
  "projects",
)
</script>
