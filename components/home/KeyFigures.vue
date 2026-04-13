<template>
  <v-container class="key-figures d-flex align-center justify-center" fluid>
    <div class="key-figures__grid" ref="gridRef" :style="gridStyle">
      <NuxtLink
        v-for="(entry, index) in entries"
        :key="entry.label"
        :to="$localePath(entry.path) + (entry.hash ?? '')"
        class="key-figures__item"
        v-motion-slide-visible-once-bottom
      >
        <div class="key-figures__value text-h3 text-md-h2 text-lg-h1">
          <template v-if="started">
            <span>{{ animatedValues[index] }}</span>
          </template>
          <template v-else>
            <span>0</span>
          </template>
          <span v-if="entry.suffix" class="key-figures__suffix">{{
            entry.suffix
          }}</span>
        </div>
        <div class="key-figures__label">{{ $t(entry.label) }}</div>
      </NuxtLink>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify"

export interface KeyFigure {
  label: string
  value: number | string
  url: string
}

interface ParsedEntry {
  label: string
  numericValue: number
  suffix?: string
  path: string
  hash?: string
}

interface Props {
  src: KeyFigure[]
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  duration: 2.5,
})

const { mdAndUp } = useDisplay()

// Parse src array into structured entries
const entries = computed<ParsedEntry[]>(() => {
  return props.src.map((item) => {
    const str = String(item.value)
    const match = str.match(/^(\d+)\s*(\+?)$/)
    // Split url into path and hash parts
    const hashIndex = item.url.indexOf("#")
    const path = hashIndex >= 0 ? item.url.slice(0, hashIndex) : item.url
    const hash = hashIndex >= 0 ? item.url.slice(hashIndex) : undefined

    return {
      label: item.label,
      numericValue: match ? parseInt(match[1], 10) : parseInt(str, 10) || 0,
      suffix: match?.[2] || undefined,
      path,
      hash,
    }
  })
})

// Balanced grid: up to 4 per row, prefer equal distribution
const columnsPerRow = computed(() => {
  const count = entries.value.length
  if (count <= 4) return count
  // For 5: 3+2 isn't balanced → but we want equilibrium, so 3+2 is fine visually
  // For 6: 3+3
  // For 7: 4+3
  // For 8: 4+4
  // General: find the largest divisor <= 4 that gives balanced rows
  for (let cols = 4; cols >= 2; cols--) {
    if (count % cols === 0) return cols
  }
  // Fallback: find the number of columns that minimizes the gap in the last row
  // e.g., 5 items → 3 cols (3+2)
  return Math.ceil(count / Math.ceil(count / 4))
})

const gridStyle = computed(() => {
  const cols = mdAndUp.value ? columnsPerRow.value : 2
  return {
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
  }
})

// Animation state
const gridRef = ref<HTMLElement | null>(null)
const started = ref(false)
const animatedValues = ref<string[]>(entries.value.map(() => "0"))

// Format number with space as thousands separator (French convention)
const formatNumber = (n: number): string => {
  return n.toLocaleString("fr-FR")
}

// Eased count-up using requestAnimationFrame
const animateCountUp = () => {
  const durationMs = props.duration * 1000
  const startTime = performance.now()
  const targets = entries.value.map((e) => e.numericValue)

  const step = (now: number) => {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / durationMs, 1)
    // Ease-out cubic for a smooth deceleration
    const eased = 1 - Math.pow(1 - progress, 3)

    animatedValues.value = targets.map((target) =>
      formatNumber(Math.round(target * eased)),
    )

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

// IntersectionObserver to trigger animation when visible
onMounted(() => {
  // Sync initial length
  animatedValues.value = entries.value.map(() => "0")

  if (!gridRef.value) return

  const observer = new IntersectionObserver(
    (observerEntries) => {
      const entry = observerEntries[0]
      if (entry?.isIntersecting && !started.value) {
        started.value = true
        animateCountUp()
        observer.disconnect()
      }
    },
    { threshold: 0.2 },
  )

  observer.observe(gridRef.value)
})

// Keep animatedValues length in sync if src changes reactively
watch(
  () => entries.value.length,
  (len) => {
    if (!started.value) {
      animatedValues.value = Array.from({ length: len }, () => "0")
    }
  },
)
</script>

<style lang="scss" scoped>
.key-figures {
  min-height: 100%;
  padding: 3rem 1rem;

  &__grid {
    display: grid;
    gap: 2.5rem 3rem;
    max-width: 1200px;
    width: 100%;
    text-align: center;

    @media (max-width: 599px) {
      grid-template-columns: 1fr !important;
      gap: 2rem 0;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    text-decoration: none;
    color: inherit;
    transition:
      transform 0.2s ease,
      opacity 0.2s ease;
    border-radius: 8px;

    &:hover,
    &:focus-visible {
      transform: translateY(-4px);
      opacity: 0.9;
    }
  }

  &__value {
    font-weight: 700;
    line-height: 1.15;
    margin-bottom: 0.5rem;
    white-space: nowrap;
  }

  &__suffix {
    font-size: 0.75em;
    vertical-align: super;
    margin-left: 2px;
  }

  &__label {
    font-size: 1rem;
    opacity: 0.85;
    max-width: 28ch;
    line-height: 1.4;
  }
}
</style>
