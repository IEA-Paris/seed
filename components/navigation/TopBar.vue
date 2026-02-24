<template>
  <!-- TOP BAR CONTAINER -->
  <v-app-bar flat class="top-bar" :class="{ 'splash-topbar': isIndex }">
    <!--  WEBSITE LOGO -->
    <div
      v-ripple
      class="px-4 d-flex align-center"
      @click="router.push(localePath('/'))"
    >
      <NavigationLogo></NavigationLogo>
      <div class="top-bar__logo-text d-flex align-start pl-3">
        <v-img
          src="/logo_text.png"
          alt="Paris IAS"
          class="d-inline-block cursor-pointer"
          height="100px"
          width="200px"
        ></v-img>
      </div>
    </div>
    <template #append>
      <!--  DESKTOP NAVIGATION — hidden below sm via CSS -->
      <div class="top-bar__desktop-nav">
        <template v-for="(link, index) in config.sitemap.main" :key="index">
          <v-menu v-if="link.dropdown" :open-on-hover="link.openOnHover">
            <template #activator="{ props }">
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
                v-for="(child, index) in link.children"
                :key="index"
                :active="$route.fullPath === localePath(child.path)"
                :to="localePath(child.path)"
              >
                <v-list-item-title>{{
                  capitalize($t(child.text, 2))
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn
            v-else
            variant="flat"
            :to="link.path ? localePath(link.path) : false"
            exact
            class="h-100"
            >{{ capitalize($t(link.text, 2)) }}
          </v-btn>
        </template>
        <v-divider vertical></v-divider>
        <!--  LANGUAGE SWITCHER -->
        <NavigationLanguageSwitcher />
        <v-divider vertical></v-divider>
        <v-btn
          size="x-large"
          variant="flat"
          class="h-100"
          @click="$router.push(localePath('/search'))"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </div>
      <!--  MOBILE HAMBURGER — hidden above sm via CSS -->
      <div class="top-bar__mobile-nav">
        <NavigationMainMenu />
      </div>
    </template>
  </v-app-bar>
  <v-divider color="#e4e4e4" :class="isIndex ? 'topbar-divider--splash' : 'topbar-divider'"></v-divider>
</template>
<script setup>
const config = useAppConfig()
const localePath = useLocalePath()
const router = useRouter()
const route = useRoute()

const isIndex = computed(() => route.name?.toString().startsWith("index"))

const isDropdownActive = (link) => {
  if (!link.dropdown || !link.children) return false
  return link.children.some((child) => route.fullPath === localePath(child.path))
}
</script>
<style scoped>
.top-bar {
  border-bottom: rgba(0, 0, 0, 0.87) solid 1px;
  border-width: 0 thin 0 0;
}

/* Logo text: hidden on mobile, visible on md+ */
.top-bar__logo-text {
  display: none;
}
@media (min-width: 960px) {
  .top-bar__logo-text {
    display: flex;
  }
}

/* Desktop nav: hidden on mobile, visible on sm+ */
.top-bar__desktop-nav {
  display: none;
  align-items: center;
  height: 100%;
}
@media (min-width: 600px) {
  .top-bar__desktop-nav {
    display: flex;
  }
}

/* Mobile nav: visible on mobile, hidden on sm+ */
.top-bar__mobile-nav {
  display: flex;
}
@media (min-width: 600px) {
  .top-bar__mobile-nav {
    display: none;
  }
}
</style>
