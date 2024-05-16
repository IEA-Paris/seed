<script setup></script>

<template>
  <v-app>
    <NavigationTopBar />
    <v-main>
      <v-container>
        <template v-slot:prepend>
          <v-btn to="/" size="small" variant="text" icon="mdi-home"></v-btn>
          /
        </template>
        <v-divider></v-divider>
      </v-container>
      <slot />
      <NavigationFooter />
    </v-main>
  </v-app>
</template>
