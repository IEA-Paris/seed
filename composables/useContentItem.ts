import { onMounted, computed, ref } from "vue"
import { useQuery } from "@vue/apollo-composable"
import { useRoute } from "vue-router"
import { useI18n } from "vue-i18n"
import { useRootStore } from "~/store/root"

export function useContentItem(query: any, key: string, context: string) {
  const route = useRoute()
  const { locale } = useI18n()
  const rootStore = useRootStore()

  const variables = ref({
    itemId: route.params.slug?.toString().trim(),
    appId: "iea",
    lang: locale.value,
  })

  const { result, loading, error, refetch } = useQuery(query, variables)

  const data = computed(() => {
    const value = result.value
    if (!value || !value[key]) return null
    console.log(`reassign computed ${key}`, value[key])
    return value[key]
  })

  onMounted(() => {
    console.log("variables:", variables)
    if (!loading.value) refetch(variables.value)
    rootStore.setLoading(false, context)
  })

  return {
    data,
    loading,
    error,
  }
}
