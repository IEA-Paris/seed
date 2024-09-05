<template>
  <v-app>
    <NavigationTopBar />
    <v-main>
      <v-container v-if="crumbs && crumbs.length">
        <!--         <v-breadcrumbs :items="crumbs" class="pl-0" link>
          <template v-slot:prepend>
            <v-btn to="/" size="small" variant="text" icon="mdi-home"></v-btn>
            /
          </template>

          <template v-slot:title="{ item }">
            {{ $t(item.title).toUpperCase() }}
          </template>
        </v-breadcrumbs> -->
        <v-btn
          x-large
          :height="mdAndUp ? '56' : '40'"
          outlined
          :rounded="0"
          color="primary"
          @click="rootStore.setLoading(!rootStore.loading)"
        >
          <v-icon left>mdi-loading</v-icon>
        </v-btn>
        <!--    <h1
          v-if="
            crumbs.slice(-1)[0] &&
            crumbs.slice(-1)[0].title &&
            crumbs.slice(-1)[0].title.length
          "
        >
          {{ $t(crumbs.slice(-1)[0].title) }}
        </h1> -->
        <v-divider></v-divider>
      </v-container>
      <v-container class="main-container">
        <slot />
      </v-container>
      <!--   <section v-if="isSnapRoutes()" style="background-color:black">
        <NavigationFooter></NavigationFooter>
      </section> -->
      <NavigationFooter />
    </v-main>
  </v-app>
</template>

<script setup>
const ignoredRoutes = ["fr", "about", "activities"]
import { useDisplay } from "vuetify"
const { name, mdAndUp } = useDisplay()
const { locale } = useI18n()

const localePath = useLocalePath()
const route = useRoute()
const isSnapRoutes = () => {
  return route.name.startsWith("about") || route.name.startsWith("index")
}
const crumbs = computed(() => {
  return route.path
  /*  .split("/")
    .filter((item) => item && !ignoredRoutes.includes(item))
    .map((item, index) => {
      return {
        title: item,
        ...(index > 0 && {
          href:
            "/" +
            route.path
              .split("/")
              .filter((item) => item)
              .slice(0, index + 1)
              .join("/"),
        }),
        disabled: false,
        exact: true,
      }
    */
})
</script>
<style lang="scss" scoped>
.content {
  margin-top: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
