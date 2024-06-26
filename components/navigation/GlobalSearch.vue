<template>
  <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        size="x-large"
        variant="flat"
        class="h-100"
        v-bind="activatorProps"
        style="min-width: 52px"
      >
        <v-icon>mdi-magnify</v-icon></v-btn
      >
    </template>

    <v-card> </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
const dialog = ref(false)
</script>

<style lang="scss" scoped></style>
