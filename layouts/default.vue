<script setup lang="ts">
const route = useRoute()
const crumbs = computed (()=>{
  return route.path.split('/').filter(item => item).map((item) => {return {text: item, to: item}})
})
console.log("route", crumbs);
</script>

<template>
  <v-app>
    <TopBar />
    <v-main>
      <v-container v-if="crumbs">
        <v-breadcrumbs :items="crumbs"></v-breadcrumbs>
        <h1 v-if="crumbs.slice(-1)[0]&&crumbs.slice(-1)[0].text&&crumbs.slice(-1)[0].text.length" v-html="$t(crumbs.slice(-1)[0].text)"></h1>
        <v-divider></v-divider>
      </v-container>
      <slot />
    </v-main>
    <Footer />
  </v-app>
</template>
