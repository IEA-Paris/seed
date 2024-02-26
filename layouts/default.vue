<style lang="scss" scoped>
.content {
  margin-top: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<script setup>
const ignoredRoutes = ["fr", "about", "activities"]
const localePath = useLocalePath()
const route = useRoute()
const crumbs = computed(() => {
  return route.path
    .split("/")
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
    })
})
</script>

<template>
  <v-app>
    <NavigationTopBar />
    <v-main class="scroller">
      <v-container v-if="crumbs && crumbs.length">
        <v-breadcrumbs :items="crumbs" class="pl-0" link>
          <template v-slot:prepend>
            <v-btn to="/" size="small" variant="text" icon="mdi-home"></v-btn>
            /
          </template>

          <template v-slot:title="{ item }">
            {{ $t(item.title).toUpperCase() }}
          </template>
        </v-breadcrumbs>
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
      <slot />
    </v-main>
    <NavigationFooter />
  </v-app>
</template>
