interface Options {
  resourceName: string
  documentGql: any
  responseKey: string
  appId?: string
}

interface Result<T> {
  resourceItem: Ref<T | null>
  loading: Ref<boolean>
}

export const useI18nResourceItem = <T = any>(
  options: Options,
): Result<T> => {
  const { resourceName, documentGql, responseKey, appId } = options

  const { fetchItem } = useFetchItem()
  const { locale } = useI18n()
  const route = useRoute()
  const router = useRouter()
  const localePath = useLocalePath()

  const slug = computed(() => route.params.slug as string)

  const resourceItem = ref<T | null>(null) as Ref<T | null>
  const loading = ref(true)

  const doFetch = async () => {
    const currentSlug = slug.value
    if (!currentSlug) return

    loading.value = true
    try {
      const item = await fetchItem<T>({
        query: documentGql,
        key: responseKey,
        variables: {
          itemId: currentSlug,
          appId,
          lang: locale.value,
        },
      })
      resourceItem.value = item
    } catch (error) {
      console.error(`[useI18nResourceItem] fetch failed for ${resourceName}:`, error)
      resourceItem.value = null
    } finally {
      loading.value = false
    }
  }

  // Fetch on setup
  doFetch()

  // Re-fetch when slug or locale changes
  watch([slug, locale], () => {
    doFetch()
  })

  watch(
    [resourceItem, locale],
    ([nextItem, _nextLocale]) => {
      if (!(nextItem as any)?.slug) return

      if (route.params.slug !== (nextItem as any).slug) {
        router.replace(
          localePath({
            params: { ...route.params, slug: (nextItem as any).slug },
          }),
        )
      }
    },
    { immediate: true },
  )

  return {
    resourceItem,
    loading,
  }
}
