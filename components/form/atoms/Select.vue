<template>
  <v-select v-model="val" :items="props.items"></v-select>
</template>
<script setup>
import { useRootStore } from "~/store/root"
import { debounce } from "~/composables/debounce"
const rootStore = useRootStore()
const props = defineProps(["type", "key", "items"])
const val = computed({
  get() {
    return rootStore[props.type].form[props.key]
  },
  set(value) {
    rootStore.updateForm({ key: props.key, value, type: props.type })
  },
})
onMounted(() => {
  console.log(props)
})
</script>
<style lang="scss"></style>
