<template>
  <v-container> <PeopleView :item="people" :loading></PeopleView></v-container>
</template>

<script setup>
import { useContentItem } from "~/composables/useContentItem"
import GET_PEOPLE from "~/graphql/queries/item/people.gql"

const { data: people, loading } = useContentItem(
  GET_PEOPLE,
  "getPeople",
  "people",
)
</script>
