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

        <v-row class="ml-2 mt-6" :no-gutters="xs">
          <v-col cols="12" md="4" :order="smAndDown ? 'last' : 'first'">
            <!-- SMALL PAGES LINKS (FOOTER) -->
            <div :class="{ 'ml-6': mdAndUp }">
              <v-divider style="border-color: white"></v-divider>
              <v-list dark color="black" bg-color="transparent">
                <v-list-item
                  v-for="(item, i) in config.sitemap.footer"
                  :key="item.text + i"
                  @click="isActive.value = false"
                >
                  <nuxt-link :to="localePath(item.path)" class="no-decoration"
                    ><v-list-item-title
                      class="text-uppercase"
                      v-text="$t(item.text)"
                    ></v-list-item-title
                  ></nuxt-link>

                  <v-divider
                    v-if="i < config.sitemap.footer.length - 1"
                  ></v-divider>
                </v-list-item>
              </v-list>
            </div>
          </v-col>

          <!-- MAIN MENU -->
          <v-col cols="12" md="4">
            <v-divider style="border-color: white"></v-divider>
            <v-list dark bg-color="transparent">
              <template v-for="(item, index) in config.sitemap.main">
                <v-list-group
                  v-if="item.children && item.children.length"
                  :value="$t(item.text)"
                >
                  <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" class="">
                      <v-list-item-title
                        class="text-uppercase text-button font-weight-bold"
                        v-text="$t(item.text)"
                      ></v-list-item-title
                    ></v-list-item>
                  </template>

                  <v-list-item
                    v-for="(child, i) in item.children"
                    :key="child.text + i"
                    :value="$t(child.text)"
                  >
                    <nuxt-link
                      :to="localePath(child.path)"
                      class="no-decoration"
                      ><v-list-item-title
                        class="text-uppercase text-button"
                        v-text="$t(child.text)"
                      ></v-list-item-title
                    ></nuxt-link>
                  </v-list-item>
                </v-list-group>
                <v-list-item
                  v-else
                  :key="item.text + index"
                  @click="isActive.value = false"
                >
                  <nuxt-link :to="localePath(item.path)" class="no-decoration">
                    <v-list-item-title
                      class="text-uppercase text-button font-weight-bold"
                      v-text="$t(item.text)"
                    >
                    </v-list-item-title>
                  </nuxt-link>
                </v-list-item>
                <v-divider
                  v-if="index < config.sitemap.main.length - 1"
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
</script>
<style scoped>
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
