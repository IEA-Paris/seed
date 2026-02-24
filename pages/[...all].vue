<script setup lang="ts">
const router = useRouter()
definePageMeta({ layout: "about" })

// Glitch effect state
const glitching = ref(false)
let glitchInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  // Periodic random glitch bursts
  glitchInterval = setInterval(() => {
    glitching.value = true
    setTimeout(() => {
      glitching.value = false
    }, 400)
  }, 3500)
})

onUnmounted(() => {
  if (glitchInterval) clearInterval(glitchInterval)
})
</script>

<template>
  <div class="not-found-page">
    <!-- Scanline overlay -->
    <div class="scanlines" aria-hidden="true" />

    <!-- Grid background -->
    <div class="grid-bg" aria-hidden="true" />

    <!-- Main content -->
    <div class="not-found-content">
      <!-- Large glitching 404 -->
      <div
        class="error-code-wrapper"
        :class="{ glitch: glitching }"
        aria-label="404"
      >
        <span class="error-code" data-text="404">404</span>
      </div>

      <!-- Horizontal rule -->
      <div class="divider-line" />

      <!-- Message block -->
      <div class="message-block">
        <p class="error-label text-overline">{{ $t("error") }}</p>
        <h1 class="error-title">{{ $t("page-not-found") }}</h1>
        <p class="error-desc">{{ $t("page-not-found-desc") }}</p>
      </div>

      <!-- Actions -->
      <div class="actions">
        <v-btn
          variant="outlined"
          size="large"
          class="action-btn"
          @click="router.back()"
        >
          <v-icon start>mdi-arrow-left</v-icon>
          {{ $t("back") }}
        </v-btn>

        <v-btn
          variant="flat"
          size="large"
          class="action-btn action-btn--primary"
          to="/"
        >
          {{ $t("home") }}
          <v-icon end>mdi-arrow-right</v-icon>
        </v-btn>
      </div>

      <!-- Coordinates footer -->
      <div class="coordinates">
        <span>ERR_PAGE_NOT_FOUND</span>
        <span class="dot" />
        <span>HTTP 404</span>
        <span class="dot" />
        <span>{{ $route.path }}</span>
      </div>
    </div>

    <!-- Decorative corner marks -->
    <div class="corner corner--tl" aria-hidden="true" />
    <div class="corner corner--tr" aria-hidden="true" />
    <div class="corner corner--bl" aria-hidden="true" />
    <div class="corner corner--br" aria-hidden="true" />
  </div>
</template>

<style scoped>
/* ─── Page shell ────────────────────────────────────── */
.not-found-page {
  position: relative;
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  overflow: hidden;
}

/* ─── Grid background ───────────────────────────────── */
.grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: grid-drift 20s linear infinite;
}

@keyframes grid-drift {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 60px 60px;
  }
}

/* ─── Scanlines ─────────────────────────────────────── */
.scanlines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    rgba(0, 0, 0, 0.015) 3px,
    rgba(0, 0, 0, 0.015) 4px
  );
  z-index: 1;
}

/* ─── Corner marks ──────────────────────────────────── */
.corner {
  position: absolute;
  width: 24px;
  height: 24px;
  opacity: 0;
  animation: corner-appear 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.corner--tl {
  top: 32px;
  left: 32px;
  border-top: 1px solid #000;
  border-left: 1px solid #000;
  animation-delay: 0.9s;
}
.corner--tr {
  top: 32px;
  right: 32px;
  border-top: 1px solid #000;
  border-right: 1px solid #000;
  animation-delay: 1s;
}
.corner--bl {
  bottom: 32px;
  left: 32px;
  border-bottom: 1px solid #000;
  border-left: 1px solid #000;
  animation-delay: 1.1s;
}
.corner--br {
  bottom: 32px;
  right: 32px;
  border-bottom: 1px solid #000;
  border-right: 1px solid #000;
  animation-delay: 1.2s;
}

@keyframes corner-appear {
  from {
    opacity: 0;
    transform: scale(0.4);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ─── Main content ──────────────────────────────────── */
.not-found-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  padding: 0 32px;
  max-width: 760px;
  width: 100%;
}

/* ─── 404 number with glitch ────────────────────────── */
.error-code-wrapper {
  opacity: 0;
  animation: slide-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
}

.error-code {
  font-family: "Bodoni Moda", sans-serif;
  font-size: clamp(8rem, 22vw, 18rem);
  font-weight: 900;
  font-style: italic;
  line-height: 0.85;
  color: #000;
  display: block;
  position: relative;
  user-select: none;
}

/* Glitch pseudo-layers */
.error-code::before,
.error-code::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  font-style: inherit;
  line-height: inherit;
  pointer-events: none;
  opacity: 0;
}

.glitch .error-code::before {
  opacity: 0.8;
  color: #000;
  clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
  transform: translateX(-4px);
  animation: glitch-top 0.4s steps(1) forwards;
}

.glitch .error-code::after {
  opacity: 0.8;
  color: #000;
  clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
  transform: translateX(4px);
  animation: glitch-bottom 0.4s steps(1) forwards;
}

@keyframes glitch-top {
  0% {
    transform: translateX(-4px);
    clip-path: polygon(0 10%, 100% 10%, 100% 40%, 0 40%);
  }
  25% {
    transform: translateX(4px);
    clip-path: polygon(0 5%, 100% 5%, 100% 30%, 0 30%);
  }
  50% {
    transform: translateX(-2px);
    clip-path: polygon(0 20%, 100% 20%, 100% 45%, 0 45%);
  }
  75% {
    transform: translateX(6px);
    clip-path: polygon(0 0%, 100% 0%, 100% 25%, 0 25%);
  }
  100% {
    transform: translateX(0);
    opacity: 0;
  }
}

@keyframes glitch-bottom {
  0% {
    transform: translateX(4px);
    clip-path: polygon(0 60%, 100% 60%, 100% 85%, 0 85%);
  }
  25% {
    transform: translateX(-4px);
    clip-path: polygon(0 70%, 100% 70%, 100% 100%, 0 100%);
  }
  50% {
    transform: translateX(3px);
    clip-path: polygon(0 55%, 100% 55%, 100% 80%, 0 80%);
  }
  75% {
    transform: translateX(-6px);
    clip-path: polygon(0 65%, 100% 65%, 100% 95%, 0 95%);
  }
  100% {
    transform: translateX(0);
    opacity: 0;
  }
}

/* ─── Divider ───────────────────────────────────────── */
.divider-line {
  width: 0;
  height: 1px;
  background: #000;
  margin: 24px 0;
  animation: expand-line 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards;
}

@keyframes expand-line {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* ─── Message ───────────────────────────────────────── */
.message-block {
  opacity: 0;
  animation: slide-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.65s forwards;
}

.error-label {
  font-family: "Open Sans", sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #000;
  margin: 0 0 8px 0;
}

.error-title {
  font-family: "Bodoni Moda", sans-serif;
  font-size: clamp(1.6rem, 4vw, 2.8rem);
  font-weight: 900;
  font-style: italic;
  color: #000;
  margin: 0 0 16px 0;
  line-height: 1.1;
}

.error-desc {
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: #555;
  margin: 0;
  max-width: 48ch;
  line-height: 1.7;
}

/* ─── Actions ───────────────────────────────────────── */
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 40px;
  opacity: 0;
  animation: slide-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.85s forwards;
}

.action-btn {
  border-radius: 0 !important;
  letter-spacing: 0.08em;
  font-family: "Open Sans", sans-serif;
  font-weight: 700;
}

.action-btn--primary {
  background: #000 !important;
  color: #fff !important;
}

.action-btn--primary:hover {
  background: #222 !important;
}

/* ─── Coordinates ───────────────────────────────────── */
.coordinates {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 56px;
  font-family: "Courier New", monospace;
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  color: #aaa;
  opacity: 0;
  animation: slide-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) 1.05s forwards;
  flex-wrap: wrap;
}

.dot {
  width: 3px;
  height: 3px;
  background: #ccc;
  display: inline-block;
  flex-shrink: 0;
}

/* ─── Shared entrance ───────────────────────────────── */
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ─── Responsive ────────────────────────────────────── */
@media (max-width: 600px) {
  .not-found-content {
    padding: 0 24px;
  }
  .corner--tl,
  .corner--bl {
    left: 16px;
  }
  .corner--tr,
  .corner--br {
    right: 16px;
  }
  .corner--tl,
  .corner--tr {
    top: 16px;
  }
  .corner--bl,
  .corner--br {
    bottom: 16px;
  }
  .actions {
    flex-direction: column;
  }
}
</style>
