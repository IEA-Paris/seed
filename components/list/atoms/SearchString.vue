<template>
  <div class="mt-4 font-weight-light">
    <!--   //TODO pluralize properly (Aucun X trouvé | 1 X trouvé | X trouvés)
      // https://vue-i18n.intlify.dev/guide/advanced/composition#pluralization -->

    <!--   // X `items` found
      // 
      // with X filters
      // X items per page
      // displayed by X
      // and sorted by X -->
    <template
      v-if="
        (!rootStore.search || rootStore.search.length === 0) &&
        rootStore[props.type].list.filtersCount === 0
      "
    >
      {{
        $t("list.0-items-found", [
          rootStore.total,
          $t("items." + props.type, [rootStore.total]),
        ])
      }}
    </template>
    <!--  searching for "XXX" -->
    <template
      v-else-if="
        !(!rootStore.search || rootStore.search.length === 0) &&
        rootStore[props.type].list.filtersCount === 0
      "
      >{{
        $t("list.0-items-found-searching-for", [
          rootStore.total,
          $t("items." + props.type, [rootStore.total]),
          rootStore.search,
        ])
      }}</template
    >
    <!--  with X filters -->
    <template
      v-else-if="
        (!rootStore.search || rootStore.search.length === 0) &&
        rootStore[props.type].list.filtersCount > 0
      "
      >{{
        $t("list.0-items-found-with-1-filter", [
          rootStore.total,
          $t("items." + props.type, [rootStore.total]),
          rootStore[props.type].list.filtersCount,
          { filters: rootStore[props.type].list.filtersCount },
        ])
      }}</template
    >
    <!--  searching for "XXX" with Y filters  -->
    <template
      v-else-if="
        rootStore.search &&
        rootStore.search.length &&
        rootStore[props.type].list.filtersCount > 0
      "
      >{{
        $t("list.0-items-found-searching-for-with-1-filter", [
          rootStore.total,
          $t("items." + props.type, [rootStore.total]),
          rootStore.search,
          rootStore[props.type].list.filtersCount,
        ])
      }}</template
    >
    <!--   // Page X of Y -->
    {{
      $t("list.page-0-of-1", [
        rootStore.page || 1,
        rootStore.numberOfPages || 1,
      ])
    }}
    <!--  X items per page -->
    <!-- displayed by X -->
    <!--  and sorted by X -->
  </div>
</template>

<script setup>
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped></style>
