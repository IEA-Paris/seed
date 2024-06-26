<template>
  <div>
    <!--  <component
      :is="filters[filter].type"
      v-for="(filter, name) in Object.keys(filters)"
      v-show="name < 3 || expanded"
      :key="name + type + filter"
      hide-details
      :dense="$vuetify.breakpoint.sm"
      :items="filters[filter].items.map((item) => $t(item))"
      clearable
      :label="$t(filter)"
      min-height="56"
      outlined
      :loading="$store.state[type].loading.includes(filter)"
      :type="type"
      :filter="filter"
      color="black"
      style="min-width: 150px"
      class="transition-swing pb-1"
      :class="
        $store.state.scrolled
          ? 'mt-6'
          : $store.state[type].filters &&
              $store.state[type].filters[filter] &&
              $store.state[type].filters[filter].length
            ? 'mt-1 mr-1'
            : 'mt-0 mr-1'
      "
    /> -->
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
