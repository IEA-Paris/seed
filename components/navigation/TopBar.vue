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
      <!--
        Off-screen keyboard navigation. Lives in the topbar's natural focus
        position so Tab follows the explicit `order` declared in
        static.config.ts (sitemap), traversing every linkable destination
        (main + footer pages with an `order` field) in the same sequence
        used by the mobile menu. The visible megamenu/dropdown activators
        below are made `tabindex="-1"` so keyboard focus flows exclusively
        through this list.
      -->
      <nav :aria-label="$t('main-navigation')" class="top-bar__a11y-nav">
        <NuxtLink
          v-for="link in tabOrderLinks"
          :key="link.path"
          :to="localePath(link.path)"
        >
          {{ capitalize($t(link.text, 2)) }}
        </NuxtLink>
      </nav>
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
                tabindex="-1"
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
                  :tabindex="col.path ? -1 : undefined"
                  class="megamenu__column-header text-overline"
                  :class="col.path ? 'megamenu__column-header--link' : ''"
                >
                  {{ capitalize($t(col.text, 2)) }}
                </component>
                <v-list density="compact" class="megamenu__list">
                  <v-list-item
                    v-for="(grandchild, gcIndex) in col.children"
                    :key="gcIndex"
                    tabindex="-1"
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
                tabindex="-1"
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
                    tabindex="-1"
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
            tabindex="-1"
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
        <!--
          Splash uses a large hero search input, so the topbar search stays a
          compact icon there to avoid duplication. Other pages get an inline
          expanding input.
        -->
        <div
          class="top-bar__search"
          :class="{ 'top-bar__search--expanded': searchExpanded && !isIndex }"
        >
          <v-text-field
            v-if="searchExpanded && !isIndex"
            ref="searchInputRef"
            v-model.trim="searchTerm"
            :placeholder="$t('search')"
            single-line
            hide-details
            tile
            variant="outlined"
            density="compact"
            class="top-bar__search-input"
            @keyup.enter="submitSearch"
            @keyup.escape="collapseSearch"
            @blur="onSearchBlur"
          />
          <v-btn
            size="x-large"
            variant="flat"
            class="h-100"
            :aria-label="$t('search')"
            @click="onSearchButton"
          >
            <v-icon>mdi-magnify</v-icon>
            <kbd v-if="!isIndex && !searchExpanded" class="top-bar__kbd">
              {{ isMac ? "⌘K" : "Ctrl+K" }}
            </kbd>
          </v-btn>
        </div>
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

const tabOrderLinks = useNavTabOrder()

// Inline expanding search (only used outside the index page; the splash hero
// already exposes a large search input, so duplicating it in the topbar would
// just dilute the primary signal).
const searchExpanded = ref(false)
const searchTerm = ref("")
const searchInputRef = ref(null)
const isMac = computed(
  () =>
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad/.test(navigator.platform),
)

const focusSearch = async () => {
  await nextTick()
  const input = searchInputRef.value?.$el?.querySelector?.("input") ?? null
  input?.focus()
}

const expandSearch = () => {
  searchExpanded.value = true
  focusSearch()
}

const collapseSearch = () => {
  searchExpanded.value = false
  searchTerm.value = ""
}

const onSearchBlur = () => {
  // Collapse on blur if the user didn't type anything; otherwise keep the
  // input visible so they can still hit Enter.
  if (!searchTerm.value) collapseSearch()
}

const submitSearch = () => {
  const term = searchTerm.value.trim()
  router.push({
    path: localePath("/search"),
    query: term ? { search: term } : {},
  })
  collapseSearch()
}

const onSearchButton = () => {
  // On the splash, the magnifier just navigates to /search (the splash hero
  // already provides a prominent search input).
  if (isIndex.value) {
    router.push(localePath("/search"))
    return
  }
  if (searchExpanded.value) {
    submitSearch()
  } else {
    expandSearch()
  }
}

useSearchShortcut(() => {
  // On any page, the keyboard shortcut takes the user straight to the search
  // page so they get the full results UI without typing in a cramped topbar.
  router.push(localePath("/search"))
})

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

/* Off-screen keyboard navigation. Items are focusable and announced by
 * screen readers but visually hidden. When any item receives focus we reveal
 * it so sighted keyboard users can see where they are. */
.top-bar__a11y-nav {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
}

.top-bar__a11y-nav a {
  display: inline-block;
}

.top-bar__a11y-nav a:focus-visible {
  position: fixed;
  top: 72px;
  left: 16px;
  z-index: 9999;
  width: auto;
  height: auto;
  padding: 8px 16px;
  background: #fff;
  color: #000;
  border: 2px solid #000;
  clip: auto;
  clip-path: none;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* Inline expanding search in the topbar (non-splash pages). */
.top-bar__search {
  display: flex;
  align-items: center;
  height: 100%;
}

.top-bar__search-input {
  width: 220px;
  margin-right: 4px;
}

/* Keyboard hint badge ⌘K / Ctrl+K — only shown when the input is collapsed. */
.top-bar__kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  padding: 2px 6px;
  border: 1px solid rgba(0, 0, 0, 0.18);
  border-radius: 4px;
  font-size: 0.7rem;
  font-family: inherit;
  color: rgba(0, 0, 0, 0.55);
  background: rgba(0, 0, 0, 0.02);
  line-height: 1;
}

/* Compact the kbd hint away on narrower viewports where horizontal space is tight. */
@media (max-width: 1199px) {
  .top-bar__kbd {
    display: none;
  }
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
