<template>
  <v-container> <NewsView :item="news" :loading></NewsView></v-container>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "~/store/root"
import GET_NEWS from "~/graphql/queries/item/news.gql"

const { locale } = useI18n()
const { smAndUp, mdAndUp } = useDisplay()
const route = useRoute()
const localePath = useLocalePath()
const rootStore = useRootStore()

const variables = ref({
  itemId: route.params.slug.trim(),
  appId: "iea",
  lang: locale.value,
})
const { result, loading, error, refetch } = await useQuery(GET_NEWS, variables)

let news = computed(() => {
  console.log("reassign computed news", result.value?.getNews)
  return result.value?.getNews
})
onMounted(() => {
  console.log("variables: ", variables)
  if (!loading) refetch(variables.value)

  rootStore.setLoading(false, "news")
})
</script>
