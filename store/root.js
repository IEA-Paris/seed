/* import filtersRaw from '~/assets/data/filters'
import lists from '~/assets/data/lists' */
import createModule from "~/store/module"
/* import api from "~/server/api/github" */
import config from "~/static.config"
import fs from "fs"

const modulesState = {}
const types = []
console.log("STARTING THE STORE")
const initStore = async () => {
  if (process.server) {
    console.log("opening directory")
    const dir = fs.opendirSync("./data")
    let file
    while ((file = dir.readSync()) !== null) {
      types.push(file.name.substring(0, file.name.length - 3))
    }
    dir.closeSync()
    console.log("types: ", types)
    await Promise.all(
      ["people", "fellowship", "project", "event"].map(async (type) => {
        console.log("type: ", type)
        modulesState[type] = await createModule(type)
        // console.log("module created for ", modulesState[type]);
      })
    )
  }
  /* const githubApi = new api(config.modules.github) */
}
await initStore()
console.log("FINISH BUILD", modulesState)
export const useRootStore = defineStore("rootStore", {
  state: () => ({
    scrolled: process.browser ? window.scrollY > 0 : false,
    loading: true,
    resetFilters: false,
    ...modulesState,
  }),

  actions: {
    save(type) {
      try {
        $
        // save the related form from the store to the target
        if (this[type].source === "md") {
          //@eliot save on github
          githubApi.save(this[type].form)
        }
        if (this[type].source === "gql") {
          // call appsync mutation
        }
        return true
      } catch (error) {
        console.log(`error while saving ${type}`, error)
      }
    },
    setLogo(value) {
      this.logo = value
    },
    setLoading(value) {
      this.loading = value
    },
    setScrolled() {
      if (process.browser) {
        this.scrolled = window.scrollY > 0
      }
    },

    getKey({ key, level, store }) {
      console.log("key: ", key)
      console.log("level: ", level)
      console.log("store: ", store)
      console.log("store key val: ", store?.[level[0]])
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
    updateForm({ key, value, category, level = null, store = null }) {
      level = level ?? [this[category].form[key]]
      store = store ?? this[category].form
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
            store[level[0]] = [this[category].schema[key]?.default]
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
    deleteFormItem({ key, category, level = null, store = null }) {
      level = level ?? [this[category].form[key]]
      store = store ?? this[category].form
      console.log(`deleteFormItem 
      key: ${key}
      category: ${category} 
      level: ${level}`)
      // if level = 1 this is a primitive
      if (level.length === 1) {
        console.log("store: ", store.length)
        const newStore = store.filter((item, index) => index === level[0])
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
    }) {
      try {
        level = level ?? [this[category].form[key]]
        store = store ?? this[category].form
        if (!defaults) defaults = JSON.parse(this[category]._defaults)
        console.log("defaults: ", defaults)
        console.log(`addFormItem 
        key: ${key}
        category: ${category} 
        level: ${level}`)
        // if level = 1 this is a primitive
        if (level.length === 1) {
          const defautlValue = defaults[level[0]][0]
          console.log("defautlValue: ", defautlValue)
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
    loadRouteQuery(type) {
      const { currentRoute } = useRouter()
      const query = currentRoute.value.query

      if (query.search) {
        this[type].search = query.search
      }
      if (query.filters) {
        const filters = JSON.parse(query.filters)
        Object.keys(filters).forEach((filter) => {
          this[type].filters[filter] = filters[filter]
        })
      }

      if (query.view) {
        this[type].view = query.view
      }
      if (query.page) {
        this[type].page = +query.page
      } else {
        this[type].page = 1
      }

      const defaultSort = [
        this[type].sort[
          Object.keys(this[type].sort).find(
            (item) => this[type].sort[item].default === true
          )
        ],
      ]
      if (query.sortBy) {
        this[type].sortBy = [query.sortBy]
      }

      if (typeof query.sortDesc !== "undefined") {
        this[type].sortDesc = !!(query.sortDesc === "true")
      } else {
        this[type].sortDesc = !!(defaultSort[0].value[1] === "desc")
      }
    },
    setSearch({ search, type }) {
      this[type].search = search
    },
    setItems({ type, ...values }) {
      this[type].items = values.items
      this[type].total = values.total
      this[type].numberOfPages = values.numberOfPages
    },
    setItemsPerPage({ value, type }) {
      this[type].itemsPerPage = value
    },
    setPage({ page, type }) {
      this[type].page = page
    },
    setFilters({ filters, type }) {
      if (filters[Object.keys(filters)[0]].length)
        this[type].loading.push(Object.keys(filters)[0])

      this[type].filters[Object.keys(filters)[0]] =
        filters[Object.keys(filters)[0]]
    },
    setSort({ value, type }) {
      this[type].sortBy = [value[0]]
      this[type].sortDesc = value[1] === "-1"
    },
    setView({ value, type }) {
      this[type].view = value
    },
    setFiltersCount(type) {
      const filters = this[type].filters
      const filtersCount = Object.keys(filters)
        // remove empty values
        .filter(
          (filter) =>
            (typeof filters[filter] === "boolean" &&
              filters[filter] !== null &&
              filters[filter] !== undefined) ||
            (Array.isArray(filters[filter]) && filters[filter].length) ||
            (typeof filters[filter] === "object" &&
              Object.keys(filters[filter]).length)
        ).length
      this[type].filtersCount = filtersCount
    },
    setBlankState(type) {
      this.resetFilters = true

      const defaultView =
        this[type].views[
          Object.keys(this[type].views).find(
            (item) => this[type].views[item].default === true
          )
        ]
      const defaultSort = [
        this[type].sort[
          Object.keys(this[type].sort).find(
            (item) => this[type].sort[item].default === true
          )
        ],
      ]
      // TODO make dynamic based on an ~/assets located file
      this[type].filters = {
        years: [],
        issue: [],
        tags: [],
        language: [],
        thematic: [],
        discipline: [],
        type: [],
      }
      this[type].search = ""
      this[type].view = defaultView.value
      this[type].sortBy = defaultSort[0].value[0]
      this[type].sortDesc = defaultSort[0].value[1] === "desc"
      this[type].resetFilters = false
    },
    setBlankFilterLoad(type) {
      this[type].loading = []
    },
    setStyle(style) {
      this.articles.style = style
    },

    resetState(type) {
      this.setBlankState(type)
      this.setPage({ page: 1, type })
      this.update(type)
    },
    updateSort({ value, type }) {
      this.setSort({ value, type })
      this.setPage({ page: 1, type })
      this.update(type)
    },
    updateView({ value, type }) {
      this.setView({ value, type })
      this.update(type)
    },
    updateFilters({ filters, type }) {
      this.setFilters({ filters, type })
      this.setPage({ page: 1, type })
      this.update(type)
    },
    updateItemsPerPage({ value, type }) {
      this.setPage({ page: 1, type })
      this.setItemsPerPage({ value, type })
      this.update(type)
    },
    updatePage({ page, type }) {
      this.setPage({ page, type })
      this.update(type)
    },
    updateSearch({ search, type }) {
      this.setPage({ page: 1, type })
      this.setSearch({ search, type })
      this.update(type)
    },
    async update(type, lang, source = "md") {
      console.log("type: ", type + "/" + lang)
      const target = type + "/" + lang + "/"
      this.setLoading(true)

      const router = useRouter()
      const filters = this[type]?.filters || {}
      const pipeline = {
        // default filters
        ...filters,
      }
      const queryFilters = {}

      pipeline.$or = []

      for (const filter in filters) {
        // remove empty values
        if (
          !(
            (typeof filters[filter] === "boolean" &&
              filters[filter] !== null &&
              filters[filter] !== undefined) ||
            (Array.isArray(filters[filter]) && filters[filter].length) ||
            (typeof filters[filter] === "object" &&
              Object.keys(filters[filter]).length)
          )
        ) {
          delete filters[filter]
          continue
        }
        // update route query
        const val = filters[filter]
        queryFilters[filter] = val

        // convert filters into mongo-like loki query & push in the pipeline
        if (
          filters[filter] ||
          (Array.isArray(filters[filter]) && filters[filter].length)
        ) {
          switch (filter) {
            case "tag":
            case "thematic":
            case "discipline":
            case "type":
              pipeline[filter] = { $containsAny: val }
              break
            case "language":
              pipeline[filter] = { $containsAny: val }
              break
            case "issue":
              pipeline.issue =
                val.length > 1
                  ? {
                      $in: val.map((item) => "content/issues/" + item + ".md"),
                    }
                  : "content/issues/" + val[0] + ".md"
              break
            case "years":
              const yearsToInt = val.map((i) => +i)
              if (["articles", "media"].includes(type)) {
                pipeline[filter] = { $in: yearsToInt }
              } else {
                pipeline[filter] = { $containsAny: yearsToInt }
              }
              break
            default:
              pipeline[filter] = Array.isArray(val) ? val[0] : val
              break
          }
        }
      }

      if (!pipeline.$or.length) {
        delete pipeline.$or
      } else {
        pipeline.$or = pipeline.$or.flat()
      }
      console.log("pipeline: ", pipeline)

      /*   const count = await useAsyncData("count", () =>
        queryContent(target).where(pipeline).only("[]").find()
      )
      console.log("count: ", count.data.value) */
      const count = [{}]
      const totalItems = count.length
      console.log("totalItems: ", totalItems)

      const lastPage = Math.ceil(totalItems / this[type].itemsPerPage)

      const lastPageCount = totalItems % (this[type]?.itemsPerPage || 1)

      const itemsPerPage = this[type]?.itemsPerPage || 1

      const skipNumber = () => {
        if (+this[type].page === 1) {
          return 0
        }
        if (+this[type].page === lastPage) {
          if (lastPageCount === 0) {
            return totalItems - itemsPerPage
          }
          return totalItems - lastPageCount
        }
        return (+this[type].page - 1) * itemsPerPage
      }

      const sortArray =
        this[type].view === "issues"
          ? [
              "issueIndex",
              this[type].sortDesc ? 1 : -1,
              "date",
              this[type].sortDesc ? 1 : -1,
            ]
          : [this[type].sortBy[0], this[type].sortDesc ? -1 : 1]
      console.log("type1: ", type)
      console.log("pipeline: ", pipeline)
      console.log("queryContent: ", queryContent)
      console.log("target: ", target)
      console.log("{ [sortArray[0]]: sortArray[1] }: ", {
        [sortArray[0]]: sortArray[1],
      })
      console.log("skipNumber(): ", skipNumber())
      console.log("itemsPerPage: ", itemsPerPage)

      const items = await queryContent(target)
        .where(pipeline)
        .sort({ [sortArray[0]]: sortArray[1] })
        /*  .sort({ [sortArray[2]]: sortArray[3] }) */
        .skip(skipNumber())
        .limit(itemsPerPage)
        .find()

      console.log("done", items.length)
      const defaultView =
        this[type].views[
          Object.keys(this[type].views).find(
            (item) => this[type].views[item].default === true
          )
        ]

      const defaultSort =
        this[type].sort[
          Object.keys(this[type].sort).find(
            (item) => this[type].sort[item]?.default === true
          )
        ]
      console.log("type b4 route query: ", type)

      // update route
      const query = {
        ...(this[type].search &&
          typeof this[type].search !== "undefined" && {
            search: this[type].search,
          }),
        ...(this[type].page > 1 && {
          page: this[type].page.toString(),
        }),
        ...(this[type].sortBy?.length &&
          this[type].sortBy[0] !== defaultSort.value[0] && {
            sortBy: this[type].sortBy[0],
          }),
        ...(typeof this[type].sortDesc !== "undefined" &&
          (this[type].sortDesc ? "desc" : "asc") !== defaultSort.value[1] && {
            sortDesc: !!this[type].sortDesc,
          }),
        ...(this[type].view &&
          this[type].view !== defaultView.name && {
            view: this[type].view,
          }),
        ...(Object.keys(filters)?.length && {
          filters: JSON.stringify(queryFilters),
        }),
      }
      const sortObject = (obj) => Object.fromEntries(Object.entries(obj).sort())
      console.log("type b4 sort obj: ", type)

      Object.keys(query).forEach((key) =>
        query[key] === undefined
          ? delete query[key]
          : // convert boolean to string
            typeof query[key] === "boolean"
            ? query[key] === query[key].toString()
            : {}
      )

      /*     if (
        JSON.stringify(router.currentRoute.value.query) !==
        JSON.stringify(sortObject(query))
      ) {
        // TODO fix these damn false positives (lead: see if pre-resolving the route before replacing it is possible/relevant or come up with another way to compare query & store)
        router.replace({
          query,
        })
      }
 */
      // fetch the item categories

      this.setFiltersCount(type)
      this.setBlankFilterLoad(type)
      console.log("type2: ", type)
      this.setItems({
        items,
        total: totalItems,
        numberOfPages: lastPage,
        type,
      })
      this.setLoading(false)
    },
  },
})
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
/*     const isDesc = this[type].sortDesc[0] || defaultSort.value[1]
      const sorter = this[type].sortBy[0] || defaultSort.value[0]
      
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
