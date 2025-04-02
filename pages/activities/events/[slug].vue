<template>
  <v-container style="max-width: 1600px">
    <EventsView :item="event" :loading="loading"></EventsView>
  </v-container>
</template>

<script setup>
import { useContentItem } from "~/composables/useContentItem"
import GET_EVENT from "~/graphql/queries/item/events.gql"

const { data: event, loading } = useContentItem(GET_EVENT, "getEvent", "events")
</script>
