<template>
  <ListMoleculesHeader :type="type"></ListMoleculesHeader>
  <component :is="view">
    <component
      v-for="(item, index) in items"
      :item="item"
      :key="index"
      :is="itemTemplate"
      :index="index"
    ></component>
  </component>
  <div class="text-center">
    <ListMoleculesPagination
      v-if="numberOfPages > 1"
      :type="type"
      color="black"
      large
      :current-page="page"
      :total-pages="numberOfPages"
      :page-padding="1"
      :page-gap="2"
      :hide-prev-next="false"
    ></ListMoleculesPagination>
  </div>
</template>
<script setup>
import { useRootStore } from "~/store/root"
import { useDisplay } from "vuetify"
import { capitalize } from "~/composables/useUtils"
const { locale } = useI18n()
const {
  name: nameDisplay,
  xs: isXsDisplay,
  mobile: isMobileDisplay,
  smAndUp,
  lgAndUp,
  smAndDown,
} = useDisplay()
const nuxtApp = useNuxtApp()

const rootStore = useRootStore()
const props = defineProps({
  addBtn: {
    type: Boolean,
    required: false,
    default: false,
  },
  type: {
    type: String,
    default: "",
    required: true,
  },
  layout: {
    type: Object,
    required: false,
    default: () => {
      return {
        cols: 12,
        xl: 12,
      }
    },
  },
  pagination: {
    type: Object,
    required: false,
    default: () => {
      return {}
    },
  },
  addButton: {
    type: Boolean,
    required: false,
    default: false,
  },
  items: [Object],
})

const show = ref(true)
const view = computed(() =>
  resolveComponent(
    "ListViews" + capitalize(rootStore[props.type].list.view.name),
  ),
)
const itemTemplate = computed(() =>
  resolveComponent(
    (
      capitalize(props.type) +
      capitalize(rootStore[props.type].list.view.name) +
      "Item"
    ).toString(),
  ),
)
const route = useRoute()
const total = computed(() => rootStore.total)
const numberOfPages = computed(() => rootStore.numberOfPages)

const page = computed(() => +rootStore.page)

const sortBy = computed(() => rootStore[props.type].list.sortBy)

const sortDesc = computed(() =>
  rootStore[props.type].list.sortDesc[0] !== "asc" ? [false] : [true],
)

const filtersCount = computed(() => rootStore[props.type].list.filtersCount)

const items = computed(() => rootStore[props.type].list.items)

const itemsPerPage = computed({
  get() {
    return rootStore[props.type].list.itemsPerPage
  },
  set(value) {
    rootStore.updateItemsPerPage({ itemsPerPage: value, type: props.type })
    nuxtApp.$vuetify.goTo(0)
  },
})

const search = computed({
  get() {
    return rootStore.search
  },
  set(value) {
    debouncedSearch(value)
  },
})

const display = computed({
  get() {
    return rootStore[props.type].list.display
  },
  set(value) {
    rootStore.updateDisplay({ display: value, type: props.type })
    nuxtApp.$vuetify.goTo(0)
  },
})
try {
  await rootStore.update(props.type, locale.value)
} catch (error) {
  console.log("error fetching update list: ", error)
}
/* const { data, error } = await useAsyncData(props.type, () =>
)
console.log("error: ", error) */
onMounted(async () => {
  const { type, source } = props
  try {
    await rootStore.update(props.type, locale.value)
  } catch (error) {
    console.log("error fetching update list: ", error)
  }
  const hasFilters =
    rootStore[type].filtersCount > 0 ||
    (route.query?.filters && Object.keys(route.query.filters).length > 0) ||
    route.query?.search?.length > 0
  /*
    filter.value = hasFilters */
})

const test = [
  {
    $search: {
      index: "events-search-index",
      text: { query: "test", path: ["name.en", "summary.en"] },
    },
  },
  { $project: { score: { $meta: "searchScore" }, _id: 1 } },
  { $set: { source: "events" } },
  { $limit: 3 },
  {
    $unionWith: {
      coll: "fellowships",
      pipeline: [
        {
          index: "fellowships-search-index",
          $search: { text: { query: "test", path: ["name.en", "summary.en"] } },
        },
        { $set: { source: "fellowships" } },
        {
          $project: {
            score: { $meta: "searchScore" },
            _id: 1,
            source: 1,
            "name.en": 1,
            "summary.en": 1,
          },
        },
        { $limit: 3 },
        { $sort: { score: -1 } },
      ],
    },
  },
  {
    $unionWith: {
      coll: "news",
      pipeline: [
        {
          index: "news-search-index",
          $search: { text: { query: "test", path: ["name.en"] } },
        },
        { $set: { source: "news" } },
        {
          $project: {
            score: { $meta: "searchScore" },
            _id: 1,
            source: 1,
            "name.en": 1,
          },
        },
        { $limit: 3 },
        { $sort: { score: -1 } },
      ],
    },
  },
  {
    $unionWith: {
      coll: "people",
      pipeline: [
        {
          index: "people-search-index",
          $search: {
            text: {
              query: "test",
              path: ["lastname.en", "biography.en", "affiliation.name"],
            },
          },
        },
        { $set: { source: "people" } },
        {
          $project: {
            score: { $meta: "searchScore" },
            _id: 1,
            source: 1,
            "lastname.en": 1,
            "biography.en": 1,
            "affiliation.name": 1,
          },
        },
        { $limit: 3 },
        { $sort: { score: -1 } },
      ],
    },
  },
  {
    $unionWith: {
      coll: "projects",
      pipeline: [
        {
          index: "projects-search-index",
          $search: {
            text: {
              query: "test",
              path: ["name.en", "summary.en", "category.name"],
            },
          },
        },
        { $set: { source: "projects" } },
        {
          $project: {
            score: { $meta: "searchScore" },
            _id: 1,
            source: 1,
            "name.en": 1,
            "summary.en": 1,
            "category.name": 1,
          },
        },
        { $limit: 3 },
        { $sort: { score: -1 } },
      ],
    },
  },
  {
    $unionWith: {
      coll: "publications",
      pipeline: [
        {
          index: "publications-search-index",
          $search: {
            text: { query: "test", path: ["name.en", "abstract.en"] },
          },
        },
        { $set: { source: "publications" } },
        {
          $project: {
            score: { $meta: "searchScore" },
            _id: 1,
            source: 1,
            "name.en": 1,
            "abstract.en": 1,
          },
        },
        { $limit: 3 },
        { $sort: { score: -1 } },
      ],
    },
  },
]
</script>
