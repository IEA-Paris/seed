<template>
  <v-row no-gutters>
    <v-col cols="12">
      <!--    <v-btn
        v-if="rootStore.addBtn"
        x-large
        :height="mdAndUp ? '56' : '40'"
        outlined
        :rounded="0"
        color="primary"
        :to="localePath($route.fullPath + '/create')"
      >
        <v-icon left>mdi-plus</v-icon>
        {{ $t("new-x", { item: $tc("x-" + type, 1) }) }}
      </v-btn> -->
      <div class="d-flex">
        <ListAtomsFiltersMenu
          :open="filtersOpen"
          @open="filtersOpen = $event"
        />
        <v-spacer></v-spacer>
        <ListAtomsViewMenu :type="type" />
        <ListAtomsSortMenu :type="type" />
      </div>
      <v-expand-transition>
        <div v-if="filtersOpen" class="mb-7">
          <ListMoleculesFilters :type="type" /></div
      ></v-expand-transition>
      <ListAtomsSearchInput :type="type" />
      <ListAtomsSearchString :type="type" />
    </v-col>
  </v-row>
</template>

<script setup>
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const route = useRoute()
import { useDisplay } from "vuetify"
const { name, mdAndDown, md, xl, lg, smAndDown, mdAndUp, lgAndUp } =
  useDisplay()

const filtersOpen = ref(!!Object.keys(route.query)?.length)
console.log("!!route.query?.length: ", !!Object.keys(route.query)?.length)

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: "",
  },
})
// const route = useRoute()
const localePath = useLocalePath()
</script>
