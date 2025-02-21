<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-text-field
      v-model.trim="search"
      :placeholder="$t('list.search-type', [$t(type)])"
      prepend-inner-icon="mdi-magnify"
      single-line
      class="transition-swing"
      variant="outlined"
      hide-details
      clearable
      tile
      type="search"
      :loading="rootStore.loading"
      v-bind="menu"
    >
      <!--    :loading="$nuxt.loading || $store.state.loading" :class="{ 'mt-3':
      $store.state.scrolled }" -->
      <template v-if="!search" #label>
        <div class="searchLabel">
          {{ $t("list.search-type", [$t(props.type)]) }}
        </div>
      </template></v-text-field
    >
    <v-expand-transition>
      <v-list
        lines="three"
        item-props
        style="max-height: 300px"
        class="overflow-y-auto"
        v-show="search.length"
      >
        <div v-if="rootStore.loading" class="d-flex justify-center py-6">
          <v-progress-circular
            color="black"
            size="64"
            indeterminate
          ></v-progress-circular>
        </div>
        <template v-for="(item, index) in results">
          <v-list-subheader v-if="item.type && item.type === 'subheader'">{{
            item.name
          }}</v-list-subheader>
          <div v-else-if="item.type && item.type === 'no-result'" class="mx-6">
            {{ $t("no-result") }}
          </div>
          <v-divider
            v-else-if="item.type && item.type === 'divider'"
            inset
          ></v-divider>
          <ListAtomsSearchItem
            v-else
            :index
            :item
            :type="item.type"
          ></ListAtomsSearchItem>
        </template> </v-list
    ></v-expand-transition>
  </div>
</template>

<script setup>
import { useDebounceFn } from "@vueuse/core"
import { useDisplay } from "vuetify"
const { locale, locales, messages, t } = useI18n()
const {
  name: nameDisplay,
  xs: isXsDisplay,
  mobile: isMobileDisplay,
  smAndUp,
  lgAndUp,
  smAndDown,
} = useDisplay()
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
const results = computed(() => {
  const rst =
    (Object.keys(rootStore.results).length &&
      Object.keys(rootStore.results)
        .sort((a, b) => {
          return (
            rootStore.results[b]?.items?.length -
            rootStore.results[a]?.items?.length
          )
        })
        .reduce((acc, key, index) => {
          const items = rootStore.results[key]?.items
          console.log("items: ", items)
          const total = rootStore.results[key]?.total
          if (total === 0 && index === 0) {
            acc.push({ type: "no-result" })
            return acc
          }
          if (items?.length) {
            acc.push({ type: "subheader", name: t("items." + key, 2) })
            acc.push(
              ...items.map((item) => ({
                prependAvatar: item.image.url,
                title: item.name || item.firstname + " " + item.lastname,
                subtitle: item.summary || item.biography,
                id: item.id,
                type: key,
              })),
            )
          }
          acc.push({ type: "divider" })
          return acc
        }, [])) ||
    {}
  console.log("rst: ", rst)
  return rst
})
const search = computed({
  get() {
    return rootStore.search
  },
  set: await useDebounceFn(async function (v) {
    await rootStore.updateSearch({ search: v || "", lang: locale.value })
  }, 300),
})
</script>

<style lang="scss" scoped></style>
