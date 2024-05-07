import completeSchema from "../utils/scripts/completeSchema"

export default async (type) => {
  console.log("CREATING MODULE FOR: ", type)
  const baseType = (await import(`../data/${type}.ts`)).default
  const baseSchema = baseType.form
  const defaultState = await completeSchema(baseSchema)

  const defaultView =
    baseType.list.views &&
    Object.keys(baseType.list.views).find((item) => {
      console.log(item)
      return baseType.list.views[item]?.default === true
    })
  const defaultSort = baseType.list.sort && [
    baseType.list.sort[
      Object.keys(baseType.list.sort).find(
        (item) => baseType.list.sort[item].default === true
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
          const templateForm = (await import(`../data/${key}.ts`)).default.form
          /* console.log("templateState: ", templateState) */
          form[key] = await buildForm(templateForm)
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
    form: {
      values: defaultForm,
      _defaults: defaultForm,
      schema: defaultState,
    },
    list: {
      items: [],
      ...(baseType?.list?.perPage?.default && {
        itemsPerPage: baseType.list?.perPage.default,
      }),
      ...(baseType?.list?.perPage?.options && {
        itemsPerPageArray: baseType.list?.perPage.options,
      }),
      filtersCount: 0,
      ...(baseType?.list?.views && {
        views: baseType.list?.views,
      }),
      ...(baseType?.list?.sort && {
        sort: baseType.list?.sort,
      }),
      view: defaultView,
      ...(defaultView?.name && { view: defaultView.name }),
      filters: {
        years: [],
        tags: [],
        language: [],
        thematic: [],
        discipline: [],
        type: [],
        ...baseType?.list?.filters,
      },
      total: 0,
      skip: 0,
      numberOfPages: 0,
      ...(baseType?.list?.perPage?.default && {
        limit: baseType.list?.perPage.default,
      }),
      search: "",
      page: 1,
      sortBy: defaultSort && [defaultSort[0].value[0]],
      sortDesc: defaultSort && defaultSort[0].value[1] === "desc",
      numberOfPages: 0,
    },
    loading: [],
    current: null,
  }
}
