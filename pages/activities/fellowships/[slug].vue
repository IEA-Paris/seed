<template>
  <v-container>
    <FellowshipsView :item="fellowship" :loading="loading" />
  </v-container>
</template>

<script setup>
import { useContentItem } from "~/composables/useContentItem"
import GET_FELLOWSHIP from "~/graphql/queries/item/fellowships.gql"

const { data: fellowship, loading } = useContentItem(
  GET_FELLOWSHIP,
  "getFellowship",
  "fellowships",
)
</script>
