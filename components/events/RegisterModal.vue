<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        variant="outlined"
        tile
        v-bind="activatorProps"
        size="small"
        prepend-icon="mdi-circle-medium"
      >
        <template v-slot:prepend>
          <v-icon size="large" color="success"></v-icon>
        </template>
        <div class="text-wrap">
          {{ $t("register-until-0", [getLocalizedDate(item.stop)]) }}
        </div>
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

<script setup>
const props = defineProps({
  item: { type: Object, required: true },
})
</script>
