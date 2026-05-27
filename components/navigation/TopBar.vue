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
            <div class="megamenu megamenu--single">
              <div class="megamenu__column">
                <v-list density="compact" class="megamenu__list">
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
              </div>
            </div>
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
  padding: 20px 8px;
  gap: 0;
  min-width: 560px;
  max-width: min(880px, 92vw);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
  border-top: 2px solid #000;
}

/* Variant for the simple (non-mega) dropdown: narrower, single column. */
.megamenu--single {
  min-width: 240px;
  max-width: 320px;
}

.megamenu__column {
  flex: 1 1 0;
  min-width: 0;
  padding: 0 16px;
}

.megamenu__column + .megamenu__column {
  border-left: 1px solid rgba(0, 0, 0, 0.08);
}

.megamenu__column-header {
  display: block;
  font-size: 0.78rem !important;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.85);
  padding: 4px 16px 12px 16px;
  line-height: 1.4;
  white-space: normal;
  overflow: visible;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  margin-bottom: 6px;
}

.megamenu__column-header--link {
  color: rgba(0, 0, 0, 0.85);
  text-decoration: none;
  cursor: pointer;
  transition:
    color 0.2s ease,
    border-color 0.2s ease;
  position: relative;
}

.megamenu__column-header--link::after {
  content: "›";
  margin-left: 6px;
  display: inline-block;
  transform: translateX(0);
  transition: transform 0.2s ease;
  color: rgba(0, 0, 0, 0.4);
}

.megamenu__column-header--link:hover {
  color: #000;
}

.megamenu__column-header--link:hover::after {
  transform: translateX(3px);
  color: #000;
}

/* Allow long labels (e.g. "Ethics and Professional Conduct Committee") to wrap
   at word boundaries instead of being truncated with an ellipsis. */
.megamenu__list :deep(.v-list-item-title) {
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
  line-height: 1.35;
  word-break: normal;
  overflow-wrap: normal;
  hyphens: manual;
}

.megamenu__list :deep(.v-list-item--active) {
  color: #000;
  background: rgba(0, 0, 0, 0.06);
}

.megamenu__list :deep(.v-list-item--active .v-list-item-title) {
  font-weight: 600;
}
</style>
