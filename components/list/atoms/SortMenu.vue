<template>
  <v-menu>
    <template v-slot:activator="{ props: menu }">
      <v-tooltip location="top">
        <template v-slot:activator="{ props: tooltip }">
          <v-btn
            x-large
            outlined
            tile
            flat
            icon
            :class="{
              'mt-3': isXsDisplay,
            }"
            v-bind="mergeProps(menu, tooltip)"
          >
            <v-icon>mdi-{{ current?.icon || defaultSort?.icon }}</v-icon>
          </v-btn>
        </template>
        <span
          v-html="
            $t('list.sort-mode') +
            $t('list.' + current.text || defaultSort.text)
          "
        ></span>
      </v-tooltip>
    </template>
    <v-list density="compact">
      <template v-for="(item, index) in items">
        <v-list-item
          v-if="item.text !== current.text"
          :key="index"
          @click="updateSort(item.value)"
        >
          <template v-slot:prepend>
            <v-icon>mdi-{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ $t("list." + item.text) }}</v-list-item-title>
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
const items = ref(rootStore[props.type].list.sort)
const defaultSort = ref(
  rootStore[props.type].list.sort[
    Object.keys(rootStore[props.type].list.sort).find(
      (item) => rootStore[props.type].list.sort[item].default === true
    )
  ]
)

const current = computed(() => {
  try {
    return rootStore[props.type].list.sort[
      Object.keys(rootStore[props.type].list.sort).find((item) => {
        return (
          rootStore[props.type].list.sort[item].value[0] ===
            rootStore[props.type].list.sortBy[0] &&
          rootStore[props.type].list.sort[item].value[1] ===
            rootStore[props.type].list.sortDesc[0]
        )
      })
    ]
  } catch (error) {
    console.log("error: ", error)
    return items[Object.keys(items).find((item) => item.default)]
  }
})

const updateSort = async (value) => {
  await rootStore.updateSort({ value, type: props.type })
}

onMounted(() => {
  // Add any logic needed on component mount
})
</script>

<style lang="scss"></style>
