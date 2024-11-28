<template>
  <v-app-bar-nav-icon>
    <nuxt-link :to="localePath('/')" :class="{ scrolled: rootStore.scrolled }">
      <v-img
        contain
        height="50"
        width="50"
        fit="contain"
        format="webp"
        preload
        :src="dark ? appConfig.logo.dark : appConfig.logo.light"
      ></v-img> </nuxt-link
  ></v-app-bar-nav-icon>
</template>
<script setup lang="ts">
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const appConfig = useAppConfig()
const localePath = useLocalePath()

const props = defineProps({
  dark: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>
<style lang="scss">
.logo:link,
.logo:visited,
.logo:hover,
.logo:active,
.logo {
  transition: all 0.5s ease;
  transform-origin: left top;
  margin-left: 40px;
  margin-bottom: 25px;
  line-height: 6rem;
  color: var(--color);
  text-decoration: none;
  /*   margin-top: 1.4rem;
  margin-bottom: 1.2rem; */
  margin-left: 2.4rem;
  max-height: 150px;
  max-width: 150px;
}
.scrolled .logo {
  max-height: 50px;
  max-width: 50px;
}
</style>
