<template>
  <v-container> <NewsView v-if="news" :item="news"></NewsView></v-container>
  <pre>{{ news }}</pre>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { reactive, computed, watch, ref } from "vue"
import { useRootStore } from "~/store/root"
import GET_NEWS from "~/graphql/queries/item/news.gql"
import { useQuery } from "@vue/apollo-composable"

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

const { result, loading, error, refetch } = useQuery(GET_NEWS, variables)

const news = computed(() => result.value?.getNews || null)

watch(locale, (newLocale) => {
  variables.value.lang = newLocale
  refetch()
})

console.log("LOADING", loading.value)

watchEffect(() => {
  rootStore.setLoading(false, "news")
})

watchEffect(() => {
  if (error.value) {
    console.error("Erreur durant le chargement des données news :", error.value)
  }
})
</script>
