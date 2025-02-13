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
  project,
  fellowship,
  publications,
} from "@paris-ias/data"

import LIST_EVENTS from "~/graphql/queries/list/events.gql"
import LIST_PEOPLE from "~/graphql/queries/list/people.gql"
import LIST_FELLOWSHIPS from "~/graphql/queries/list/fellowships.gql"
import LIST_NEWS from "~/graphql/queries/list/news.gql"
import LIST_PUBLICATIONS from "~/graphql/queries/list/publications.gql"
import LIST_PROJECTS from "~/graphql/queries/list/projects.gql"

interface InputParams {
  key?: any | string
  level?: string[] | number[] | number | any
  store?: any
  category?: string
  defaults?: any | null
  value?: any
}

export const useRootStore = defineStore("rootStore", {
  state: (): Record<string, boolean | number | string | ModuleType> => ({
    scrolled: process.browser ? window.scrollY > 0 : false,
    loading: true,
    resetFilters: false,
    total: 0,
    skip: 0,
    numberOfPages: 0,
    search: "",
    page: 1,
    events,
    news,
    people,
    project,
    fellowship,
    publications,
  }),

  actions: {
    save(type: string): boolean | undefined {
      try {
        // save the related form from the store to the target
        if ((this[type] as ModuleType).source === "md") {
          //@eliot save on github
          // githubApi.save(this[type].form)
        }
        if ((this[type] as ModuleType).source === "gql") {
          // call appsync mutation
        }
        return true
      } catch (error) {
        console.log(`error while saving ${type}`, error)
      }
    },
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
      if (Object.keys(query)?.length) {
        Object.keys(query).forEach((filter) => {
          if (
            Object.keys((this[type] as ModuleType).list.filters).includes(
              filter,
            )
          )
            (this[type] as ModuleType).list.filters[filter].value = (
              this[type] as ModuleType
            ).list.filters[filter].multiple
              ? JSON.parse(query[filter] as string)
              : query[filter]
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
    },

    setFiltersCount(type: string) {
      let filtersCount = 0 as number
      Object.keys((this[type] as ModuleType).list.filters)
        // remove empty values
        .forEach((filter) => {
          /*console.log("filter: ", filter)  
          console.log("filters[filter]?.value: ", filters[filter].value)
          */ /*  console.log(
            'typeof filters[filter]?.value !== "undefined": ',
            typeof filters[filter]?.value !== "undefined",
          ) */
          if (
            (this[type] as ModuleType).list.filters[filter]?.value?.length &&
            typeof (this[type] as ModuleType).list.filters[filter]?.value !==
              "undefined"
          ) {
            filtersCount++
          }
          return filtersCount
        })

      console.log("filtersCount: ", filtersCount)
      ;(this[type] as ModuleType).list.filtersCount = filtersCount
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
    resetState(type: string) {
      this.resetFilters = true

      const viewsObj = (this[type] as ModuleType).list.views as Record<
        string,
        Views
      >
      const defaultViewsKey = Object.keys(viewsObj).find(
        (item) => viewsObj[item].default === true,
      )
      const defaultView = viewsObj[defaultViewsKey as string]

      const sortObj = (this[type] as ModuleType).list.sort
      const defaultSortKey = Object.keys(sortObj).find(
        (item) => sortObj[item].default === true,
      )
      const defaultSort = sortObj[defaultSortKey as string]
      console.log("defaultSort root: ", defaultSort)

      // TODO make dynamic based on an ~/assets located file
      ;(this[type] as ModuleType).list.filters = {
        years: [],
        issue: [],
        tags: [],
        language: [],
        thematic: [],
        discipline: [],
        type: [],
      }
      this.search = ""
      ;(this[type] as ModuleType).list.view = defaultView.name
      ;(this[type] as ModuleType).list.sortBy = [defaultSort.value[0]]
      ;(this[type] as ModuleType).list.sortDesc = [defaultSort.value[1]]
      ;(this[type] as ModuleType).resetFilters = false
      this.page = 1

      this.update(type)
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
    updateSearch({ search, type }: { search: any; type: string }) {
      console.log("updateSearch: ", { search, type })
      this.page = 1
      this.search = search
      this.update(type)
    },
    async update(type: string, lang: string = "en") {
      this.setLoading(true)
      ;(this[type] as ModuleType).loading = true
      const router = useRouter()

      const queryFilters: any = {}

      const itemsPerPageValue = (this[type] as ModuleType).list
        ?.itemsPerPage as number
      // fetch the item categories

      const itemsPerPage = (this[type] as ModuleType)?.list?.itemsPerPage || 1
      const filters = Object.keys((this[type] as ModuleType).list.filters)
        // prune empty values
        .filter(
          (filter) =>
            typeof (this[type] as ModuleType).list.filters[filter]?.value !==
            "undefined",
        )
        // assign set values to their related keys
        .map((filter) => {
          return {
            [filter]: (this[type] as ModuleType).list.filters[filter].value,
          }
        })

      const args = JSON.parse(
        JSON.stringify({
          options: {
            // skip
            skip: +this.page === 1 ? 0 : (+this.page - 1) * itemsPerPage,
            // limit
            limit: itemsPerPage,
            // sort, array of keys and array of directions - to have x tie breakers if necessary
            sortBy: (this[type] as ModuleType).list.sortBy,
            sortDesc: (this[type] as ModuleType).list.sortDesc,
            // search (if set)
            ...((this.search as string)?.length && { search: this.search }),
            // add the store module filters
            filters,
          },
          appId: "iea",
          lang: "en",
        }),
      )
      console.log("args: ", args)
      let result: any = {}
      switch (type) {
        case "events":
          console.log("list events")
          const {
            data: { value: events },
          } = await useAsyncQuery(LIST_EVENTS, args)
          result = {
            ...events?.listEvents,
            items: events?.listEvents["items"].map((e: any) => ({
              ...e,
              _path: "/" + e["id"],
            })) as any,
          }
          console.log("result: ", result)
          break
        case "people":
          console.log("list people")
          const {
            data: { value: people },
          } = await useAsyncQuery(LIST_PEOPLE, args)
          result = {
            ...people?.listPeople,
            items: people?.listPeople["items"].map((e: any) => ({
              ...e,
              _path: "/" + e["id"],
              title: e["firstname"] + " " + e["lastname"],
              relatedProjects: [],
              relatedEvents: [],
              relatedNews: [],
              description: e["biography"],
            })) as any,
          }
          break
        case "fellowships":
          console.log("list fellowships")
          const {
            data: { value: fellowships },
          } = await useAsyncQuery(LIST_FELLOWSHIPS, args)
          result = {
            ...fellowships?.listFellowships,
            items: fellowships?.listFellowships["items"].map((e: any) => ({
              ...e,
              _path: "/" + e["id"],
            })) as any,
          }
          break
        case "news":
          console.log("list news")
          const {
            data: { value: news },
          } = await useAsyncQuery(LIST_NEWS, args)
          result = {
            ...news?.listNews,
            items: news?.listNews["items"].map((e: any) => ({
              ...e,
              _path: "/" + e["id"],
            })) as any,
          }
          break
        case "publications":
          console.log("list publications")
          const {
            data: { value: publications },
          } = await useAsyncQuery(LIST_PUBLICATIONS, args)
          result = {
            ...publications?.listPublications,
            items: publications?.listPublications["items"].map((e: any) => ({
              ...e,
              _path: "/" + e["id"],
            })) as any,
          }
          break
        case "project":
          console.log("list projects")
          const {
            data: { value: projects },
          } = await useAsyncQuery(LIST_PROJECTS, args)
          result = {
            ...projects?.listProjects,
            items: projects?.listProjects["items"].map((e: any) => ({
              ...e,
              _path: "/" + e["id"],
            })) as any,
          }
          break
      }
      console.log("result: ", result)
      ;(this[type] as ModuleType).list.items = result["items"]
      this.total = result["total"]

      const viewsObj = (this[type] as ModuleType).list.views as Record<
        string,
        Views
      >
      const defaultViewsKey = Object.keys(viewsObj).find(
        (item) => viewsObj[item].default === true,
      )
      const defaultView = viewsObj[defaultViewsKey as string]

      console.log("query done for type ", type)
      // update route
      const query: Record<string, any> = {
        ...(this.search &&
          typeof this.search !== "undefined" && {
            search: this.search,
          }),
        ...((this.page as number) > 1 && {
          page: this.page.toString(),
        }),
        /*    ...(((this[type] as ModuleType).list.sortBy as string[]).length &&
          sortByItem !== defaultSort.value[0] && {
            sortBy: sortByItem,
          }),
        ...(typeof sortDescItem !== "undefined" &&
          sortDescItem !== defaultSort.value[1] && {
            sortDesc: !!sortDescItem,
          }), */
        ...((this[type] as ModuleType).list.view &&
          (this[type] as ModuleType).list.view !== defaultView.name && {
            view: (this[type] as ModuleType).list.view,
          }),
        ...(Object.keys(filters)?.length && {
          filters: JSON.stringify(queryFilters),
        }),
      }
      const sortObject = (obj: any) =>
        Object.fromEntries(Object.entries(obj).sort())
      /*       console.log("type b4 sort obj: ", type)
      console.log("query: ", query) */

      Object.keys(query).forEach((key) =>
        query[key] === undefined
          ? delete query[key]
          : // convert boolean to string
            typeof query[key] === "boolean"
            ? query[key] === (query[key] as any).toString()
            : {},
      )

      if (
        JSON.stringify(router.currentRoute.value.query) !==
        JSON.stringify(sortObject(query))
      ) {
        // TODO fix these damn false positives (lead: see if pre-resolving the route before replacing it is possible/relevant or come up with another way to compare query & store)
        /*         router.replace({
          query,
        }) */
      }

      const lastPage = Math.ceil(result.total / itemsPerPageValue)
      this.setFiltersCount(type)
      this.setBlankFilterLoad(type)
      /*       console.log("type2: ", type) */
      this.numberOfPages = lastPage
      this.setLoading(false)
      ;(this[type] as ModuleType).loading = false
      return true
    },
  },
})

// -------------------------------------------------------------------------------
// fetch the item categories
/*    
           if (
        process.client &&
        window.$nuxt.$root.$loading &&
        process.env.NODE_ENV === 'production'
      ) {
        // TODO wheck and find out why the object below is not available in some cases when deployed
        /*  window.$nuxt.$root.$loading.stop() 
      }
      if (['articles', 'media'].includes(type)) {
        items = await Promise.all(
          await items.map((item) => {
            if (item.issue && item.issue.length) {
              /*           item.issue = await this.$content(
                item.issue.split('/').slice(1).join('/').split('.')[0] // TODO fix (cmon)
              )
                .only(['title', 'color'])
                .fetch() 
            }
            return item
          })
        )
      } */
/*     const isDesc = this[type].list.sortDesc[0] || defaultSort.value[1]
      const sorter = this[type].list.sortBy[0] || defaultSort.value[0]
      
      items = items.sort(
        (a, b) =>
          (isDesc ? a[sorter] : b[sorter]) - (isDesc ? b[sorter] : a[sorter])
      ) */
/* HIGHLIGHT MECHANISM (disabled until reassessment of its usefulness & relevance
      //TODO deal with that ) 
      // on mobile or list view, highlight slots are the first ones
      if (
        window.$nuxt.$root.$vuetify.breakpoint.mobile ||
        ['list', 'text'].includes(this[type].view)
      ) {
        items = items.sort((a, b) => b.highlight - a.highlight)
        
        this.setFiltersCount(        this.setItems({
          items,
          total: totalItems,
          numberOfPages: lastPage,
        })
      } else {
        // on md highlight slots are on a 1/5/6 pattern
        const availableSlots = this[type].itemsPerPage / 3
  
        const highlightedItems = items.filter((item) => item.highlight)
  
        const slotedHighlightedItems = highlightedItems.slice(0, availableSlots)
  
        const regularItems = [
          ...highlightedItems.slice(availableSlots),
          ...items.filter((item) => !item.highlight),
        ]
  
        const sortedItems = []
        slotedHighlightedItems.forEach((element, index) => {
          sortedItems.push(element)
          sortedItems.push(...regularItems.splice(index * 2, 2))
        })
        sortedItems.push(...regularItems)
        this.setFiltersCount(        this.setItems({
          items: sortedItems,
          total: totalItems,
          numberOfPages: lastPage,
        })
      } */
