<template>
  <v-container style="max-width: 1600px">
    <ProjectsView :item="project" :loading />
  </v-container>
</template>

<script setup>
const { $queries } = useNuxtApp()
const { fetchItem } = useFetchItem2()
const { locale } = useI18n()
const route = useRoute()

const slug = computed(() => String(route.params.slug ?? "").trim())

const asyncKey = computed(() => `project:${slug.value}:${locale.value}`)

const { data: project, pending: loading } = await useAsyncData(
  asyncKey,
  () =>
    fetchItem({
      query: $queries.projects.get,
      key: "getProject",
      variables: { itemId: slug.value, appId: "iea", lang: locale.value },
    }),
  {
    watch: [slug, () => locale.value],
    dedupe: "cancel",
  },
)
</script>
