<template>
  <div class="sliding-carousel" :class="{ 'sliding-carousel--dark': dark }">
    <!-- HEADER: title slot + counter + arrows -->
    <v-row class="mb-6 align-center" no-gutters>
      <v-col class="d-flex align-center">
        <slot></slot>
      </v-col>
      <v-col cols="auto" class="d-flex align-center ga-3">
        <!-- Counter (Radcliffe-style "01 / 10") -->
        <span
          v-if="items.length"
          class="sliding-carousel__counter text-body-2 font-weight-medium"
        >
          {{ String(currentIndex + 1).padStart(2, "0") }} /
          {{ String(items.length).padStart(2, "0") }}
        </span>
        <v-btn-toggle density="compact" variant="text">
          <v-btn
            variant="outlined"
            :disabled="currentIndex === 0"
            icon="mdi-chevron-left"
            size="small"
            aria-label="Slide left"
            @click="slidePrev"
            :style="{ color: dark ? 'white' : 'black' }"
          />
          <v-btn
            variant="outlined"
            :disabled="currentIndex >= maxIndex"
            icon="mdi-chevron-right"
            size="small"
            aria-label="Slide right"
            @click="slideNext"
            :style="{ color: dark ? 'white' : 'black' }"
          />
        </v-btn-toggle>
      </v-col>
    </v-row>

    <!-- TRACK -->
    <div ref="trackWrapperRef" class="sliding-carousel__viewport">
      <!-- Loading skeletons -->
      <div v-if="loading" class="sliding-carousel__track">
        <div
          v-for="n in skeletonCount"
          :key="'sk-' + n"
          class="sliding-carousel__slide"
          :style="{ width: computedWidth + 'px', flexShrink: 0 }"
        >
          <v-skeleton-loader type="image, article" />
        </div>
      </div>

      <!-- Actual items -->
      <div
        v-else
        class="sliding-carousel__track"
        :style="{ transform: `translateX(${trackOffset}px)` }"
      >
        <div
          v-for="(item, index) in items"
          :key="index + type"
          ref="slideRefs"
          class="sliding-carousel__slide"
          :class="{ 'slide-visible': visibleSlides.has(index) }"
          :style="{ width: computedWidth + 'px', flexShrink: 0 }"
        >
          <NuxtLink
            :to="
              localePath({
                name: pathPrefix,
                params: { slug: JSON.parse(item.slug) },
              })
            "
          >
            <component
              :is="capitalize(type) + 'SlidingItem'"
              :index="index"
              :item="item"
              :width="computedWidth"
              :loading="loading"
              :dark="dark"
          /></NuxtLink>
        </div>
      </div>
    </div>

    <!-- SEE MORE -->
    <div v-if="more" class="d-flex justify-end mt-10">
      <v-btn variant="flat" :to="localePath('/activities/events')">
        {{ $t("see-more") }}
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify"

const localePath = useLocalePath()
const { name, mdAndUp } = useDisplay()

const props = defineProps({
  type: { type: String, required: true },
  items: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  dark: { type: Boolean, default: false },
  more: { type: Boolean, default: true },
  pathPrefix: { type: String, required: true },
})

// ── Refs ──
const trackWrapperRef = ref(null)
const slideRefs = ref([])
const currentIndex = ref(0)
const visibleSlides = ref(new Set())
const trackOffset = ref(0)

// ── Computed ──
const gap = computed(() => {
  const gaps = { xs: 14, sm: 20, md: 24, lg: 28, xl: 32, xxl: 36 }
  return gaps[name.value] || 24
})

const computedWidth = computed(() => {
  const modifier = props.type === "events" ? 1.1 : 1
  const widths = { xs: 250, sm: 300, md: 350, lg: 380, xl: 430, xxl: 460 }
  return (widths[name.value] || 350) * modifier
})

const skeletonCount = computed(() => {
  const counts = { xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }
  return counts[name.value] || 3
})

const maxIndex = computed(() => Math.max(0, props.items.length - 1))

// ── Navigation ──
function scrollToIndex(index) {
  const slideWidth = computedWidth.value + gap.value
  trackOffset.value = -(index * slideWidth)
}

function slideNext() {
  const step = Math.max(1, visibleFullCount())
  const next = Math.min(currentIndex.value + step, maxIndex.value)
  currentIndex.value = next
  scrollToIndex(next)
}

function slidePrev() {
  const step = Math.max(1, visibleFullCount())
  const prev = Math.max(currentIndex.value - step, 0)
  currentIndex.value = prev
  scrollToIndex(prev)
}

function visibleFullCount() {
  if (!trackWrapperRef.value) return 1
  const viewportWidth = trackWrapperRef.value.clientWidth
  return Math.floor(viewportWidth / (computedWidth.value + gap.value)) || 1
}

// ── Intersection Observer for slide-in animation ──
let observer = null

function setupObserver() {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const idx = slideRefs.value?.indexOf(entry.target)
        if (idx === -1) return
        if (entry.isIntersecting) {
          visibleSlides.value.add(idx)
        }
      })
    },
    { threshold: 0.15 },
  )
  slideRefs.value?.forEach((el) => el && observer.observe(el))
}

onMounted(() => {
  nextTick(() => setupObserver())
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

watch(
  () => props.items,
  () => {
    nextTick(() => {
      observer?.disconnect()
      visibleSlides.value = new Set()
      setupObserver()
    })
  },
)
</script>

<style lang="scss" scoped>
.sliding-carousel {
  position: relative;

  &--dark {
    .sliding-carousel__counter {
      color: rgba(255, 255, 255, 0.7);
    }
  }
}

// ── Counter ──
.sliding-carousel__counter {
  white-space: nowrap;
  letter-spacing: 0.05em;
  color: rgba(0, 0, 0, 0.5);
  user-select: none;
}

// ── Viewport: overflow visible so items bleed past the edge ──
.sliding-carousel__viewport {
  overflow: visible;
}

// ── Track ──
.sliding-carousel__track {
  display: flex;
  gap: v-bind("gap + 'px'");
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
}

// ── Slide: entrance animation ──
.sliding-carousel__slide {
  flex-shrink: 0;
  opacity: 0;
  cursor: pointer;
  transform: translateX(60px);
  transition:
    opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &.slide-visible {
    opacity: 1;
    transform: translateX(0);
  }

  // Staggered entrance: each subsequent slide delays slightly
  @for $i from 1 through 12 {
    &:nth-child(#{$i}) {
      transition-delay: #{$i * 0.06}s;
    }
  }
}
</style>
