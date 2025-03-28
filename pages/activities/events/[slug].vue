<template>
  <v-container style="max-width: 1600px">
    <EventsView :item="event" :loading="loading"></EventsView>
  </v-container>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "~/store/root"
import GET_EVENT from "~/graphql/queries/item/events.gql"

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
const { result, loading, error, refetch } = useQuery(GET_EVENT, variables)

let event = computed(() => {
  console.log("reassign computed event", result.value?.getEvent)
  return result.value?.getEvent
})
onMounted(() => {
  console.log("variables: ", variables)
  if (!loading) refetch(variables.value)

  rootStore.setLoading(false, "events")
})
</script>
