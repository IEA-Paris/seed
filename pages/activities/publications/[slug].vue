<template>
  <!-- <v-container>
    <v-row>
      <v-col cols="12">
        <v-img block :src="item.picture" height="250px"></v-img>
        <v-card-title>{{ item.title }}</v-card-title>
        <v-card-text> <ContentRenderer :value="item" /></v-card-text>
      </v-col>
    </v-row>
  </v-container> -->

  <v-container>
    <PublicationsView :item="publications" :loading></PublicationsView
  ></v-container>
</template>

<script setup>
const route = useRoute()
const { locale } = useI18n()
import { useRootStore } from "~/store/root"
import GET_PUBLICATION from "~/graphql/queries/item/publications.gql"
const rootStore = useRootStore()

const variables = ref({
  itemId: route.params.slug.trim(),
  appId: "iea",
  lang: locale.value,
})
const { result, loading, error, refetch } = useQuery(GET_PUBLICATION, variables)

let publications = computed(() => {
  console.log("reassign computed publication", result.value?.getPublication)
  return result.value?.getPublication
})
onMounted(() => {
  console.log("variables: ", variables)
  if (!loading) refetch(variables.value)

  rootStore.setLoading(false, "publications")
})
</script>
