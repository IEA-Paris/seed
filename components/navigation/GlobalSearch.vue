<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" fullscreen>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        size="x-large"
        variant="flat"
        class="h-100"
        v-bind="activatorProps"
      >
        <v-icon>mdi-magnify</v-icon></v-btn
      >
    </template>

    <v-card>
      <v-row>
        <div class="d-flex flex-column flex-grow-1">
          <div class="d-flex align-start">
            <v-img
              class="ma-6"
              src="/icon.png"
              contain
              max-height="70"
              max-width="70"
              style="cursor: pointer"
            ></v-img>
            <v-spacer></v-spacer>
            <v-btn
              size="x-large"
              variant="flat"
              @click="dialog = false"
style="width:92px; height:64px"
class="d-flex align-center justify-center pt-6 pr-12"
            >
            <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="12" sm="10" md="6" lg="4">
          <list-atoms-search-input
            type="all"
            class="mt-n16"
          ></list-atoms-search-input>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
const dialog = ref(false)
</script>

<style lang="scss" scoped></style>
