<template>
  <v-container>
    <PublicationsView :item="publication" :loading="loading"></PublicationsView
  ></v-container>
</template>

<script setup>
import { useContentItem } from "~/composables/useContentItem"
import GET_PUBLICATION from "~/graphql/queries/item/publications.gql"

const { data: publication, loading } = useContentItem(
  GET_PUBLICATION,
  "getPublication",
  "publications",
)
</script>
