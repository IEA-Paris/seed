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
            aria-label="Slide left"
            :style="{ color: dark ? 'white' : 'black' }"
            @click="slidePrev"
          />
          <v-btn
            variant="outlined"
            :disabled="currentIndex >= maxIndex"
            icon="mdi-chevron-right"
            aria-label="Slide right"
            :style="{ color: dark ? 'white' : 'black' }"
            @click="slideNext"
          />
        </v-btn-toggle>
      </v-col>
    </v-row>

    <!-- TRACK -->
    <div
      ref="trackWrapperRef"
      class="sliding-carousel__viewport"
      @wheel="onWheel"
      @pointerdown="onPointerDown"
    >
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
        :class="{ 'sliding-carousel__track--dragging': isDragging }"
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
                params: { slug: item.slug },
              })
            "
            :style="{ pointerEvents: isDragging ? 'none' : '' }"
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

// ── Snap to nearest slide from a free offset ──
function snapToNearest() {
  const slideWidth = computedWidth.value + gap.value
  const index = Math.round(-trackOffset.value / slideWidth)
  const clamped = Math.max(0, Math.min(index, maxIndex.value))
  currentIndex.value = clamped
  scrollToIndex(clamped)
}

// ── Wheel handler ──
// Horizontal wheel scrolls naturally; vertical wheel also drives the carousel.
// When at the far right and scrolling down, release control back to the page.
let wheelTimer = null
function onWheel(e) {
  const isVertical = Math.abs(e.deltaY) > Math.abs(e.deltaX)
  const atRightEnd = currentIndex.value >= maxIndex.value

  const atLeftEnd = currentIndex.value <= 0
  if (isVertical && atRightEnd && e.deltaY > 0) return
  if (isVertical && atLeftEnd && e.deltaY < 0) return

  e.preventDefault()
  const delta = isVertical ? e.deltaY : e.deltaX
  const slideWidth = computedWidth.value + gap.value
  const minOffset = -(maxIndex.value * slideWidth)
  trackOffset.value = Math.max(
    minOffset,
    Math.min(0, trackOffset.value - delta),
  )

  clearTimeout(wheelTimer)
  wheelTimer = setTimeout(snapToNearest, 150)
}

// ── Drag (pointer) handler ──
const isDragging = ref(false)
let dragStartX = 0
let dragStartOffset = 0

function onPointerDown(e) {
  if (e.button !== 0) return
  isDragging.value = false
  dragStartX = e.clientX
  dragStartOffset = trackOffset.value

  window.addEventListener("pointermove", onPointerMove)
  window.addEventListener("pointerup", onPointerUp, { once: true })
}

function onPointerMove(e) {
  const dx = e.clientX - dragStartX
  if (!isDragging.value && Math.abs(dx) < 6) return
  isDragging.value = true

  const slideWidth = computedWidth.value + gap.value
  const minOffset = -(maxIndex.value * slideWidth)
  trackOffset.value = Math.max(minOffset, Math.min(0, dragStartOffset + dx))
}

function onPointerUp() {
  window.removeEventListener("pointermove", onPointerMove)
  if (isDragging.value) {
    snapToNearest()
    // Keep isDragging true briefly so the NuxtLink click is suppressed
    setTimeout(() => {
      isDragging.value = false
    }, 50)
  }
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
  window.removeEventListener("pointermove", onPointerMove)
  clearTimeout(wheelTimer)
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

// Viewport: clip on mobile to prevent horizontal page overflow;
// bleed past the edge is only desirable on larger screens
.sliding-carousel__viewport {
  overflow: hidden;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  @media (min-width: 960px) {
    overflow: visible;
  }
}

// ── Track ──
.sliding-carousel__track {
  display: flex;
  gap: v-bind("gap + 'px'");
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;

  &--dragging {
    transition: none;
    user-select: none;
  }
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
  &:nth-child(1)  { transition-delay: 0.06s; }
  &:nth-child(2)  { transition-delay: 0.12s; }
  &:nth-child(3)  { transition-delay: 0.18s; }
  &:nth-child(4)  { transition-delay: 0.24s; }
  &:nth-child(5)  { transition-delay: 0.30s; }
  &:nth-child(6)  { transition-delay: 0.36s; }
  &:nth-child(7)  { transition-delay: 0.42s; }
  &:nth-child(8)  { transition-delay: 0.48s; }
  &:nth-child(9)  { transition-delay: 0.54s; }
  &:nth-child(10) { transition-delay: 0.60s; }
  &:nth-child(11) { transition-delay: 0.66s; }
  &:nth-child(12) { transition-delay: 0.72s; }
}
</style>
