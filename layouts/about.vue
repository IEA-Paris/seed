<template>
  <v-app>
    <v-main class="myapp">
      <div class="header-section">
        <NavigationTopBar />
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
          <v-divider></v-divider>
        </v-container>
      </div>
      <v-container> <slot /></v-container>
    </v-main>
    <section>
      <NavigationFooter />
    </section>
  </v-app>
</template>

<script setup>
const ignoredRoutes = ["fr", "about", "activities"]
const route = useRoute()
console.log("route: ", route.name)
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
<style lang="scss">
// .myapp {
//   height: 100vh;
//   overflow-y: scroll;
//   scroll-snap-type: y mandatory;
//   section {
//     height: 100vh;
//   }
//   section,
//   header-section {
//     display: flex !important;
//     scroll-snap-align: start;
//     scroll-snap-stop: always;
//   }
//   div section {
//     height: 100vh;
//     display: flex !important;
//     scroll-snap-align: start;
//     scroll-snap-stop: always;
//   }
// }
</style>
