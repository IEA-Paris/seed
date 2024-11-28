<template>
  <div class="d-flex flex-grow-1">
    <v-menu location="bottom">
      <template v-slot:activator="{ props: menu }">
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
          :loading="loading"
          v-bind="menu"
        >
          <!--    :loading="$nuxt.loading || $store.state.loading" :class="{ 'mt-3':
      $store.state.scrolled }" -->
          <template v-if="!search" #label>
            <div class="searchLabel">
              {{ $t("list.search-type", [$t(props.type)]) }}
            </div>
          </template></v-text-field
        ></template
      >
      <v-list
        lines="three"
        item-props
        style="max-height: 300px"
        class="overflow-y-auto"
      >
        <template v-for="(item, index) in results">
          <v-list-subheader v-if="item.type && item.type === 'subheader'">{{
            item.title
          }}</v-list-subheader>
          <v-divider
            v-else-if="item.type && item.type === 'divider'"
          ></v-divider>
          <ListAtomsSearchItem v-else :index :item></ListAtomsSearchItem>
        </template>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
import { useDebounceFn } from "@vueuse/core"
import { useDisplay } from "vuetify"
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
const results = ref([
  { type: "subheader", title: "Events" },
  {
    prependAvatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
    title: "Brunch this weekend?",
    subtitle: `<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
  },
  { type: "divider", inset: true },
  {
    prependAvatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
    title: "Summer BBQ",
    subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
  },
  { type: "divider", inset: true },
  {
    prependAvatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
    title: "Oui oui",
    subtitle:
      '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
  },
  { type: "divider", inset: true },
  {
    prependAvatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
    title: "Birthday gift",
    subtitle:
      '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
  },
  { type: "divider", inset: true },
  {
    prependAvatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
    title: "Recipe to try",
    subtitle:
      '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
  },
  { type: "subheader", title: "Publications" },
  {
    prependAvatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
    title: "Brunch this weekend?",
    subtitle: `<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
  },
  { type: "divider", inset: true },
  {
    prependAvatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
    title: "Summer BBQ",
    subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
  },
  { type: "divider", inset: true },
  {
    prependAvatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
    title: "Oui oui",
    subtitle:
      '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
  },
  { type: "divider", inset: true },
  {
    prependAvatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
    title: "Birthday gift",
    subtitle:
      '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
  },
  { type: "divider", inset: true },
  {
    prependAvatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
    title: "Recipe to try",
    subtitle:
      '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
  },
])
const search = computed({
  get() {
    return rootStore.search || ""
  },
  set: useDebounceFn(function (v) {
    rootStore.updateSearch({ search: v, type: props.type })
  }, 300),
})
</script>

<style lang="scss" scoped></style>
