/* import filtersRaw from '~/assets/data/filters'
import lists from '~/assets/data/lists' */

/* import api from "~/server/api/github" */
import { defineStore } from "pinia"
import { isProxy, toRaw } from "vue"
import {
  Views,
  ModuleType,
  events,
  news,
  people,
  projects,
  fellowships,
  publications,
} from "@paris-ias/data"

import LIST_EVENTS from "~/graphql/queries/list/events.gql"
import LIST_PEOPLE from "~/graphql/queries/list/people.gql"
import LIST_FELLOWSHIPS from "~/graphql/queries/list/fellowships.gql"
import LIST_NEWS from "~/graphql/queries/list/news.gql"
import LIST_PUBLICATIONS from "~/graphql/queries/list/publications.gql"
import LIST_PROJECTS from "~/graphql/queries/list/projects.gql"
import SEARCH from "~/graphql/queries/list/search.gql"

interface InputParams {
  key?: any | string
  level?: string[] | number[] | number | any
  store?: any
  category?: string
  defaults?: any | null
  value?: any
}

export const useRootStore = defineStore("rootStore", {
  state: (): Record<
    string,
    boolean | number | string | ModuleType | searchResults
  > => ({
    scrolled: process.browser ? window.scrollY > 0 : false,
    loading: false,
    total: 0,
    skip: 0,
    numberOfPages: 0,
    search: "",
    results: {
      events: {},
      news: {},
      people: {},
      projects: {},
      fellowships: {},
      publications: {},
    },
    page: 1,
    events,
    news,
    people,
    projects,
    fellowships,
    publications,
  }),

  actions: {
    setLoading(value: boolean, type: string = "") {
      this.loading = value
      if (type.length) (this[type] as ModuleType).loading = value
    },
    setScrolled() {
      if (process.browser) {
        this.scrolled = window.scrollY > 0
      }
    },

    getKey({ key, level, store }: InputParams): any {
      /*       console.log("key: ", key)
      console.log("level: ", level)
      console.log("store: ", store)
      console.log("store key val: ", store?.[level[0]]) */
      const isArray = typeof level[0] === "number"
      if (level.length === 1) {
        //guard against undef keys
        if (store[level[0]] === undefined) store[level[0]] = "" // TODO make sure it works with othjer primitive types
        return isArray ? store.at(level[0]) : store[level[0]]
      }

      if (level.length > 1) {
        //guard against undef keys
        if (store[level[0]] === undefined) {
          if (isArray) {
            store[level[0]] = []
          } else {
            // if the key is not a number, it is an object (if it was a primitive, level.length would be 1)
            store[level[0]] = {}
          }
        }
        return this.getKey({
          key,
          level: level.slice(1),
          store: isArray ? store.at(level[0]) : store[level[0]],
        })
      }
    },
    updateForm({ key, value, category, level, store }: InputParams): any {
      level = level ?? [
        (this[category as string] as ModuleType)?.form?.values[key],
      ]
      store = store ?? (this[category as string] as ModuleType).form.values
      console.log(`updateForm
        key: ${key}
        value: ${value}
        category: ${category}
        level: ${level}
        store: ${Array.isArray(store) ? store.length : Object.keys(store)}`)
      if (level.length === 1) {
        //guard against undef keys
        if (store[level[0]] === undefined) store[level[0]] = "" // TODO make sure it works with othjer primitive types
        store[level[0]] = value
      }

      if (level.length > 1) {
        const isArray = typeof level[0] === "number"
        //guard against undef keys
        if (store[level[0]] === undefined) {
          if (isArray) {
            const itemValue = (this[category as string] as ModuleType).form
              .schema[key]?.default
            store[level[0]] = [itemValue]
          } else {
            // if the key is not a number, it is an object (if it was a primitive, level.length would be 1)
            store[level[0]] = {}
          }
        }
        return this.updateForm({
          key,
          value,
          level: level.slice(1),
          category,
          store: store[level[0]],
        })
      }
    },
    deleteFormItem({
      key,
      category,
      level = null,
      store = null,
    }: InputParams): any {
      level = level ?? [
        (this[category as string] as ModuleType).form.values[key],
      ]
      store = store ?? (this[category as string] as ModuleType).form.values
      console.log(`deleteFormItem
        key: ${key}
        category: ${category}
        level: ${level}`)
      // if level = 1 this is a primitive
      if (level.length === 1) {
        console.log("store: ", store.length)
        const newStore = store.filter(
          (item: any, index: any) => index === level[0],
        )
        store = newStore
        console.log("store: ", store.length)
      } else if (level.length > 1) {
        const isArray = typeof level[0] === "number"
        return this.deleteFormItem({
          key,
          level: level.slice(1),
          category,
          store: store[level[0]],
        })
      }
    },
    addFormItem({
      key,
      category,
      level = null,
      store = null,
      defaults = null,
    }: InputParams): any {
      try {
        level = level ?? [
          (this[category as string] as ModuleType).form.values[key],
        ]
        store = store ?? (this[category as string] as ModuleType).form.values
        const defaultForm = (this[category as string] as ModuleType).form
          ._defaults as string
        if (!defaults) defaults = JSON.parse(defaultForm)

        // if level = 1 this is a primitive
        if (level.length === 1) {
          const defautlValue = defaults[level[0]][0]
          store[key].push(defautlValue)
        } else if (level.length > 1) {
          const isArray = typeof level[0] === "number"
          //guard against undef keys
          if (store[level[0]] === undefined) {
            if (isArray) {
              store[level[0]] = []
            } else {
              // if the key is not a number, it is an object (if it was a primitive, level.length would be 1)
              store[level[0]] = {}
            }
          }
          return this.addFormItem({
            key,
            level: level.slice(1),
            category,
            store: store[level[0]],
            defaults: defaults[level[0]],
          })
        }
      } catch (error) {
        console.log("error: ", error)
      }
    },
    loadRouteQuery(type: string) {
      const { currentRoute } = useRouter()
      const query = currentRoute.value.query
      const filters = (this[type] as ModuleType).list.filters

      if (Object.keys(query)?.length) {
        Object.keys(query).forEach((filter) => {
          if (filter in filters) {
            filters[filter].value = filters[filter].multiple
              ? JSON.parse(query[filter] as string)
              : query[filter]
          }
        })
        /*       if (query.view) {
        ;(this[type] as ModuleType).list.view = query.view as
          | string
          | Views
          | undefined
      }
      if (query.page) {
        this.page = +query.page
      } else {
        this.page = 1
      } */

        /*      const sortObj = (this[type] as ModuleType).list.sort
      const defaultSortKey = Object.keys(sortObj).find(
        (item) => sortObj[item].default === true,
      )
      const defaultSort = [sortObj[defaultSortKey as string]]

      const sortDesc = (this[type] as ModuleType).list.sortDesc
      let sortDescItem
      sortDescItem = (sortDesc as number[] | boolean[])[0]

      if (query.sortBy) {
        ;(this[type] as ModuleType).list.sortBy = [query.sortBy] as string[]
      }
      if (typeof query.sortDesc !== "undefined") {
        sortDescItem = !!(query.sortDesc === "true")
      } else {
        sortDescItem = defaultSort[0].value[1]
      } */
      }
      console.log("query loaded")
      this.setFiltersCount(type)
    },

    // setFiltersCount(type: string) {
    //   let filtersCount = 0 as number
    //   Object.keys((this[type] as ModuleType).list.filters)
    //     // remove empty values
    //     .forEach((filter) => {
    //       /*console.log("filter: ", filter)
    //       console.log("filters[filter]?.value: ", filters[filter].value)
    //       */ /*  console.log(
    //         'typeof filters[filter]?.value !== "undefined": ',
    //         typeof filters[filter]?.value !== "undefined",
    //       ) */
    //       if (
    //         (this[type] as ModuleType).list.filters[filter]?.value?.length &&
    //         typeof (this[type] as ModuleType).list.filters[filter]?.value !==
    //           "undefined"
    //       ) {
    //         filtersCount++
    //       }
    //       return filtersCount
    //     })

    //   console.log("filtersCount: ", filtersCount)
    //   ;(this[type] as ModuleType).list.filtersCount = filtersCount
    // },

    setFiltersCount(type: string) {
      const filters = (this[type] as ModuleType)?.list?.filters ?? {}
      const count = Object.values(filters).reduce((acc, filter) => {
        const value = filter?.value
        const isEmpty =
          value === undefined ||
          value === null ||
          (Array.isArray(value) && value.length === 0) ||
          (typeof value === "string" && value.trim() === "")

        return isEmpty ? acc : acc + 1
      }, 0)
      ;(this[type] as ModuleType).list.filtersCount = count
    },
    setBlankFilterLoad(type: string) {
      ;(this[type] as ModuleType).loading = false
    },
    setDefaults() {
      // lang
      const lang = localStorage.getItem("lang")
      /*    if(lang)i18n.global.locale = lang; */
      // dark mode

      // event
      // people
      // news
      // project
      // fellowships
    },

    updateRouteQuery(type: string) {
      const router = useRouter()

      const routeQuery: Record<string, string> = {
        ...(this.search ? { search: this.search } : {}),
        ...(this.page > 1 ? { page: this.page.toString() } : {}),
        ...Object.entries(this[type].list.filters).reduce(
          (acc, [key, filter]) => {
            const value = filter?.value

            const isEmpty =
              value === undefined ||
              value === null ||
              (Array.isArray(value) && value.length === 0) ||
              (typeof value === "string" && value.trim() === "")

            if (isEmpty) return acc

            return {
              ...acc,
              [key]: Array.isArray(value) ? JSON.stringify(value) : value,
            }
          },
          {},
        ),
      }

      router.replace({ query: routeQuery })
    },
    resetState() {
      this.search = ""
      this.page = 1
      this.scrolled = false
      this.loading = false
      this.total = 0
      this.skip = 0
      this.numberOfPages = 0

      const modules = {
        events,
        news,
        people,
        projects,
        fellowships,
        publications,
      }

      for (const [type, defaultModule] of Object.entries(modules)) {
        this[type].list.filters = JSON.parse(
          JSON.stringify(defaultModule.list.filters),
        )

        const defaultViewKey = Object.keys(defaultModule.list.views).find(
          (v) => defaultModule.list.views[v].default === true,
        )
        this[type].list.view = defaultModule.list.views[defaultViewKey]

        const defaultSortKey = Object.keys(defaultModule.list.sort).find(
          (s) => defaultModule.list.sort[s].default === true,
        )
        const defaultSort = defaultModule.list.sort[defaultSortKey]
        this[type].list.sortBy = [defaultSort.value[0]]
        this[type].list.sortDesc = [defaultSort.value[1]]
        this.setFiltersCount(type)
      }
    },
    updateSort({ value, type }: { value: number[] | string[]; type: string }) {
      ;(this[type] as ModuleType).list.sortBy = [value[0]] as string[]
      ;(this[type] as ModuleType).list.sortDesc = [value[1]] as number[]
      this.page = 1
      this.updateLocalStorage(type + "_sort", value.join("_"))
      this.update(type)
    },
    updateView({ value, type }: { value: string; type: string }) {
      ;(this[type] as ModuleType).list.view = {
        ...((this[type] as any).list.views[value] as Views),
        name: value,
      }
      this.updateLocalStorage(type + "_view", value)
      this.update(type)
    },
    updateLocalStorage(key: string, value: string) {
      const local = JSON.parse(localStorage.getItem("PARIS_IAS") as any) || {}
      local[key] = value
      localStorage.setItem("PARIS_IAS", JSON.stringify(local))
    },
    updateFilter(key: string, val: any, type: string) {
      console.log("update filter: ", { key, val, type })
      ;(this[type] as ModuleType).list.filters[key].value = val

      this.setFiltersCount(type)

      const router = useRouter()

      // Update the route query with the new filter
      console.log(
        "router.currentRoute.value.query: ",
        router.currentRoute.value.query,
      )
      const query = {
        ...router.currentRoute.value.query,
        [key]: Array.isArray(val) ? JSON.stringify(val) : val,
      }
      router.push({ query })

      this.page = 1
      this.update(type)
    },
    updateItemsPerPage({ value, type }: { value: number; type: string }) {
      this.page = 1
      ;(this[type] as ModuleType).list.itemsPerPage = value

      this.update(type)
    },
    updatePage({ page, type }: { page: number; type: string }) {
      this.page = page
      const router = useRouter()

      const query = {
        ...router.currentRoute.value.query,
        page,
      }
      router.push({ query })
      this.update(type)
    },
    async updateSearch({
      type = "all",
      search = "",
      lang = "en",
    }: {
      type: string
      search: string
      lang: string
    }) {
      this.search = search
      console.log("updateSearch: ", search + " " + lang)
      this.setLoading(true)

      await this.update(type, lang)
    },

    async update(type: string, lang: string = "en") {
      this.setLoading(true)
      if (type !== "all") {
        ;(this[type] as ModuleType).loading = true
      }
      const router = useRouter()

      // fetch the item categories

      const itemsPerPage =
        type === "all"
          ? 3
          : ((this[type] as ModuleType).list?.itemsPerPage as number)
      const filters: Record<string, any> = {}

      if (type !== "all") {
        for (const filter in (this[type] as ModuleType).list.filters) {
          const filterValue = (this[type] as ModuleType).list.filters[filter]
            ?.value

          // Prune empty values
          if (typeof filterValue !== "undefined" && filterValue?.length) {
            filters[filter] = filterValue
          }
        }
      }

      const args = JSON.parse(
        JSON.stringify({
          options: {
            // skip
            skip: +this.page === 1 ? 0 : (+this.page - 1) * itemsPerPage,
            // limit
            limit: itemsPerPage,
            // sort, array of keys and array of directions - to have x tie breakers if necessary
            sortBy:
              type === "all"
                ? "searchScore"
                : (this[type] as ModuleType).list.sortBy,
            sortDesc:
              type === "all"
                ? -1
                : (this[type] as ModuleType).list.sortDesc > 0
                  ? true
                  : false,
            // search (if set)
            ...((this.search as string)?.length &&
              type !== "all" && { search: this.search }),
            // add the store module filters
            filters,
          },
          ...((this.search as string)?.length &&
            type === "all" && { search: this.search }),
          appId: "iea",
          lang,
        }),
      )
      args.options.filters = JSON.stringify(args.options.filters)
      let result: any = {}
      console.log("args: ", args)

      console.log(`Fetching ${type}`)
      const { data, error } = await useAsyncQuery(
        [
          SEARCH,
          LIST_EVENTS,
          LIST_PEOPLE,
          LIST_FELLOWSHIPS,
          LIST_NEWS,
          LIST_PUBLICATIONS,
          LIST_PROJECTS,
        ][
          [
            "all",
            "events",
            "people",
            "fellowships",
            "news",
            "publications",
            "projects",
          ].indexOf(type)
        ],
        args,
      )
      console.log("data: ", data)
      if (error.value) console.log(error.value)
      const key =
        type === "all"
          ? "search"
          : "list" + type.charAt(0).toUpperCase() + type.slice(1)
      console.log("key: ", key)

      console.log("result: ", result)

      if (type === "all") {
        this.results = data?.value?.[key]
        console.log("this.results: ", this.results)
      } else {
        const items = data?.value?.[key]?.items ?? []
        this.total = data?.value?.[key]?.total
        result = {
          ...data?.value?.[key],
          items: items.map(({ id, ...rest }) => ({
            ...rest,
            _path: `/${id}`,
          })),
        }
        ;(this[type] as ModuleType).list.items = result["items"]
        const viewsObj = (this[type] as ModuleType).list.views as Record<
          string,
          Views
        >
        const defaultViewsKey = Object.keys(viewsObj).find(
          (item) => viewsObj[item].default === true,
        )
        const defaultView = viewsObj[defaultViewsKey as string]

        const lastPage = Math.ceil(result.total / itemsPerPage)
        /*         this.updateRouteQuery(type) */
        this.setFiltersCount(type)
        this.setBlankFilterLoad(type)
        /*       console.log("type2: ", type) */
        this.numberOfPages = lastPage
        ;(this[type] as ModuleType).loading = false
      }
      console.log("this.total: ", this.total)

      this.setLoading(false)
      return true
    },
  },
  getters: {
    hasActiveFilters: (state) => {
      return (type: string): boolean => {
        const filters = (state[type] as ModuleType)?.list?.filters ?? {}
        return Object.values(filters).some((f) => {
          const value = f?.value
          return Array.isArray(value)
            ? value.length > 0
            : typeof value === "string"
              ? value.trim() !== ""
              : !!value
        })
      }
    },
  },
})
