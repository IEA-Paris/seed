/* import filtersRaw from '~/assets/data/filters'
import lists from '~/assets/data/lists' */

/* import api from "~/server/api/github" */
import { defineStore } from "pinia"
      

// import listEvents from '~/graphql/queries/events';

import {
  Views,
  ModuleType,
  events,
  news,
  people,
  project,
  fellowship,
  publications
} from "@paris-ias/data"

interface InputParams {
  key?: any | string
  level?: string[] | number[] | number | any
  store?: any
  category?: string
  defaults?: any | null
  value?: any
}


const LIST_PEOPLE_QUERY = gql`
  query listPeople($filters: ListPeopleInput = {}, $appId: ID = "apex") {
    listPeople(appId: $appId, filters: $filters) {
      total
      items {
        id
        firstname
        lastname
        image
        socials {
          website
          wikipedia
          orcid
          linkedin
          twitter
          instagram
          scholar
          researchgate
          mendeley
          idRef
        }
        biography
      }
    }
  }
`;

const LIST_EVENTS_QUERY = gql`
  query listEvents($filters: ListEventsInput = {}, $appId: ID = "apex") {
    listEvents(appId: $appId, filters: $filters) {
      total
      items {
        appId
        availableSlots
        bookingState
        category
        delay
        description
        disciplines {
          name
        }
        discussants {
          firstname
          lastname
        }
        id
        image
        name
        place {
          address
          id
          name
          url
        }
        eventSlots {
          email
          firstname
          institution
          lang
          lastname
        }
        start
        state
        type
        url
        totalSlots
      }
    }
  }
`;

export async function fetchEvents(filters: Object) {
  const variables = { 
    filters, 
    "appId": "iea"
  };
  const { data: { value: events} } = await useAsyncQuery(LIST_EVENTS_QUERY, variables);

  console.log('EVENTS: ', events);

  return events;
}

export async function fetchPeople(filters: Object) {
  const variables = { 
    filters,
    "appId": "iea"
  };
  const { data: { value: people} } = await useAsyncQuery(LIST_PEOPLE_QUERY, variables);

  console.log('PEOPLE: ', people);

  return people;
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
    publications
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
      if (query?.length) {
        const filters = JSON.parse(query as any)
        Object.keys(filters).forEach((filter) => {
          if (
            Object.keys((this[type] as ModuleType).list.filters).includes(
              filter,
            )
          )
            (this[type] as ModuleType).list.filters[filter].value =
              filters[filter]
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
    },

    setFiltersCount(type: string) {
      let filtersCount = 0 as number
      Object.keys((this[type] as ModuleType).list.filters)
        // remove empty values
        .forEach((filter) => {
          console.log("filter: ", filter) /* 
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

    // TODO REMOVE !!
    (this[type] as ModuleType).source = "gql";
    // -------------------

      // console.log('========== calling graphql query');
      

      // console.log('graphql data: ', data);

      const target = type + "/" + lang + "/"
      this.setLoading(true)
      ;(this[type] as ModuleType).loading = true
      const router = useRouter()
      const filters = (this[type] as ModuleType)?.list?.filters || {}
      const pipeline = {
        // default filters
        /* ...filters, */
      } as any
      const queryFilters: any = {}

      pipeline.$or = []
      // TODO maybe remove
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
        /* if (
          filters[filter] ||
          (Array.isArray(filters[filter]) && (filters[filter] as any).length)
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
        }*/
      }

      if (!pipeline.$or.length) {
        delete pipeline.$or
      } else {
        pipeline.$or = pipeline.$or.flat()
      }
      /*  console.log("pipeline: ", pipeline)
       */

      let items;
      let totalItems: number = 0;

      const itemsPerPageValue = (this[type] as ModuleType).list
        ?.itemsPerPage as number

      if ((this[type] as ModuleType).source === "gql") {

        const gqlFilters = {
          options: {
            limit: itemsPerPageValue,
            skip: (this.page as number - 1) * itemsPerPageValue,
            sortDesc: [true], // TODO: why is it an array ?
            sortBy: [],
            search: this.search
          }
        };

        switch (type) {
          case 'events':
            const events = (await fetchEvents(gqlFilters) as any)['listEvents'];
            items = events['items']
              .map((e: any) => ({ ...e, _path: '/' + e['id']}));
            totalItems = events['total']
            break;
          case 'people':
            const people = (await fetchPeople(gqlFilters) as any)['listPeople'];
            items = people['items']
              .map((e: any) => ({
                ...e,
                _path: '/' + e['id'],
                title: e['firstname'] + ' ' + e['lastname'],
                relatedProjects: [],
                relatedEvents: [],
                relatedNews: [],
                description: e['biography'],
              }));
            totalItems = people['total']
            break;
        }
      } else {

        const count = await queryContent(target).where(pipeline).count();
        totalItems = count;
        /*   console.log("totalItems: ", totalItems) */
      }


      const lastPage = Math.ceil(totalItems / itemsPerPageValue)

      const lastPageCount =
        totalItems % ((this[type] as ModuleType)?.list?.itemsPerPage || 1)

      const itemsPerPage = (this[type] as ModuleType)?.list?.itemsPerPage || 1

      const skipNumber = () => {
        if (+this.page === 1) {
          return 0
        }
        if (+this.page === lastPage) {
          if (lastPageCount === 0) {
            return totalItems - itemsPerPage
          }
          return totalItems - lastPageCount
        }
        return (+this.page - 1) * itemsPerPage
      }

      const sortBy = (this[type] as ModuleType).list.sortBy
      console.log("sortBy: ", sortBy)
      const sortByItem = (sortBy as string[])[0]

      const sortDesc = (this[type] as ModuleType).list.sortDesc
      const sortDescItem = (sortDesc as number[])[0]
      const sortArray = [sortByItem, sortDescItem]
      /*       console.log("type1: ", type)
      console.log("pipeline: ", pipeline)
      console.log("queryContent: ", queryContent)
      console.log("target: ", target)
      console.log("{ [sortArray[0]]: sortArray[1] }: ", {
        [sortArray[0]]: sortArray[1],
      })
      console.log("skipNumber(): ", skipNumber())
      console.log("itemsPerPage: ", itemsPerPage) */
      console.log("target: ", target)

      if ((this[type] as ModuleType).source === "md") {
        items = (this.search as string)?.length
          ? await searchContent(this.search as string)
          : await queryContent(target)
              /*  .where(pipeline) */
              .sort({ [sortArray[0]]: sortArray[1] })
              /*  .sort({ [sortArray[2]]: sortArray[3] }) */
              .skip(skipNumber())
              .limit(itemsPerPage)
              .find()
      }
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
        ...(((this[type] as ModuleType).list.sortBy as string[]).length &&
          sortByItem !== defaultSort.value[0] && {
            sortBy: sortByItem,
          }),
        ...(typeof sortDescItem !== "undefined" &&
          sortDescItem !== defaultSort.value[1] && {
            sortDesc: !!sortDescItem,
          }),
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

      // fetch the item categories

      this.setFiltersCount(type)
      this.setBlankFilterLoad(type)
      /*       console.log("type2: ", type) */
      ;(this[type] as ModuleType).list.items = items as any
      this.total = totalItems
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
