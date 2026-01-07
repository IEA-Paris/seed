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

export const useI18nResourceItem = async <T = any>(
  options: Options,
): Promise<Result<T>> => {
  const { resourceName, documentGql, responseKey, appId } = options

  const { fetchItem } = useFetchItem()
  const { locale } = useI18n()
  const route = useRoute()
  const router = useRouter()
  const localePath = useLocalePath()

  const cacheKey = computed(
    () => `${resourceName}:${route.params.slug}:${locale.value}`,
  )

  const { data: resourceItem, pending: loading } = await useAsyncData(
    cacheKey,
    () =>
      fetchItem({
        query: documentGql,
        key: responseKey,
        variables: {
          itemId: route.params.slug,
          appId,
          lang: locale.value,
        },
      }),
    {
      watch: [() => route.params.slug, () => locale.value],
      dedupe: "cancel",
    },
  )

  watch(
    [resourceItem, locale],
    ([nextItem, _nextLocale]) => {
      if (!nextItem?.slug) return

      const localizedSlug = JSON.parse(nextItem.slug)
      if (route.params.slug !== localizedSlug) {
        router.replace(
          localePath({
            params: { ...route.params, slug: localizedSlug },
          }),
        )
      }
    },
    { immediate: true },
  )

  return {
    resourceItem: resourceItem as Ref<T | null>,
    loading,
  }
}
