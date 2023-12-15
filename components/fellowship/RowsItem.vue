<template>
  <v-card class="d-flex flex-row" :to="localePath(item.link)">
    <v-img :src="item.picture"> </v-img>
    <div>
      <v-card-title>{{ item.title }}</v-card-title>
      <v-card-text>{{ item.shortDescription }}</v-card-text>
    </div>
  </v-card>
</template>

<script setup>
const localePath = useLocalePath()
const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {}
    },
    required: true,
  },
})
</script>

<style lang="scss" scoped></style>
