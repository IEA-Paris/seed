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
        <v-app-bar
          color="transparent"
          clipped
          flat
          density="prominent"
          hide-on-scroll
          height="140"
        >
          <div class="d-flex flex-column flex-grow-1">
            <div class="d-flex flex-grow-1 align-start">
              <!-- <v-img
                class="mr-2 mt-4 logo-container-white"
                src="/logo.png"
                contain
                max-height="120"
                max-width="120"
                style="cursor: pointer"
              ></v-img> -->
              <v-spacer></v-spacer>
              <v-btn
                variant="flat"
                size="x-large"
                class="ma-2 mr-2 mb-4"
                tile
                @click="isActive.value = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </div>
        </v-app-bar>
        <v-row class="ml-2 mt-6">
          <v-col cols="12" md="4" :order="smAndDown ? 'last' : 'first'">
            <!-- SMALL PAGES LINKS (FOOTER) -->
            <div :class="{ 'ml-6': mdAndUp }">
              <v-divider style="border-color: white"></v-divider>
              <v-list dark color="black" bg-color="transparent">
                <v-list-item
                  v-for="(item, i) in config.sitemap.footer"
                  :key="item.text + i"
                  :href="item.path"
                  @click="isActive.value = false"
                >
                  <v-list-item-title
                    class="text-uppercase text-button mb-6"
                    v-text="$t(item.text)"
                  ></v-list-item-title>
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
            <v-list dark bg-color="transparent" color="black">
              <template v-for="(item, index) in config.sitemap.main">
                <v-list-group
                  v-if="item.children && item.children.length"
                  :value="{ props }"
                >
                  <template v-slot:activator="{ props }">
                    <v-list-item
                      class="text-uppercase text-button mb-6"
                      v-bind="props"
                    >
                      <v-list-item-title
                        class="text-uppercase text-button mb-6"
                        v-text="$t(item.text)"
                      ></v-list-item-title>
                    </v-list-item>
                  </template>
                  <v-list-item
                    v-for="(child, i) in item.children"
                    :key="child.text + i"
                    :title="$t(child.text)"
                    :value="child.text"
                  ></v-list-item>
                </v-list-group>
                <v-list-item
                  :key="item.text + index"
                  v-else
                  :href="item.path"
                  @click="isActive.value = false"
                >
                  <v-list-item-title
                    class="text-uppercase text-button mb-6"
                    v-text="$t(item.text)"
                  >
                  </v-list-item-title>
                  <v-divider
                    v-if="index < config.sitemap.main.length - 1"
                  ></v-divider>
                </v-list-item>
              </template>
            </v-list>
          </v-col>

          <!-- SOCIAL ICONS -->
          <v-col cols="12" md="4" order="last">
            <v-divider></v-divider>
            <div class="overline ma-3">{{ $t("follow-us") }}</div>
            <MiscAtomsSocials
              dark
              :socials="config.socials"
              labelled
            ></MiscAtomsSocials>
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
const { smAndDown, mdAndUp } = useDisplay()
</script>
<style scoped>
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
