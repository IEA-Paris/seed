<template>
  <v-menu>
    <template v-slot:activator="{ props: menu }">
      <v-tooltip location="top">
        <template v-slot:activator="{ props: tooltip }">
          <v-btn
            x-large
            tile
            flat
            icon
            :class="{
              'mt-3': isXsDisplay,
            }"
            v-bind="mergeProps(menu, tooltip)"
          >
            <v-icon>mdi-{{ current?.icon || defaultView?.icon }}</v-icon>
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
      <template v-for="(item, index) in items">
        <v-list-item
          v-if="item.name !== current.name"
          :key="index"
          @click="updateView(item.name)"
        >
          <template v-slot:prepend>
            <v-icon>mdi-{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ $t("list." + item.name) }}</v-list-item-title>
        </v-list-item></template
      >
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
  console.log('value: ', value);
  await rootStore.updateView({ value, type: props.type })
}

onMounted(() => {
  // Add any logic needed on component mount
})
</script>

<style lang="scss"></style>
