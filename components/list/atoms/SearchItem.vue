<template>
  <v-list-item
    :to="localePath('/activities/events/' + slugify(item.name))"
    class="search-item"
  >
    <template
      v-slot:item
      :key="index.toString() + slugify(item.name)"
    ></template>
    <template v-slot:prepend v-if="item.prependAvatar">
      <v-avatar rounded="0" :image="item.prependAvatar"> </v-avatar>
    </template>
    <template v-slot:title>
      <div v-html="item.name" class="text-black black-text"></div>
    </template>
    <template v-slot:subtitle>
      <div v-html="item.subtitle" class="text-black black-text"></div>
    </template>
    <template v-slot:append>
      <v-btn
        icon="mdi-open-in-new"
        variant="text"
        :to="localePath('/activities/events/' + slugify(item.name))"
        target="_blank"
      ></v-btn>
    </template>
  </v-list-item>
</template>
<script setup>
// import { useDisplay } from "vuetify"
// const { smAndUp } = useDisplay()
const localePath = useLocalePath()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})
</script>
<style lang="scss">
.search-item {
  max-width: 450px;
}
</style>
