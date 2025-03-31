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
    <!--     {{ "total : " + rootStore.total }} <br />
    {{ "search : " + rootStore.search }} <br />
    {{ "filtersCount : " + rootStore[props.type].list.filtersCount }} <br />
    {{ "numberOfPages : " + rootStore.numberOfPages }} <br />
    {{ "page : " + rootStore.page }} <br />
    {{ "type : " + props.type }} <br /> -->
    <template
      v-if="
        (!rootStore.search || rootStore.search.length === 0) &&
        rootStore[props.type].list.filtersCount === 0
      "
    >
      {{
        feminine
          ? $t(
              "list.0-items-found-f",
              [rootStore.total, $t("items." + props.type, rootStore.total)],
              rootStore.total,
            )
          : $t(
              "list.0-items-found",
              [rootStore.total, $t("items." + props.type, rootStore.total)],
              rootStore.total,
            )
      }}
    </template>
    <!--  searching for "XXX" -->
    <template
      v-else-if="
        !(!rootStore.search || rootStore.search.length === 0) &&
        rootStore[props.type].list.filtersCount === 0
      "
      >{{
        feminine
          ? $t(
              "list.0-items-found-searching-for-f",
              [
                rootStore.total,
                $t("items." + props.type, rootStore.total, rootStore.total),
                rootStore.search,
              ],
              rootStore.total,
            )
          : $t(
              "list.0-items-found-searching-for",
              [
                rootStore.total,
                $t("items." + props.type, rootStore.total, rootStore.total),
                rootStore.search,
              ],
              rootStore.total,
            )
      }}</template
    >
    <!--  with X filters -->
    <template
      v-else-if="
        (!rootStore.search || rootStore.search.length === 0) &&
        rootStore[props.type].list.filtersCount > 0
      "
      >{{
        feminine
          ? $t(
              "list.0-items-found-with-1-filter-f",
              [
                rootStore.total,
                $t("items." + props.type, rootStore.total, rootStore.total),
                rootStore[props.type].list.filtersCount,
                $t("filters", rootStore[props.type].list.filtersCount),
              ],
              rootStore.total,
            )
          : $t(
              "list.0-items-found-with-1-filter",
              [
                rootStore.total,
                $t("items." + props.type, rootStore.total, rootStore.total),
                rootStore[props.type].list.filtersCount,
                $t("filters", rootStore[props.type].list.filtersCount),
              ],
              rootStore.total,
            )
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
        feminine
          ? $t(
              "list.0-items-found-searching-for-with-1-filter-f",
              [
                rootStore.total,
                $t("items." + props.type, rootStore.total),
                rootStore.search,
                rootStore[props.type].list.filtersCount,
                $t("filters", rootStore[props.type].list.filtersCount),
              ],
              rootStore.total,
            )
          : $t(
              "list.0-items-found-searching-for-with-1-filter",
              [
                rootStore.total,
                $t("items." + props.type, rootStore.total),
                rootStore.search,
                rootStore[props.type].list.filtersCount,
                $t("filters", rootStore[props.type].list.filtersCount),
              ],
              rootStore.total,
            )
      }}</template
    >
    <template v-if="rootStore.numberOfPages > 1">
      <!--   // Page X of Y -->
      {{
        $t("list.page-0-of-1", [
          rootStore.page || 1,
          rootStore.numberOfPages || 1,
        ])
      }}</template
    >
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
const feminine = ref(["news", "publications", "people"].includes(props.type))
</script>

<style lang="scss" scoped></style>
