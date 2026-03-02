<template>
  <v-container style="max-width: 1200px">
    <div class="d-flex justify-center mb-6">
      <h2 class="text-center">{{ capitalize($t("search")) }}</h2>
    </div>
    <ListOrganismsResults />
  </v-container>
</template>
<script setup lang="ts"></script>
<style lang="scss"></style>
