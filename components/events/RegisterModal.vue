<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        color="grey-lighten-3"
        flat
        rounded="0"
        size="small"
        v-bind="activatorProps"
        class="my-2"
      >
        <template v-slot:append>
          <v-icon class="text-green" size="x-large"> mdi-circle-medium</v-icon>
        </template>
        {{ $t("inscription-ouverte") }}
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card :title="$t('events.register')">
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn :text="$t('cancel')" @click="isActive.value = false"></v-btn>
          <v-btn
            :text="$t('events.register-me')"
            @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
