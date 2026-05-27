<template>
  <v-dialog fullscreen hide-overlay transition="none">
    <!-- ACTIVATOR BTN -->
    <template #activator="{ props }">
      <v-btn v-bind="props" variant="flat" size="x-large" tile icon="mdi-menu">
      </v-btn>
    </template>
    <!-- APP BAR WITH LOGO -->
    <template #default="{ isActive }">
      <v-card dark color="black">
        <div class="d-flex">
          <NavigationLogo dark class="mt-3 ml-2"></NavigationLogo>

          <v-spacer></v-spacer>
          <v-btn
            color="black"
            class="h-100 mr-1"
            tile
            @click="isActive.value = false"
          >
            <v-icon size="x-large">mdi-close</v-icon>
          </v-btn>
        </div>

        <!--
          Off-screen flat tab list. Mirrors the desktop topbar: keyboard
          users tab through every linkable page in the order declared by
          `order` in static.config.ts (sitemap). The visible collapsible
          groups below remain for mouse/touch users; their interactive
          elements are removed from the tab flow.
        -->
        <nav
          :aria-label="$t('main-navigation')"
          class="main-menu__a11y-nav"
        >
          <nuxt-link
            v-for="link in tabOrderLinks"
            :key="link.path"
            :to="$localePath(link.path)"
            @click="isActive.value = false"
          >
            {{ $t(link.text, 2) }}
          </nuxt-link>
        </nav>

        <v-row class="ml-2 mt-6" :no-gutters="xs">
          <v-col
            cols="12"
            md="4"
            :order="smAndDown ? 'last' : 'first'"
            aria-hidden="true"
          >
            <!-- SMALL PAGES LINKS (FOOTER) -->
            <div :class="{ 'ml-6': mdAndUp }">
              <v-divider style="border-color: white"></v-divider>
              <v-list dark color="black" bg-color="transparent">
                <v-list-item
                  v-for="(item, i) in config.sitemap.footer"
                  :key="item.text + i"
                  tabindex="-1"
                  @click="isActive.value = false"
                >
                  <nuxt-link
                    :to="$localePath(item.path)"
                    tabindex="-1"
                    class="no-decoration"
                    ><v-list-item-title class="text-uppercase">
                      {{ $t(item.text, 2) }}</v-list-item-title
                    ></nuxt-link
                  >

                  <v-divider
                    v-if="i < config.sitemap.footer.length - 1"
                  ></v-divider>
                </v-list-item>
              </v-list>
            </div>
          </v-col>

          <!--
            Visible collapsible groups. aria-hidden so screen readers don't
            announce the duplicate content, and every focusable descendant
            gets tabindex=-1 so keyboard focus stays in the off-screen nav
            above. Mouse / touch users still interact normally.
          -->
          <v-col cols="12" md="4" aria-hidden="true">
            <v-divider style="border-color: white"></v-divider>
            <v-list dark bg-color="transparent">
              <template v-for="(item, index) in config.sitemap.main">
                <v-list-group
                  v-if="item.children && item.children.length"
                  :key="item.text"
                  :value="$t(item.text, 2)"
                >
                  <template #activator="{ props }">
                    <v-list-item v-bind="props" tabindex="-1" class="">
                      <v-list-item-title
                        class="text-uppercase text-button font-weight-bold"
                        >{{ $t(item.text, 2) }}</v-list-item-title
                      ></v-list-item
                    >
                  </template>

                  <template
                    v-for="(child, i) in item.children"
                    :key="child.text + i"
                  >
                    <!-- Level 2 with grandchildren: nested group -->
                    <v-list-group
                      v-if="child.children && child.children.length"
                      :value="$t(child.text)"
                    >
                      <template #activator="{ props }">
                        <v-list-item v-bind="props" tabindex="-1">
                          <nuxt-link
                            v-if="child.path"
                            :to="$localePath(child.path)"
                            tabindex="-1"
                            class="no-decoration"
                          >
                            <v-list-item-title
                              class="text-uppercase text-button"
                              >{{ $t(child.text) }}</v-list-item-title
                            >
                          </nuxt-link>
                          <v-list-item-title
                            v-else
                            class="text-uppercase text-button"
                            >{{ $t(child.text) }}</v-list-item-title
                          >
                        </v-list-item>
                      </template>
                      <v-list-item
                        v-for="(grandchild, j) in child.children"
                        :key="grandchild.text + j"
                        :value="$t(grandchild.text)"
                        tabindex="-1"
                        @click="isActive.value = false"
                      >
                        <nuxt-link
                          :to="$localePath(grandchild.path)"
                          tabindex="-1"
                          class="no-decoration"
                        >
                          <v-list-item-title
                            class="text-uppercase text-button"
                            >{{ $t(grandchild.text) }}</v-list-item-title
                          >
                        </nuxt-link>
                      </v-list-item>
                    </v-list-group>
                    <!-- Level 2 without grandchildren: plain item -->
                    <v-list-item
                      v-else
                      :value="$t(child.text)"
                      tabindex="-1"
                      @click="isActive.value = false"
                    >
                      <nuxt-link
                        :to="$localePath(child.path)"
                        tabindex="-1"
                        class="no-decoration"
                      >
                        <v-list-item-title class="text-uppercase text-button">{{
                          $t(child.text)
                        }}</v-list-item-title>
                      </nuxt-link>
                    </v-list-item>
                  </template>
                </v-list-group>
                <v-list-item
                  v-else
                  :key="item.text + index"
                  tabindex="-1"
                  @click="isActive.value = false"
                >
                  <nuxt-link
                    :to="$localePath(item.path)"
                    tabindex="-1"
                    class="no-decoration"
                  >
                    <v-list-item-title
                      class="text-uppercase text-button font-weight-bold"
                    >
                      {{ $t(item.text, 2) }}
                    </v-list-item-title>
                  </nuxt-link>
                </v-list-item>
                <v-divider
                  v-if="index < config.sitemap.main.length - 1"
                  :key="item.text"
                ></v-divider>
              </template>
            </v-list>
          </v-col>

          <!-- SOCIAL ICONS -->
          <v-col cols="12" md="4" order="last">
            <v-divider></v-divider>
            <div class="overline ma-3">{{ $t("follow-us") }}</div>
            <MiscAtomsSocials dark :socials="config.socials"></MiscAtomsSocials>
          </v-col>
        </v-row>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup>
import { useDisplay } from "vuetify"
// import sitemap from "~/assets/data/sitemap"
// import socials from "~/assets/data/social"
const config = useAppConfig()
const { xs, smAndDown, mdAndUp } = useDisplay()

const tabOrderLinks = useNavTabOrder()
</script>
<style scoped>
/* Off-screen keyboard navigation inside the mobile menu dialog. Focusable
 * by Tab in the order declared by `order` in static.config.ts. A focused
 * item becomes visible at the top of the dialog so sighted keyboard users
 * can see where they are. */
.main-menu__a11y-nav {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
}

.main-menu__a11y-nav a {
  display: inline-block;
}

.main-menu__a11y-nav a:focus-visible {
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

.no-decoration {
  text-decoration: none;
  color: inherit;
}
.v-app-bar--is-scrolled .menu-logo-text {
  position: relative;
  max-width: 150px !important;
  height: auto !important;
  transition-delay: 1s;
  -webkit-transform: translateZ(0);
  transform: scale(0.9);
  margin-left: 40px;
  margin-bottom: 15px;
}
.menu {
  margin-top: 15px;
}
.v-app-bar--is-scrolled .menu {
  margin-top: 5px;
}
.menu-logo-text,
.menu-logo-text:link,
.menu-logo-text:visited,
.menu-logo-text:hover,
.menu-logo-text:active,
.menu-logo-text {
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-property: color, background, text-shadow;
  transition: all 0.5s ease;
  transform-origin: left top;
  max-width: 600px !important;
  width: 100%;
  margin-left: 40px;
  margin-bottom: 25px;
  line-height: 6rem;
  color: white;
  text-decoration: none;
  margin-top: 1rem;
  margin-bottom: 1.8rem;
  margin-left: 2.4rem;
}
.logo-container-white {
  border: 4px white solid;
}
.menu-logo-1 {
  font-size: 6rem;
  font-weight: 700;
  font-family: "Bodoni Moda";
  letter-spacing: 0.2px;
}
.menu-logo-2 {
  font-size: 6.3rem;
  font-family: "Roboto";
  font-weight: 100;
}
.v-app-bar--is-scrolled .menu-logo-text {
  line-height: 3rem;
  color: white;
  text-decoration: none;
  margin-top: 0.6rem;
  margin-bottom: 1.2rem;
}
.v-app-bar--is-scrolled .menu-logo-1 {
  font-size: 3rem !important;
  font-weight: 700;
  font-family: "Bodoni Moda";
  letter-spacing: 0.2px;
}
.v-app-bar--is-scrolled .menu-logo-2 {
  font-size: 3.2rem !important;
  font-family: "Roboto";
  font-weight: 100;
}
</style>
