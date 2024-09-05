<template>
  <h3 class="moto">
    <div class="italic" v-for="(word, index) in moto.split('.')" :key="index">
      {{ word + "." }}
    </div>
  </h3>
</template>
<script setup>
// import { useDisplay } from "vuetify"
// const { smAndUp } = useDisplay()
// const localePath = useLocalePath()
const { $i18n } = useNuxtApp();
const { data: rst } = await useAsyncData("moto", () =>
  queryContent("/pages/" + $i18n.locale.value + "/moto").findOne(),
);
const moto = ref(rst.value.description);
</script>
<style lang="scss" scoped>
h3.moto {
  max-width: 40ch;
  text-align: center;
  font-size: 2rem;
}
div {
  display: inline-block;
}
</style>
