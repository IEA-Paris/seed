<template>
  <v-row>
    <v-col
      v-for="(items, type) in filteredRelatedItems"
      :key="type"
      cols="12"
      md="3"
    >
      <MiscMoleculesRelatedItems :type="type" :items="items" />
    </v-col>
  </v-row>
</template>

<script setup>
defineProps({
  related: {
    type: Object,
    required: true,
  },
})

const typeMapping = {
  events: "events",
  people: "people",
  news: "news",
  projects: "projects",
}

const filteredRelatedItems = computed(() => {
  const result = {}
  for (const key in typeMapping) {
    if (related[key] && related[key].length > 0) {
      result[typeMapping[key]] = related[key]
    }
  }
  return result
})
</script>
