<template>
  <v-sheet class="pa-2 sliding-item">
    <div class="report-cover">
      <img
        v-if="item.thumbnail"
        :src="item.thumbnail"
        :alt="`${$t('annual-report')} ${item.year}`"
        loading="lazy"
        class="report-cover__img"
      />
      <v-icon v-else size="40" color="grey-darken-1" class="report-cover__icon">
        mdi-file-pdf-box
      </v-icon>
      <div class="report-cover__year-badge">{{ item.year }}</div>
    </div>
    <div class="pa-2 pb-1">
      <div class="text-caption text-uppercase text-grey-darken-1">
        {{ $t("annual-report") }} &middot; {{ item.lang === "fr" ? "FR" : "EN" }}
      </div>
      <div class="text-subtitle-2 font-weight-bold mt-1">{{ item.year }}</div>
    </div>
  </v-sheet>
</template>

<script setup>
defineProps({
  item: { type: Object, required: true },
  loading: { type: Boolean, default: false },
  width: { type: Number, default: 0 },
  dark: { type: Boolean, default: false },
})
</script>

<style lang="scss" scoped>
.report-cover {
  position: relative;
  height: 220px;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: background 0.2s ease;

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    display: block;
    transition: transform 0.3s ease;
  }

  &__icon {
    opacity: 0.35;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  &__year-badge {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(0, 0, 0, 0.75);
    color: white;
    font-family: "Bodoni Moda", serif;
    font-size: 12px;
    font-weight: 600;
    padding: 2px 8px;
    letter-spacing: 0.05em;
  }
}

.sliding-item:hover .report-cover {
  background: linear-gradient(135deg, #ebebeb 0%, #dcdcdc 100%);

  .report-cover__img {
    transform: scale(1.03);
  }

  .report-cover__icon {
    opacity: 0.65;
    transform: scale(1.1);
  }
}
</style>
