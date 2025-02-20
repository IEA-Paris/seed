<template>
  <!-- <v-container> <PeopleView :item="people" :loading></PeopleView></v-container> -->
  <pre>{{ people }}</pre>
</template>

<script setup>
import { useRootStore } from "~/store/root"
import { useDisplay } from "vuetify"
import GET_PEOPLE from "~/graphql/queries/item/people.gql"

const { smAndUp, mdAndUp } = useDisplay()

const localePath = useLocalePath()
const rootStore = useRootStore()
const { locale } = useI18n()
const route = useRoute()

const variables = ref({
  itemId: route.params.slug.trim(),
  appId: "iea",
  lang: locale.value,
})
const { result, loading, error, refetch } = useQuery(GET_PEOPLE, variables)

let people = computed(() => {
  console.log("reassign computed people", result.value?.getPeople)
  return result.value?.getPeople
})
onMounted(() => {
  console.log("variables: ", variables)
  if (!loading) refetch(variables.value)
  rootStore.setLoading(false, "people")
})
</script>
