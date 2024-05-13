import completeSchema from "../utils/scripts/completeSchema"

export default async (type) => {
  console.log("CREATING MODULE FOR: ", type)
  const baseType = (await import(`../data/${type}.ts`)).default
  console.log("baseSchema: ", baseType)
  const defaultState = await completeSchema(baseType)

  const defaultView =
    baseType.views &&
    Object.keys(baseType.views).find((item) => {
      console.log(item)
      return baseType.views[item]?.default === true
    })
  const defaultSort = baseType.sort && [
    baseType.sort[
      Object.keys(baseType.sort).find(
        (item) => baseType.sort[item].default === true
      )
    ],
  ]

  const buildForm = async (schema) => {
    try {
      let form = {}
      for await (const key of Object.keys(schema)) {
        /* console.log("key: ", key) */
        /* console.log("schema[key]: ", schema[key]) */
        // if we deal with a template, import it dynamically
        if (schema[key]?.type === 3) {
          const templateState = (await import(`../data/${key}.ts`)).default
          /* console.log("templateState: ", templateState) */
          form[key] = await buildForm(templateState.schema)
          // if it has items, it is either an object or a collection
        } else if (schema[key]?.items) {
          // only collection have items with an array type
          if (Array.isArray(schema[key]?.items)) {
            if (!form[key]) form[key] = [{}]
            for await (const item of schema[key]?.items) {
              form[key][0] = {
                ...form[key][0],
                ...(await buildForm({ [item.key]: item })),
              }
            }
            // else it's an object
          } else {
            if (!form[key]) form[key] = {}
            for await (const subkey of Object.keys(schema[key].items)) {
              form[key] = {
                ...form[key],
                ...(await buildForm({ [subkey]: schema[key].items[subkey] })),
              }
            }
          }
        } else {
          form[key] = schema[key]?.default ?? ""
        }
      }
      return form
    } catch (error) {
      console.log("error building form: ", error)
    }
  }
  const defaultForm = await buildForm(defaultState)

  return {
    form: defaultForm,
    _defaults: defaultForm,
    items: [],
    current: null,
    ...(defaultView?.name && { view: defaultView.name }),
    total: 0,
    filters: {
      years: [],
      tags: [],
      language: [],
      thematic: [],
      discipline: [],
      type: [],
      ...baseType?.defaultFilters,
    },
    style: "APA",
    loading: [],
    skip: 0,
    numberOfPages: 0,
    ...(baseType?.perPage?.default && {
      limit: baseType.perPage.default,
    }),
    search: "",
    page: 1,
    sortBy: defaultSort && [defaultSort[0].value[0]],
    sortDesc: defaultSort && defaultSort[0].value[1] === "desc",
    schema: defaultState,
    numberOfPages: 0,
    ...(baseType?.perPage?.default && {
      itemsPerPage: baseType.perPage.default,
    }),
    ...(baseType?.perPage?.options && {
      itemsPerPageArray: baseType.perPage.options,
    }),
    filtersCount: 0,
    ...(baseType?.views && {
      views: baseType.views,
    }),
    ...(baseType?.sort && {
      sort: baseType.sort,
    }),
    view: defaultView,
  }
}
