import { FormEvent, ConfigEvent } from "~/data/event"
import completeSchema from "../utils/scripts/completeSchema"

export default async (type: string) => {
  console.log("CREATING MODULE FOR: ", type)
  const baseType: ConfigEvent = (await import(`../data/${type}.ts`)).default
  const baseSchema: FormEvent = baseType.form
  const defaultState: FormEvent = await completeSchema(baseSchema)
  console.log("defaultState", defaultState)

  const defaultViewKey: string | undefined =
    baseType.list.views &&
    Object.keys(baseType.list.views).find((item) => {
      baseType.list.views[item]?.default === true
    })
  const defaultView =
    defaultViewKey !== undefined
      ? baseType.list.views[defaultViewKey]
      : undefined

  const defaultSortKey: string | undefined =
    baseType.list.sort &&
    Object.keys(baseType.list.sort).find((item) => {
      baseType.list.sort[item].default === true
    })

  const defaultSort =
    defaultSortKey !== undefined
      ? baseType.list.sort[defaultSortKey]
      : undefined

  const buildForm = async (schema: FormEvent): Promise<any> => {
    try {
      // REFACTOR LATER
      let form: { [key: string]: any } = {}
      for await (const key of Object.keys(schema)) {
        /* console.log("key: ", key) */
        /* console.log("schema[key]: ", schema[key]) */
        // if we deal with a template, import it dynamically
        if (schema[key]?.type === 3) {
          const templateForm: FormEvent = (await import(`../data/${key}.ts`))
            .default.form
          /* console.log("templateState: ", templateState) */
          form[key] = await buildForm(templateForm)
          // if it has items, it is either an object or a collection
        } else if (schema[key]?.items) {
          // only collection have items with an array type
          if (Array.isArray(schema[key]?.items)) {
            // if (!form[key]) form[key] = [{}];
            if (!form[key]) {
              form[key] = [{}]
            }
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
      // numberOfPages: 0,
    },
    loading: [],
    current: null,
  }
}
