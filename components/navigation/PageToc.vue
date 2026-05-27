<template>
  <aside class="page-toc" :aria-label="ariaLabel">
    <ul class="page-toc__list">
      <li
        v-for="section in sections"
        :key="section.id"
        class="page-toc__item"
        :class="{ 'page-toc__item--active': activeIds.has(section.id) }"
      >
        <a
          :href="`#${section.id}`"
          class="page-toc__link"
          @click="onClick($event, section.id)"
        >
          <span class="page-toc__indicator" aria-hidden="true"></span>
          <span class="page-toc__label">{{ section.label }}</span>
        </a>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
interface Section {
  id: string
  label: string
}

const props = defineProps<{
  sections: Section[]
  ariaLabel?: string
}>()

const activeIds = ref<Set<string>>(new Set())
let observer: IntersectionObserver | null = null

const observeSections = () => {
  if (typeof window === "undefined") return

  observer?.disconnect()
  activeIds.value = new Set()

  // Active zone covers the middle 60% of the viewport: a section counts as
  // visible once its top crosses 20% from the top and its bottom crosses 20%
  // from the bottom. Multiple sections can be active at the same time.
  observer = new IntersectionObserver(
    (entries) => {
      const next = new Set(activeIds.value)
      for (const entry of entries) {
        const id = (entry.target as HTMLElement).id
        if (!id) continue
        if (entry.isIntersecting) next.add(id)
        else next.delete(id)
      }
      activeIds.value = next
    },
    { rootMargin: "-20% 0px -20% 0px", threshold: 0 },
  )

  for (const section of props.sections) {
    const el = document.getElementById(section.id)
    if (el) observer.observe(el)
  }
}

const onClick = (event: MouseEvent, id: string) => {
  const el = document.getElementById(id)
  if (!el) return
  event.preventDefault()
  el.scrollIntoView({ behavior: "smooth", block: "start" })
  // Update the URL hash without triggering scrollBehavior again.
  if (history.replaceState) {
    history.replaceState(null, "", `#${id}`)
  }
}

onMounted(() => {
  // Defer until the page has settled so all target elements exist.
  nextTick(observeSections)
})

watch(
  () => props.sections.map((s) => s.id).join("|"),
  () => nextTick(observeSections),
)

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.page-toc {
  position: fixed;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
  z-index: 5;
  max-width: 200px;
  pointer-events: none;
}

.page-toc__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  pointer-events: auto;
}

.page-toc__item {
  position: relative;
}

.page-toc__link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 8px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.45);
  font-size: 0.78rem;
  letter-spacing: 0.02em;
  line-height: 1.3;
  transition:
    color 0.2s ease,
    opacity 0.2s ease;
}

.page-toc__link:hover {
  color: rgba(0, 0, 0, 0.85);
}

.page-toc__indicator {
  flex-shrink: 0;
  width: 14px;
  height: 2px;
  background: currentColor;
  opacity: 0.5;
  transition:
    width 0.25s ease,
    opacity 0.25s ease;
}

.page-toc__item--active .page-toc__link {
  color: #000;
  font-weight: 600;
}

.page-toc__item--active .page-toc__indicator {
  width: 24px;
  opacity: 1;
}

.page-toc__label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
}

/* Dark variant for use on pages with dark backgrounds. */
.page-toc.page-toc--dark .page-toc__link {
  color: rgba(255, 255, 255, 0.5);
}

.page-toc.page-toc--dark .page-toc__link:hover {
  color: rgba(255, 255, 255, 0.9);
}

.page-toc.page-toc--dark .page-toc__item--active .page-toc__link {
  color: #fff;
}

/* Hide below md to keep the right edge of small viewports clean. */
@media (max-width: 959px) {
  .page-toc {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .page-toc__indicator,
  .page-toc__link {
    transition: none;
  }
}
</style>
