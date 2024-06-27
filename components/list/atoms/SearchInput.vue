<template>
  <div class="d-flex">
    <!--            <v-btn
                  v-if="type === 'authors'"
                  outlined
                  :class="{ 'mt-3': $store.state.scrolled }"
                  class="transition-swing"
                  :small="$vuetify.breakpoint.smAndDown"
                  style="height: auto"
                  ><v-icon>mdi-alphabetical-variant</v-icon></v-btn
                > -->
    <v-text-field
      v-model.trim="search"
      :placeholder="$t('list.search-type', [$t(type)])"
      prepend-inner-icon="mdi-magnify"
      single-line
      color="black"
      class="transition-swing"
      variant="outlined"
      hide-details
      :density="smAndDown ? 'dense' : 'default'"
      clearable
      type="search"
    >
      <!--    :loading="$nuxt.loading || $store.state.loading" :class="{ 'mt-3':
      $store.state.scrolled }" -->
      <template v-if="!search" #label>
        <div class="searchLabel">
          {{ $t("search-type", [$t(type)]) }}
        </div>
      </template></v-text-field
    >
  </div>
</template>

<script setup>
import { useDebounceFn } from "@vueuse/core"
import { useDisplay } from "vuetify"
const {
  name: nameDisplay,
  xs: isXsDisplay,
  mobile: isMobileDisplay,
  smAndUp,
  lgAndUp,
  smAndDown,
} = useDisplay()

import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
})
const search = computed({
  get() {
    return rootStore[props.type].list?.search || ""
  },
  set: useDebounceFn(function (v) {
    console.log("v: ", v)
    rootStore.updateSearch({ search: v, type: props.type })
  }, 300),
})
</script>

<style lang="scss" scoped></style>
