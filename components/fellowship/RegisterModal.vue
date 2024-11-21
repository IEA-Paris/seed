<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        :variant="view ? 'outlined' : 'text'"
        class="text-overline"
      >
        {{
          $t("register-until-0", [getLocalizedDate(item.applicationStop)])
        }}</v-btn
      >
    </template>

    <template v-slot:default="{ isActive }">
      <v-card :title="$t('fellowship-register')">
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
import { useAttrs } from "vue"
const attrs = useAttrs()
const props = defineProps({
  item: { type: Object, required: true },
  view: { type: Boolean, required: false, default: false },
})
</script>
