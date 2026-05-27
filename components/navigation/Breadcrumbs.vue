<template>
  <v-container v-if="crumbs && crumbs.length">
    <v-breadcrumbs :items="crumbs" class="pl-0 w-100" link>
      <template #prepend>
        <v-btn
          :to="$localePath('/')"
          size="small"
          variant="text"
          icon="mdi-home"
        ></v-btn>
        /
      </template>

      <template #title="{ item }">
        {{ $t(item.title).toUpperCase() }}
      </template>
    </v-breadcrumbs>
    <v-divider></v-divider>
  </v-container>
</template>

<script setup>
const ignoredRoutes = ["fr"]
const { locale } = useI18n()
const route = useRoute()

const crumbs = computed(() => {
  const fullSegments = route.path.split("/").filter((item) => item)
  const segments = fullSegments.filter((item) => !ignoredRoutes.includes(item))
  const baseOffset = locale.value === "en" ? 0 : 1

  const programs = new Set([
    "fellowships",
    "projects",
    "events",
    "publications",
    "news",
  ])
  const about = new Set(["institute", "scientific_policy", "network"])

  let currentPathSegments = fullSegments.slice(0, baseOffset)

  return segments.map((item) => {
    const isPrograms =
      fullSegments[baseOffset] === "programs" && programs.has(item)

    const isAbout = fullSegments[baseOffset] === "about" && about.has(item)

    if (isPrograms || isAbout) {
      currentPathSegments = fullSegments.slice(0, baseOffset + 2)
    } else {
      currentPathSegments.push(item)
    }

    return {
      title: item.replace(/-/g, " "),
      to: "/" + currentPathSegments.join("/") + "/",
      disabled: ["about", "programs", "resources"].includes(item),
      exact: true,
    }
  })
})
</script>

<style lang="scss" scoped>
:deep(.v-breadcrumbs-item--disabled) {
  opacity: 1 !important;
}
</style>
