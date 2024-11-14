<template>
  <v-list dark bg-color="transparent"> </v-list>
</template>

<script setup>
const provideProps = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>
