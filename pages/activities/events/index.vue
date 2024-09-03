<template>
  <v-container style="max-width: 1600px">
    <ListOrganismsList type="events"></ListOrganismsList
  ></v-container>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";
import { ModuleType } from "~/store/module";
import { useRootStore } from "~/store/root";

const { smAndUp } = useDisplay();
const localePath = useLocalePath();

const rootStore = useRootStore();

const data = (rootStore.$state.events as ModuleType).list.items;
</script>
