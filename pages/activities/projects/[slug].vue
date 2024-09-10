<template>
  <!-- <v-container>
    <v-row>
      <v-col cols="12">
        <v-img block :src="item.picture" height="250px"></v-img>
        <v-card-title>{{ item.title }}</v-card-title>
        <v-card-text> <ContentRenderer :value="item" /></v-card-text>
      </v-col>
    </v-row>
  </v-container> -->

  <v-container> <ProjectView :item="item"></ProjectView></v-container>
</template>

<script setup async>
const route = useRoute()
const { locale } = useI18n()
console.log("route.params.slug: ", route.params.slug)
const { data } = await useAsyncData("project", () =>
  queryContent("project/" + locale.value + "/" + route.params.slug).findOne(),
)

const item = data._value

console.log("item: ", item)
</script>
