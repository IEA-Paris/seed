<template>
  <v-btn-toggle
    value="currentPage"
    role="navigation"
    aria-label="Pagination Navigation"
  >
    <!--  TODO: switch to page as route param -->
    <v-btn
      v-if="!(hidePrevNext && firstPageSelected())"
      :disabled="firstPageSelected()"
      min-width="35"
      height="35"
      width="35"
      :tabindex="!hidePrevNext && firstPageSelected() ? -1 : 0"
      aria-label="Previous Page"
      nuxt
      :to="`/${type}/${currentPage - 1}`"
      @keyup.enter="$router.push(`/${type}/${currentPage - 1}`)"
    >
      <v-icon>mdi-chevron-left </v-icon>
    </v-btn>

    <template v-for="(page, index) in renderPages">
      <v-btn
        v-if="page.isGap"
        :key="page.key"
        min-width="35"
        height="35"
        width="35"
        icon
        nuxt
        :to="`/${type}/${Math.floor(
          renderPages[index - 1].key +
            ((renderPages[index + 1].key || totalPages) -
              renderPages[index - 1].key) /
              2,
        )}`"
      >
        ...
      </v-btn>
      <template v-else>
        <v-btn
          :key="page.key"
          :class="{ 'active-page': page.current }"
          :to="`/${type}/${page.value}`"
          tabindex="0"
          outlined
          min-width="35"
          height="35"
          tile
          nuxt
          :color="page.current ? 'white' : 'black'"
          text
          width="35"
          :aria-current="page.current ? 'true' : 'false'"
          :aria-label="
            page.current
              ? `Current page, Page ${page.value}`
              : `Goto Page ${page.value}`
          "
          @keyup.enter="$router.push(`/${type}/${page.value}`)"
        >
          {{ page.value }}
        </v-btn>
      </template>
    </template>

    <v-btn
      v-if="!(hidePrevNext && lastPageSelected())"
      :tabindex="!hidePrevNext && lastPageSelected() ? -1 : 0"
      :disabled="lastPageSelected()"
      aria-label="Next Page"
      :to="`/${type}/${currentPage + 1}`"
      min-width="35"
      height="35"
      width="35"
      nuxt
      @keyup.enter="$router.push(`/${type}/${currentPage + 1}`)"
    >
      <v-icon>mdi-chevron-right</v-icon></v-btn
    >
  </v-btn-toggle>
</template>

<script setup>
// THIS COMPONENT IS INITALLY BASED ON https://github.com/ashwinkshenoy/vue-simple/tree/master/packages/vs-pagination
// AND MODIFIED TO FIT INTO OUR NEEDS (Vuetify + nuxt 3)
const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  pagePadding: {
    type: Number,
    default: 1,
    validator: (value) => {
      return value > 0
    },
  },
  pageGap: {
    type: Number,
    default: 2,
    validator: (value) => {
      return value > 0
    },
  },
  hidePrevNext: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "",
    required: true,
  },
})

const renderPages = computed(() => {
  const pages = []

  for (let pageIndex = 1; pageIndex <= props.totalPages; pageIndex++) {
    if (
      pageIndex === props.currentPage ||
      pageIndex < props.pageGap ||
      pageIndex > props.totalPages - props.pageGap + 1
    ) {
      pages.push(createPage(pageIndex))
      continue
    }

    let minimum
    let maximum

    if (props.currentPage <= props.pageGap + props.pagePadding) {
      minimum = props.pageGap + 1
      maximum = minimum + props.pagePadding * 2
    } else if (
      props.currentPage >=
      props.totalPages - props.pageGap - props.pagePadding
    ) {
      maximum = props.totalPages - props.pageGap
      minimum = maximum - props.pagePadding * 2
    } else {
      minimum = props.currentPage - props.pagePadding
      maximum = props.currentPage + props.pagePadding
    }

    if (
      (pageIndex >= minimum && pageIndex <= props.currentPage) ||
      (pageIndex >= props.currentPage && pageIndex <= maximum)
    ) {
      pages.push(createPage(pageIndex))
      continue
    }

    if (pageIndex === props.pageGap) {
      if (
        minimum > props.pageGap + 1 &&
        props.currentPage > props.pageGap + props.pagePadding + 1
      ) {
        pages.push(createGap(pageIndex))
      } else {
        pages.push(createPage(pageIndex))
      }

      continue
    }

    if (pageIndex === props.totalPages - props.pageGap + 1) {
      if (
        maximum < props.totalPages - props.pageGap &&
        props.currentPage < props.totalPages - props.pageGap - props.pagePadding
      ) {
        pages.push(createGap(pageIndex))
      } else {
        pages.push(createPage(pageIndex))
      }

      continue
    }
  }

  return pages
})

const createPage = (pageIndex) => {
  return {
    key: pageIndex,
    current: props.currentPage === pageIndex,
    value: pageIndex,
  }
}

const firstPageSelected = () => {
  return props.currentPage === 1
}

const lastPageSelected = () => {
  return props.currentPage === props.totalPages || props.totalPages === 0
}

const createGap = (pageIndex) => {
  return {
    key: pageIndex,
    isGap: true,
  }
}
</script>

<style lang="scss">
.active-page {
  background-color: #000;
  color: #f5f5f5 !important;
}
</style>
