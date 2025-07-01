<template>
  <!-- TOP BAR CONTAINER -->
  <v-app-bar flat>
    <!--  WEBSITE LOGO -->
    <div
      @click="router.push(localePath('/'))"
      v-ripple
      class="px-4 d-flex align-center"
    >
      <NavigationLogo></NavigationLogo>
      <!-- <nuxt-link :to="localePath('/')" class="text-black">{{
        mdAndUp ? $t("paris-institute-for-advanced-study") : $t("paris-ias")
      }}</nuxt-link> -->
      <div class="d-flex align-start pl-3" v-if="mdAndUp">
        <v-img
          src="/logo_text.png"
          alt="Paris IAS"
          class="d-inline-block cursor-pointer"
          height="100px"
          width="200px"
        ></v-img>
      </div>
    </div>
    <template v-slot:append>
      <!--  NAVIGATION -->
      <!-- Client only is need to avoid a bug. temporary workaround until it is fixes: https://github.com/vuetifyjs/vuetify/issues/15323 -->
      <template v-if="smAndUp">
        <template v-for="(link, index) in config.sitemap.main" :key="index">
          <v-menu :open-on-hover="link.openOnHover" v-if="link.dropdown">
            <template v-slot:activator="{ props }">
              <v-btn
                variant="flat"
                v-bind="props"
                class="h-100"
                :class="{ 'v-btn--active': isDropdownActive(link) }"
                >{{ $t(link.text, 2) }}
                <v-icon size="x-large" right>{{
                  props["aria-expanded"] === "true"
                    ? "mdi-chevron-down"
                    : "mdi-chevron-up"
                }}</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                :active="$route.fullPath === localePath(child.path)"
                :to="localePath(child.path)"
                v-for="(child, index) in link.children"
                :key="index"
              >
                <v-list-item-title>{{
                  capitalize($t(child.text, 2))
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn
            variant="flat"
            :to="link.path ? localePath(link.path) : false"
            exact
            class="h-100"
            v-else
            >{{ capitalize($t(link.text, 2)) }}
          </v-btn>
        </template>
        <v-divider vertical></v-divider>
        <!--  LANGUAGE SWITCHER -->
        <NavigationLanguageSwitcher />
        <v-divider vertical></v-divider>
        <NavigationGlobalSearch />
      </template>
      <NavigationMainMenu v-else />
    </template>
  </v-app-bar>
</template>
<script setup>
import { useDisplay } from "vuetify"
const config = useAppConfig()
const localePath = useLocalePath()
const router = useRouter()
const route = useRoute()
const { smAndUp, mdAndUp } = useDisplay()

// Function to check if current route is a child of a dropdown menu
const isDropdownActive = (link) => {
  if (!link.dropdown || !link.children) return false

  return link.children.some((child) => {
    const childPath = localePath(child.path)
    return route.fullPath === childPath
  })
}
</script>
