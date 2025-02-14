<template>
  <v-app>
    <NavigationTopBar />
    <v-main>
      <!-- <NavigationBreadcrumbs></NavigationBreadcrumbs> -->
      <!--     <v-btn color="success" @click="rootStore.setLoading(!rootStore.loading)"
        >ext</v-btn
      > -->
      <v-container class="main-container">
        <slot />
      </v-container>
      <!--   <section v-if="isSnapRoutes()" style="background-color:black">
        <NavigationFooter></NavigationFooter>
      </section> -->
      <NavigationFooter />
    </v-main>
  </v-app>
</template>

<script setup>
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
</script>
<style lang="scss" scoped></style>
