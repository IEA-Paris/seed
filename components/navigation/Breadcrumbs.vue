<template>
  <v-container v-if="crumbs && crumbs.length">
    <!--    TODO: make a NavigationBreadcrumbs component with propers links and correct urls -->
    <v-breadcrumbs :items="crumbs" class="pl-0 w-100">
      <template v-slot:prepend>
        <v-btn
          :to="localePath('/')"
          size="small"
          variant="text"
          icon="mdi-home"
        ></v-btn>
        /
      </template>

      <template v-slot:title="{ item }">
        {{ $t(item.title).toUpperCase().replaceAll("-", " ") }}
      </template>
    </v-breadcrumbs>

    <!-- <v-btn
      x-large
      :height="mdAndUp ? '56' : '40'"
      outlined
      :rounded="0"
      color="primary"
      @click="rootStore.setLoading(!rootStore.loading)"
    >
      <v-icon left>mdi-loading</v-icon>
    </v-btn>
    <h1
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
</template>

<script setup>
const ignoredRoutes = ["fr", "about", "activities"]
import { useDisplay } from "vuetify"
const { name, mdAndUp } = useDisplay()
const { locale } = useI18n()
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()

const localePath = useLocalePath()
const route = useRoute()

const crumbs = computed(() => {
  const fullSegments = route.path.split("/").filter((item) => item)
  const segments = fullSegments.filter((item) => !ignoredRoutes.includes(item))
  const baseOffset = locale.value === "en" ? 0 : 1

  const activities = new Set([
    "fellowships",
    "projects",
    "events",
    "publications",
  ])
  const about = new Set(["institute", "scientific_policy", "network"])

  let currentPathSegments = fullSegments.slice(0, baseOffset)

  return segments.map((item) => {
    const isActivities =
      fullSegments[baseOffset] === "activities" && activities.has(item)

    const isAbout = fullSegments[baseOffset] === "about" && about.has(item)

    if (isActivities || isAbout) {
      currentPathSegments = fullSegments.slice(0, baseOffset + 2)
    } else {
      currentPathSegments.push(item)
    }

    return {
      title: item,
      to: "/" + currentPathSegments.join("/") + "/",
      disabled: false,
      exact: true,
    }
  })
})
</script>

<style lang="scss" scoped></style>
