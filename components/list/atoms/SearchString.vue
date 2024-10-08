<template>
  <div class="mt-4 font-weight-light">
    <!--   //TODO pluralize properly (Aucun X trouvé | 1 X trouvé | X trouvés)
      // https://vue-i18n.intlify.dev/guide/advanced/composition#pluralization -->
    {{ $t("items." + props.type, rootStore.total || 0)
    }}{{
      $t(
        "0-1-found-page-2-of-3",
        rootStore.total || 0,
        $t("items." + props.type, rootStore.total || 0),
      )
    }}
    {{ $t("page-0-of-1", [rootStore.page || 1, rootStore.numberOfPages || 1]) }}
  </div>
</template>

<script setup>
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped></style>
