<template>
  <div>
    <component
      v-for="(filter, name) in Object.keys(rootStore[type].list.filters)"
      :is="ComponentName(filter)"
      v-show="name < 3 || expanded"
      :key="name + type + filter"
      hide-details
      :dense="smAndDown"
      :items="
        rootStore[type].list.filters[filter].items.map((item) => $t(item))
      "
      clearable
      :label="$t(filter)"
      min-height="56"
      variant="outlined"
      :loading="rootStore[type].loading"
      :type="type"
      :filter="filter"
      color="black"
      style="min-width: 150px"
      class="transition-swing pb-1"
    />
  </div>
</template>

<script setup>
import { useRootStore } from "~/store/root"
import { useDisplay } from "vuetify"
const { smAndDown, mdAndUp } = useDisplay()

const rootStore = useRootStore()
const props = defineProps(["type", "expanded"])
console.log("props.type: ", props.type)
const ComponentName = (name) => {
  console.log("name: ", name)
  return resolveComponent(
    "FormAtoms" + capitalize(rootStore[props.type].list.filters[name].type),
  )
}
</script>

<style lang="scss" scoped></style>
