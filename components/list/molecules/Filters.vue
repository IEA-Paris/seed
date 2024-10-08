<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      md="4"
      v-for="filterItem in Object.keys(rootStore[type].list.filters)"
    >
      <component
        tile
        :is="ComponentName(filterItem)"
        :name="filterItem"
        hide-details
        :filter="true"
        :dense="smAndDown"
        :items="getItems(filterItem)"
        clearable
        :label="$t(filterItem)"
        min-height="56"
        variant="outlined"
        :loading="rootStore[type].loading"
        :type="type"
        color="black"
        style="min-width: 150px"
        class="transition-swing pb-1"
      />
      <!--    <template
      v-else
      v-for="filterItem in Object.keys(rootStore[type].list.filters).slice()"
    >
      <div v-if="computeVisibility(filterItem)">
        {{ filterItem }}
      </div>
    </template> -->
    </v-col></v-row
  >
</template>

<script setup>
import { useRootStore } from "~/store/root"
import { useDisplay } from "vuetify"
const { smAndDown, mdAndUp } = useDisplay()
const i18n = useI18n()
const localePath = useLocalePath()
const { locale, locales, messages } = useI18n()

const rootStore = useRootStore()
const props = defineProps(["type", "expanded"])
console.log("props.type: ", props.type)
const ComponentName = (name) => {
  return resolveComponent(
    "FormAtoms" + capitalize(rootStore[props.type].list.filters[name].type),
  )
}
const getItems = (name) => {
  return Object.keys(
    messages.value[locale.value].list.filters[props.type][name],
  ).map((item) => ({
    title: i18n.t(`list.filters.${props.type}.${name}.${item}`),
    value: item,
  }))
}
/* const filterValue = computed({
  get(name) {
    console.log("name: ", name)
    return rootStore[props.type].list.filters[name].value
  },
  set(name, value) {
    console.log("name, value: ", name, value)
    rootStore.updateFilter({
      type: props.type,
      filter: name,
      value: value,
    })
  },
}) */
</script>

<style lang="scss" scoped></style>
