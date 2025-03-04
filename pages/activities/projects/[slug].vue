<template>
  <v-container>
    <ProjectsView :item="project" :loading></ProjectsView
  ></v-container>
</template>

<script setup async>
const route = useRoute()
const { locale } = useI18n()
import { useRootStore } from "~/store/root"
import GET_PROJECT from "~/graphql/queries/item/projects.gql"

const rootStore = useRootStore()

const variables = ref({
  itemId: route.params.slug.trim(),
  appId: "iea",
  lang: locale.value,
})

const { result, loading, error, refetch } = useQuery(GET_PROJECT, variables)

let project = computed(() => {
  console.log("reassign computed project", result.value?.getProject)
  return result.value?.getProject
})
onMounted(() => {
  console.log("variables: ", variables)
  if (!loading) refetch(variables.value)

  rootStore.setLoading(false, "project")
})
</script>
