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
        <v-spacer></v-spacer>
        <ListMoleculesFilters :type="type" />
        <ListAtomsViewMenu :type="type" />
        <ListAtomsSortMenu :type="type" />
      </div>
      <ListAtomsSearchString :type="type" />

      <ListAtomsSearchInput :type="type"
    /></v-col>
  </v-row>
</template>

<script setup>
import { useRootStore } from "~/store/root";
const rootStore = useRootStore();

import { useDisplay } from "vuetify";
const { name, mdAndDown, md, xl, lg, smAndDown, mdAndUp, lgAndUp } =
  useDisplay();

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: "",
  },
});
// const route = useRoute()
const localePath = useLocalePath();
</script>
