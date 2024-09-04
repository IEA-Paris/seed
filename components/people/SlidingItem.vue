<template>
  <v-card
    flat
    class="pa-6"
    :to="localePath('/people/' + slugify(item.firstname + ' ' + item.lastname))"
    v-motion-fade-visible
  >
    <MiscAtomsImageContainer
      :loading="rootStore.people.loading"
      :src="item.image"
      :ratio="1 / 1"
      :link="item.firstname + ' ' + item.lastname"
      name="people-slug"
    />
    <v-card-title class="mt-3 pl-0 text-left">{{
      item.firstname + " " + item.lastname
    }}</v-card-title>
    <v-card-text
      class="text-subtitle text-left text-disabled"
      style="max-width: 240px"
    >
      {{ item.specialty }}
    </v-card-text>
  </v-card>
</template>
<script setup>
// import { useDisplay } from "vuetify"
// const { smAndUp } = useDisplay()
import { useRootStore } from "~/store/root";
const rootStore = useRootStore();

const localePath = useLocalePath();
const props = defineProps({
  item: Object,
});
</script>
<style lang="scss"></style>
