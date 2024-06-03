<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ListOrganismsList type="events"></ListOrganismsList> </v-col
    ></v-row>
  </v-container>

  <div v-for="item in data" :key="item.start">
    <EventsRowsItem2 :item="item"></EventsRowsItem2>
  </div>

  <!-- <div v-for="item in data" :key="item.start">
    <EventsView :data="item" />
  </div> -->
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";
import { ModuleType } from "~/store/module";
import { useRootStore } from "~/store/root";

const { smAndUp } = useDisplay();
const localePath = useLocalePath();

const rootStore = useRootStore();

const data = (rootStore.$state.events as ModuleType).list.items;

console.log("DATA", data);
</script>
