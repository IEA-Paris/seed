<template>
  <v-container v-if="crumbs && crumbs.length">
    <v-breadcrumbs :items="crumbs" class="pl-0 w-100" link>
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
</template>

<script setup>
const ignoredRoutes = ["fr", "about", "activities"]

const route = useRoute()

const crumbs = computed(() => {
  return route.path
    .split("/")
    .filter((item) => item && !ignoredRoutes.includes(item))
    .map((item, index) => {
      return {
        title: item,
        href:
          "/" +
          route.path
            .split("/")
            .filter((item) => item)
            .slice(0, index + 2)
            .join("/"),
        disabled: false,
        exact: true,
      }
    })
})
</script>

<style lang="scss" scoped></style>
