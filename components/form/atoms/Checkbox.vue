<template>
  <v-checkbox v-model="val"></v-checkbox>
</template>
<script setup>
import { useRootStore } from "~/store/root"
import { debounce } from "~/composables/debounce"
const rootStore = useRootStore()
const props = defineProps(["type", "key", "items", "filter", "name"])

const val = computed({
  get() {
    return props.filter
      ? rootStore[props.type].list.filters[props.name]?.value
      : rootStore[props.type].form[props.key]
  },
  set(value) {
    props.filter
      ? rootStore.updateFilter(props.name, value, props.type)
      : rootStore.updateForm({ key: props.key, value, type: props.type })
  },
})
onMounted(() => {
  console.log(props.data)
})
</script>
<style lang="scss"></style>
