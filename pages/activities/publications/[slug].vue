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
    <PublicationsView :item="publication" :loading="loading"></PublicationsView
  ></v-container>
</template>

<script setup>
// import { useRootStore } from "~/store/root"
import GET_PUBLICATION from "~/graphql/queries/item/publications.gql"
import { useContentItem } from "~/composables/useContentItem"

const { data: publication, loading } = useContentItem(
  GET_PUBLICATION,
  "getPublication",
  "publications",
)

// const route = useRoute()
// const { locale } = useI18n()

// const rootStore = useRootStore()

// const variables = ref({
//   itemId: route.params.slug.trim(),
//   appId: "iea",
//   lang: locale.value,
// })
// const { result, loading, error, refetch } = useQuery(GET_PUBLICATION, variables)

// const publications = computed(() => {
//   const data = result.value
//   if (!data || !data.getPublication) return null
//   console.log("reassign computed publication", data.getPublication)
//   return data.getPublication
// })
// onMounted(() => {
//   console.log("variables: ", variables)
//   if (!loading.value) refetch(variables.value)

//   rootStore.setLoading(false, "publications")
// })
</script>
