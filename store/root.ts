/* import filtersRaw from '~/assets/data/filters'
import lists from '~/assets/data/lists' */
import createModule, { ModuleType } from "~/store/module";
/* import api from "~/server/api/github" */
import config from "~/static.config";
import fs from "fs";
import { Views } from "@paris-ias/data";
interface InputParams {
  key?: any | string;
  level?: any[] | any | null;
  store?: any[] | any | null;
  category?: any | string;
  defaults?: any | null;
  value?: any;
}
type QueryValues = string | Views | boolean | number | string[] | undefined;
const modulesState: Record<string, ModuleType> = {};
let types: string[] = [];
console.log("STARTING THE STORE");
const initStore = async () => {
  const modules = {};
  if (process.server) {
    // console.log("opening directory");
    const dir = fs.opendirSync("./data");
    let file;
    while ((file = dir.readSync()) !== null) {
      !(file.name.startsWith(".") || file.name === "LICENCE") &&
        types.push(file.name.substring(0, file.name.length - 3));
    }
    dir.closeSync();
  }
  // console.log("types: ", types);

  await Promise.all(
    [/* "people", "fellowship", "project", */ "events" /* , "news" */].map(
      async (type) => {
        modulesState[type] = await createModule(type);
      }
    )
  );
  /* const githubApi = new api(config.modules.github) */
  return modules;
};

export const useRootStore = defineStore("rootStore", {
  state: (): Record<string, boolean | ModuleType> => ({
    scrolled: process.browser ? window.scrollY > 0 : false,
    loading: true,
    resetFilters: false,
    ...modulesState,
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
        return true;
      } catch (error) {
        console.log(`error while saving ${type}`, error);
      }
    },
    setLoading(value: boolean) {
      this.loading = value;
    },
    setScrolled() {
      if (process.browser) {
        this.scrolled = window.scrollY > 0;
      }
    },

    getKey({ key, level, store }: InputParams): any {
      console.log("key: ", key);
      console.log("level: ", level);
      console.log("store: ", store);
      console.log("store key val: ", store?.[level[0]]);
      const isArray = typeof level[0] === "number";
      if (level.length === 1) {
        //guard against undef keys
        if (store[level[0]] === undefined) store[level[0]] = ""; // TODO make sure it works with othjer primitive types
        return isArray ? store.at(level[0]) : store[level[0]];
      }

      if (level.length > 1) {
        //guard against undef keys
        if (store[level[0]] === undefined) {
          if (isArray) {
            store[level[0]] = [];
          } else {
            // if the key is not a number, it is an object (if it was a primitive, level.length would be 1)
            store[level[0]] = {};
          }
        }
        return this.getKey({
          key,
          level: level.slice(1),
          store: isArray ? store.at(level[0]) : store[level[0]],
        });
      }
    },
    updateForm({ key, value, category, level, store }: InputParams): any {
      level = level ?? [(this[category] as ModuleType)?.form?.values[key]];
      store = store ?? (this[category] as ModuleType).form.values;
      console.log(`updateForm
        key: ${key}
        value: ${value}
        category: ${category}
        level: ${level}
        store: ${Array.isArray(store) ? store.length : Object.keys(store)}`);
      if (level.length === 1) {
        //guard against undef keys
        if (store[level[0]] === undefined) store[level[0]] = ""; // TODO make sure it works with othjer primitive types
        store[level[0]] = value;
      }

      if (level.length > 1) {
        const isArray = typeof level[0] === "number";
        //guard against undef keys
        if (store[level[0]] === undefined) {
          if (isArray) {
            const itemValue = (this[category] as ModuleType).form.schema[key]
              ?.default;
            store[level[0]] = [itemValue];
          } else {
            // if the key is not a number, it is an object (if it was a primitive, level.length would be 1)
            store[level[0]] = {};
          }
        }
        return this.updateForm({
          key,
          value,
          level: level.slice(1),
          category,
          store: store[level[0]],
        });
      }
    },
    deleteFormItem({
      key,
      category,
      level = null,
      store = null,
    }: InputParams): any {
      level = level ?? [(this[category] as ModuleType).form.values[key]];
      store = store ?? (this[category] as ModuleType).form.values;
      console.log(`deleteFormItem
        key: ${key}
        category: ${category}
        level: ${level}`);
      // if level = 1 this is a primitive
      if (level.length === 1) {
        console.log("store: ", store.length);
        const newStore = store.filter(
          (item: any, index: any) => index === level[0]
        );
        store = newStore;
        console.log("store: ", store.length);
      } else if (level.length > 1) {
        const isArray = typeof level[0] === "number";
        return this.deleteFormItem({
          key,
          level: level.slice(1),
          category,
          store: store[level[0]],
        });
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
        level = level ?? [(this[category] as ModuleType).form.values[key]];
        store = store ?? (this[category] as ModuleType).form.values;
        const defaultForm = (this[category] as ModuleType).form
          ._defaults as string;
        if (!defaults) defaults = JSON.parse(defaultForm);
        console.log("defaults: ", defaults);
        console.log(`addFormItem
          key: ${key}
          category: ${category}
          level: ${level}`);
        // if level = 1 this is a primitive
        if (level.length === 1) {
          const defautlValue = defaults[level[0]][0];
          console.log("defautlValue: ", defautlValue);
          store[key].push(defautlValue);
        } else if (level.length > 1) {
          const isArray = typeof level[0] === "number";
          //guard against undef keys
          if (store[level[0]] === undefined) {
            if (isArray) {
              store[level[0]] = [];
            } else {
              // if the key is not a number, it is an object (if it was a primitive, level.length would be 1)
              store[level[0]] = {};
            }
          }
          return this.addFormItem({
            key,
            level: level.slice(1),
            category,
            store: store[level[0]],
            defaults: defaults[level[0]],
          });
        }
      } catch (error) {
        console.log("error: ", error);
      }
    },
    loadRouteQuery(type: string) {
      const { currentRoute } = useRouter();
      const query = currentRoute.value.query;

      if (query.search) {
        (this[type] as ModuleType).list.search = query.search;
      }
      if (query.filters) {
        const filters = JSON.parse(query.filters as any);
        Object.keys(filters).forEach((filter) => {
          (this[type] as ModuleType).list.filters[filter] = filters[filter];
        });
      }

      if (query.view) {
        (this[type] as ModuleType).list.view = query.view as
          | string
          | Views
          | undefined;
      }
      if (query.page) {
        (this[type] as ModuleType).list.page = +query.page;
      } else {
        (this[type] as ModuleType).list.page = 1;
      }

      const sortObj = (this[type] as ModuleType).list.sort;
      const defaultSortKey = Object.keys(sortObj).find(
        (item) => sortObj[item].default === true
      );
      const defaultSort = [sortObj[defaultSortKey as string]];
      if (query.sortBy) {
        (this[type] as ModuleType).list.sortBy = [query.sortBy] as any;
      }
      if (typeof query.sortDesc !== "undefined") {
        (this[type] as ModuleType).list.sortDesc = !!(
          query.sortDesc === "true"
        );
      } else {
        (this[type] as ModuleType).list.sortDesc = !!(
          defaultSort[0].value[0] === "desc"
        );
      }
    },
    setSearch({ search, type }: { search: any; type: string }) {
      (this[type] as ModuleType).list.search = search;
    },
    setItems({
      type,
      values,
    }: {
      type: string;
      values: { items: any; total: number; numberOfPages: number };
    }) {
      (this[type] as ModuleType).list.items = values.items;
      (this[type] as ModuleType).list.total = values.total;
      (this[type] as ModuleType).list.numberOfPages = values.numberOfPages;
    },
    setItemsPerPage({ value, type }: { value: number; type: string }) {
      (this[type] as ModuleType).list.itemsPerPage = value;
    },
    setPage({ page, type }: { page: number; type: string }) {
      (this[type] as ModuleType).list.page = page;
    },
    setFilters({
      filters,
      type,
    }: {
      filters: Record<string, any[]>;
      type: string;
    }) {
      if (filters[Object.keys(filters)[0]].length)
        (this[type] as ModuleType).loading.push(Object.keys(filters)[0]);
      (this[type] as ModuleType).list.filters[Object.keys(filters)[0]] =
        filters[Object.keys(filters)[0]];
    },
    setSort({ value, type }: { value: number[]; type: string }) {
      (this[type] as ModuleType).list.sortBy = [value[0]];
      ('this[type] as ModuleType).list.sortDesc = value[1] === "-1"');
    },
    setView({ value, type }: { value: string; type: string }) {
      (this[type] as ModuleType).list.view = value;
    },
    setFiltersCount(type: string) {
      const filters = (this[type] as ModuleType).list.filters;
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
        ).length;
      (this[type] as ModuleType).list.filtersCount = filtersCount;
    },
    setBlankState(type: string) {
      this.resetFilters = true;

      const viewsObj = (this[type] as ModuleType).list.views;
      const defaultViewsKey = Object.keys(viewsObj).find(
        (item) => viewsObj[item].default === true
      );
      const defaultView = viewsObj[defaultViewsKey as string];

      const sortObj = (this[type] as ModuleType).list.sort;
      const defaultSortKey = Object.keys(sortObj).find(
        (item) => sortObj[item].default === true
      );
      const defaultSort = [sortObj[defaultSortKey as string]];

      // TODO make dynamic based on an ~/assets located file
      (this[type] as ModuleType).list.filters = {
        years: [],
        issue: [],
        tags: [],
        language: [],
        thematic: [],
        discipline: [],
        type: [],
      };
      (this[type] as ModuleType).list.search = "";
      (this[type] as ModuleType).list.view = defaultView.value;
      (this[type] as ModuleType).list.sortBy = defaultSort[0].value[0];
      (this[type] as ModuleType).list.sortDesc =
        defaultSort[0].value[0] === "desc";
      (this[type] as ModuleType).resetFilters = false;
    },
    setBlankFilterLoad(type: string) {
      (this[type] as ModuleType).loading = [];
    },
    resetState(type: string) {
      this.setBlankState(type);
      this.setPage({ page: 1, type });
      this.update(type);
    },
    updateSort({ value, type }: { value: number[]; type: string }) {
      this.setSort({ value, type });
      this.setPage({ page: 1, type });
      this.update(type);
    },
    updateView({ value, type }: { value: string; type: string }) {
      this.setView({ value, type });
      this.update(type);
    },
    updateFilters({
      filters,
      type,
    }: {
      filters: Record<string, any[]>;
      type: string;
    }) {
      this.setFilters({ filters, type });
      this.setPage({ page: 1, type });
      this.update(type);
    },
    updateItemsPerPage({ value, type }: { value: number; type: string }) {
      this.setPage({ page: 1, type });
      this.setItemsPerPage({ value, type });
      this.update(type);
    },
    updatePage({ page, type }: { page: number; type: string }) {
      this.setPage({ page, type });
      this.update(type);
    },
    updateSearch({ search, type }: { search: any; type: string }) {
      this.setPage({ page: 1, type });
      this.setSearch({ search, type });
      this.update(type);
    },
    async update(type: string) {
      const lang =
        /* useNuxtApp().$i18n.locale || useNuxtApp().$i18n.fallbackLocale || */ "en";
      // console.log("type: ", type + "/" + lang);
      const target = type + "/" + lang + "/";
      this.setLoading(true);

      const router = useRouter();
      const filters = (this[type] as ModuleType)?.list?.filters || {};
      const pipeline = {
        // default filters
        /* ...filters, */
      };
      const queryFilters: any = {};

      // pipeline.$or = [];

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
          delete filters[filter];
          continue;
        }
        // update route query
        const val = filters[filter];
        queryFilters[filter] = val;

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

      // if (!pipeline.$or.length) {
      //   delete pipeline.$or;
      // } else {
      //   pipeline.$or = pipeline.$or.flat();
      // }
      console.log("pipeline: ", pipeline);

      const count = [{}];
      const totalItems = count.length;
      console.log("totalItems: ", totalItems);

      const itemsPerPageValue = (this[type] as ModuleType).list
        ?.itemsPerPage as number;
      const lastPage = Math.ceil(totalItems / itemsPerPageValue);

      const lastPageCount =
        totalItems % ((this[type] as ModuleType)?.list?.itemsPerPage || 1);

      const itemsPerPage = (this[type] as ModuleType)?.list?.itemsPerPage || 1;

      const skipNumber = () => {
        if (+(this[type] as ModuleType).list.page === 1) {
          return 0;
        }
        if (+(this[type] as ModuleType).list.page === lastPage) {
          if (lastPageCount === 0) {
            return totalItems - itemsPerPage;
          }
          return totalItems - lastPageCount;
        }
        return (+(this[type] as ModuleType).list.page - 1) * itemsPerPage;
      };

      const sortBy = (this[type] as ModuleType).list.sortBy;
      const sortByItem = (sortBy as number[])[0];

      const sortArray =
        (this[type] as ModuleType).list.view === "issues"
          ? [
              "issueIndex",
              (this[type] as ModuleType).list.sortDesc ? 1 : -1,
              "date",
              (this[type] as ModuleType).list.sortDesc ? 1 : -1,
            ]
          : [sortByItem, (this[type] as ModuleType).list.sortDesc ? -1 : 1];
      // console.log("type1: ", type);
      // console.log("pipeline: ", pipeline);
      // console.log("queryContent: ", queryContent);
      // console.log("target: ", target);
      // console.log("{ [sortArray[0]]: sortArray[1] }: ", {
      //   [sortArray[0]]: sortArray[1],
      // });
      // console.log("skipNumber(): ", skipNumber());
      // console.log("itemsPerPage: ", itemsPerPage);

      const { data: items } = await useAsyncData("items", () =>
        queryContent(target)
          .where(pipeline)
          .sort({ [sortArray[0]]: sortArray[1] })
          /*  .sort({ [sortArray[2]]: sortArray[3] }) */
          .skip(skipNumber())
          .limit(itemsPerPage)
          .find()
      );

      const viewsObj = (this[type] as ModuleType).list.views;
      const defaultViewsKey = Object.keys(viewsObj).find(
        (item) => viewsObj[item].default === true
      );
      const defaultView = viewsObj[defaultViewsKey as string];

      const sortObj = (this[type] as ModuleType).list.sort;
      const defaultSortKey = Object.keys(sortObj).find(
        (item) => sortObj[item].default === true
      );
      const defaultSort = sortObj[defaultSortKey as string];

      // console.log("type b4 route query: ", type);

      // update route
      const query: Record<string, QueryValues> = {
        ...((this[type] as ModuleType).list.search &&
          typeof (this[type] as ModuleType).list.search !== "undefined" && {
            search: (this[type] as ModuleType).list.search,
          }),
        ...((this[type] as ModuleType).list.page > 1 && {
          page: (this[type] as ModuleType).list.page.toString(),
        }),
        ...(((this[type] as ModuleType).list.sortBy as number[]).length &&
          sortByItem !== defaultSort.value[1] && {
            sortBy: sortByItem,
          }),
        ...(typeof (this[type] as ModuleType).list.sortDesc !== "undefined" &&
          ((this[type] as ModuleType).list.sortDesc ? "desc" : "asc") !==
            defaultSort.value[0] && {
            sortDesc: !!(this[type] as ModuleType).list.sortDesc,
          }),
        ...((this[type] as ModuleType).list.view &&
          (this[type] as ModuleType).list.view !== defaultView.name && {
            view: (this[type] as ModuleType).list.view,
          }),
        ...(Object.keys(filters)?.length && {
          filters: JSON.stringify(queryFilters),
        }),
      };
      // const sortObject = (obj: any) =>
      //   Object.fromEntries(Object.entries(obj).sort());
      // console.log("type b4 sort obj: ", type);
      // console.log("query: ", query);

      Object.keys(query).forEach((key) =>
        query[key] === undefined
          ? delete query[key]
          : // convert boolean to string
            typeof query[key] === "boolean"
            ? query[key] === (query[key] as any).toString()
            : {}
      );

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

      this.setFiltersCount(type);
      this.setBlankFilterLoad(type);
      // console.log("type2: ", type);
      this.setItems({
        type,
        values: { items, total: totalItems, numberOfPages: lastPage },
      });
      this.setLoading(false);
    },
  },
});
initStore()
  .then(() => console.log("Store"))
  .catch((error) => console.log(error));
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
