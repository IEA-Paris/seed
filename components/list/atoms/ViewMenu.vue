<template>
  <v-menu>
    <template v-slot:activator="{ props: menu }">
      <v-tooltip location="top">
        <template v-slot:activator="{ props: tooltip }">
          <v-btn
            x-large
            tile
            flat
            :icon="'mdi-' + current?.icon || defaultView?.icon"
            :class="{
              'mt-3': isXsDisplay,
            }"
            v-bind="mergeProps(menu, tooltip)"
          >
          </v-btn>
        </template>
        <div
          v-html="
            $t('list.view-mode') +
            $t('list.' + current.name || defaultView.name)
          "
        ></div>
      </v-tooltip>
    </template>
    <v-list density="compact">
      <v-list-item
        v-for="(value, key, index) in items"
        :key="index"
        @click="updateView(value.name || key)"
      >
        <template v-slot:prepend>
          <v-icon>mdi-{{ value.icon }}</v-icon>
        </template>
        <v-list-item-title>{{
          $t("list." + (value.name || key))
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { useRootStore } from "~/store/root"
import { mergeProps } from "vue"
import { useDisplay } from "vuetify"
const {
  name: nameDisplay,
  xs: isXsDisplay,
  mobile: isMobileDisplay,
  smAndUp,
  lgAndUp,
  smAndDown,
} = useDisplay()

const rootStore = useRootStore()

const props = defineProps({
  type: {
    type: String,
    default: "articles",
    required: true,
  },
})
const items = ref(rootStore[props.type].list.views)

const current = ref(rootStore[props.type].list.view)

const updateView = async (value) => {
  await rootStore.updateView({ value, type: props.type })
}

onMounted(() => {
  // Add any logic needed on component mount
})
</script>

<style lang="scss"></style>
