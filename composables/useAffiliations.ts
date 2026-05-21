import LIST_AFFILIATIONS from "@paris-ias/trees/dist/graphql/client/affiliations/query.list.affiliations.gql"

export const useAffiliations = async () => {
  const { locale } = useI18n()

  const {
    data: affiliationsData,
    pending,
    error,
  } = await useAsyncQuery<any>(
    LIST_AFFILIATIONS,
    {
      options: {
        skip: 0,
        limit: 100,
        filters: JSON.stringify({ category: ["MEMBER", "SUPPORT", "NETWORK"] }),
        sort: "nameasc",
      },
      appId: "iea",
      lang: locale.value,
    },
    {
      key: "affiliations",
      server: true,
    } as any,
  )

  const normalizeColor = (color: string | undefined) => {
    const named: Record<string, string> = { white: "#fff", black: "#000" }
    if (!color) return "#fff"
    const lowerColor = color.toLowerCase()
    return named[lowerColor] || color
  }

  const mapItem = (item: any) => ({
    name: item.name,
    url: item.url,
    picture: item.image?.url,
    color: normalizeColor(item.image?.backgroundColor),
    location: item.locations?.[0]
      ? [item.locations[0].city, item.locations[0].country]
          .filter(Boolean)
          .join(", ")
      : null,
    category: item.category?.[0] || null,
    ror: item.ror || null,
    summary: item.summary || null,
    description: item.description || null,
  })

  const collator = computed(
    () =>
      new Intl.Collator(locale.value, { sensitivity: "base", usage: "sort" }),
  )

  const sortByName = (items: any[]) =>
    [...items].sort((a, b) =>
      collator.value.compare(a.name || "", b.name || ""),
    )

  const filterByCategory = (category: string) =>
    computed(() =>
      sortByName(
        (affiliationsData.value?.listAffiliations?.items || []).filter(
          (item: any) => item.category?.includes(category),
        ),
      ).map(mapItem),
    )

  const filterRawByCategory = (category: string) =>
    computed(() =>
      sortByName(
        (affiliationsData.value?.listAffiliations?.items || []).filter(
          (item: any) => item.category?.includes(category),
        ),
      ),
    )

  const allAffiliations = computed(() =>
    sortByName(affiliationsData.value?.listAffiliations?.items || []).map(
      mapItem,
    ),
  )

  const membersData = filterByCategory("MEMBER")
  const networkData = filterByCategory("PARTNER")
  const supportData = filterByCategory("SPONSOR")

  const membersRaw = filterRawByCategory("MEMBER")
  const networkRaw = filterRawByCategory("PARTNER")
  const supportRaw = filterRawByCategory("SPONSOR")

  return {
    affiliationsData,
    pending,
    error,
    allAffiliations,
    membersData,
    networkData,
    supportData,
    membersRaw,
    networkRaw,
    supportRaw,
  }
}
