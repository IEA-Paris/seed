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
          :src="
            $i18n.locale === 'en' ? '/logo_text_en.svg' : '/logo_text_fr.svg'
          "
          alt="Paris IAS"
          class="d-inline-block cursor-pointer"
          height="64px"
          :width="$i18n.locale === 'en' ? '230px' : '200px'"
        ></v-img>
      </div>
    </div>
    <template #append>
      <!--  DESKTOP NAVIGATION — hidden below sm via CSS -->
      <div class="top-bar__desktop-nav">
        <template v-for="(link, index) in config.sitemap.main" :key="index">
          <!-- Megamenu: dropdown with 3-level depth -->
          <v-menu
            v-if="link.dropdown && isMegamenu(link)"
            :open-on-hover="link.openOnHover"
            :close-on-content-click="true"
          >
            <template #activator="{ props }">
              <v-btn
                variant="flat"
                v-bind="props"
                class="h-100"
                :class="{ 'v-btn--active': isDropdownActive(link) }"
                >{{ $t(link.text, 2) }}
                <v-icon size="x-large" right>{{
                  props["aria-expanded"] === "true"
                    ? "mdi-chevron-up"
                    : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </template>
            <div class="megamenu">
              <div
                v-for="(col, colIndex) in link.children"
                :key="colIndex"
                class="megamenu__column"
              >
                <!-- Column header: ghost link if path exists, plain overline otherwise -->
                <component
                  :is="col.path ? 'router-link' : 'span'"
                  :to="col.path ? localePath(col.path) : undefined"
                  class="megamenu__column-header text-overline"
                  :class="col.path ? 'megamenu__column-header--link' : ''"
                >
                  {{ capitalize($t(col.text, 2)) }}
                </component>
                <v-list density="compact" class="megamenu__list">
                  <v-list-item
                    v-for="(grandchild, gcIndex) in col.children"
                    :key="gcIndex"
                    :active="$route.fullPath === localePath(grandchild.path)"
                    :to="localePath(grandchild.path)"
                  >
                    <v-list-item-title>{{
                      capitalize($t(grandchild.text, 2))
                    }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </div>
            </div>
          </v-menu>
          <!-- Standard dropdown: 2-level depth -->
          <v-menu v-else-if="link.dropdown" :open-on-hover="link.openOnHover">
            <template #activator="{ props }">
              <v-btn
                variant="flat"
                v-bind="props"
                class="h-100"
                :class="{ 'v-btn--active': isDropdownActive(link) }"
                >{{ $t(link.text, 2) }}
                <v-icon size="x-large" right>{{
                  props["aria-expanded"] === "true"
                    ? "mdi-chevron-up"
                    : "mdi-chevron-down"
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
  <v-divider
    color="#e4e4e4"
    :class="isIndex ? 'topbar-divider--splash' : 'topbar-divider'"
  ></v-divider>
</template>
<script setup>
const config = useAppConfig()
const localePath = useLocalePath()
const router = useRouter()
const route = useRoute()

const isIndex = computed(() => route.name?.toString().startsWith("index"))

const isMegamenu = (link) => {
  return link.children?.some((child) => child.children?.length > 0)
}

const isDropdownActive = (link) => {
  if (!link.dropdown || !link.children) return false
  return link.children.some((child) => {
    if (child.path && route.fullPath === localePath(child.path)) return true
    if (child.children) {
      return child.children.some(
        (grandchild) => route.fullPath === localePath(grandchild.path),
      )
    }
    return false
  })
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

/* Desktop nav: hidden below 1060px */
.top-bar__desktop-nav {
  display: none;
  align-items: center;
  height: 100%;
}
@media (min-width: 1060px) {
  .top-bar__desktop-nav {
    display: flex;
  }
}

/* Mobile nav: visible below 1060px */
.top-bar__mobile-nav {
  display: flex;
}
@media (min-width: 1060px) {
  .top-bar__mobile-nav {
    display: none;
  }
}

/* Megamenu */
.megamenu {
  display: flex;
  flex-direction: row;
  background: rgb(var(--v-theme-surface));
  padding: 16px;
  gap: 8px;
  min-width: 560px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.megamenu__column {
  flex: 1 1 auto;
  min-width: 0;
}

.megamenu__column-header {
  display: block;
  font-size: 0.7rem !important;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(var(--v-theme-on-surface), 0.6);
  padding: 4px 16px 4px 16px;
  line-height: 1.4;
  white-space: normal;
  overflow: visible;
}

.megamenu__column-header--link {
  color: rgba(var(--v-theme-on-surface), 0.6);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;
}

.megamenu__column-header--link:hover {
  color: rgba(var(--v-theme-primary), 1);
}
</style>
