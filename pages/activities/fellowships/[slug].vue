<template>
  <v-container>
    <FellowshipsView :item="fellowship" :loading="loading" />
  </v-container>
</template>

<script setup>
import { useDisplay } from "vuetify"
// import { useRootStore } from "~/store/root"
import GET_FELLOWSHIP from "~/graphql/queries/item/fellowships.gql"

// const { locale } = useI18n()
const { smAndUp, mdAndUp } = useDisplay()
// const route = useRoute()
// const localePath = useLocalePath()
// const rootStore = useRootStore()

// const variables = ref({
//   itemId: route.params.slug.trim(),
//   appId: "iea",
//   lang: locale.value,
// })
// const { result, loading, error, refetch } = useQuery(GET_FELLOWSHIP, variables)

// let fellowship = computed(() => {
//   console.log("reassign computed fellowship", result.value)
//   return result.value?.getFellowship
// })
// onMounted(() => {
//   console.log("variables: ", variables)
//   if (!loading) refetch(variables.value)
// })

import { useContentItem } from "~/composables/useContentItem"

const { data: fellowship, loading } = useContentItem(
  GET_FELLOWSHIP,
  "getFellowship",
  "fellowships",
)
</script>
