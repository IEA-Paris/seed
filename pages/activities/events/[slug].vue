<template>
  <v-container style="max-width: 1600px">
    <EventsView :item="event" :loading />
  </v-container>
</template>

<script setup>
const { $queries } = useNuxtApp()
const { resourceItem: event, loading } = await useI18nResourceItem({
  resourceName: "event",
  documentGql: $queries.events.get,
  responseKey: "getEvent",
  appId: "iea",
})
</script>
