// Self-heal @vueuse/motion scroll-reveal elements that get stuck hidden after a
// route change.
//
// v-motion-*-visible-once sets the element to its `initial` variant (opacity 0,
// translated) and reveals it via an IntersectionObserver created in the
// directive's `mounted` hook. With the out-in page transition, that observer's
// first check can land while the entering page's layout is still unstable; it
// reports "not intersecting", latches nothing, and never re-fires — so an
// element that is plainly in the viewport stays at opacity 0, and scrolling
// can't recover it (the observer is already gone / settled). Reported in the
// wild as: navigating a scrolled list page -> /about/institute leaves the hero
// <h1> stuck at `transform: translate3d(0,100px,0); opacity: 0`.
//
// Fix: after each navigation settles, walk the elements @vueuse/motion tagged
// with a `.motionInstance`, and for any that own a visible/visibleOnce variant,
// are within the viewport, yet are still rendered hidden, replay the reveal.
// This keeps the original animation (it still slides/fades in) and only acts on
// elements the observer failed to trigger — anything below the fold or already
// revealed is left untouched.
export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.client) return

  const isHidden = (el: HTMLElement) =>
    parseFloat(getComputedStyle(el).opacity || "1") < 0.05

  const inViewport = (el: HTMLElement) => {
    const r = el.getBoundingClientRect()
    const vh = window.innerHeight || document.documentElement.clientHeight
    const vw = window.innerWidth || document.documentElement.clientWidth
    // Visible (even partially) in the current viewport.
    return r.bottom > 0 && r.top < vh && r.right > 0 && r.left < vw
  }

  const heal = () => {
    // The directive stores its instance on the element as `motionInstance`.
    const nodes = document.querySelectorAll<HTMLElement>("*")
    for (const el of nodes) {
      const mi = (el as unknown as { motionInstance?: any }).motionInstance
      if (!mi || typeof mi.apply !== "function") continue

      const variants = (mi.variants && (mi.variants.value ?? mi.variants)) || {}
      const target = variants.visibleOnce
        ? "visibleOnce"
        : variants.visible
          ? "visible"
          : null
      if (!target) continue // not a scroll-reveal element (e.g. enter-only)

      const active = mi.variant?.value
      // Already revealed, or correctly still hidden below the fold — leave it.
      if (active === target) continue
      if (!inViewport(el) || !isHidden(el)) continue

      // The observer missed this one: replay the reveal animation.
      if (mi.variant) mi.variant.value = target
      mi.apply(target)
    }
  }

  // Run a few times across the post-navigation settle window: once the new DOM
  // is in, again after layout/transition settles, and a final sweep for any
  // late-mounted content.
  nuxtApp.hook("page:finish", () => {
    const delays = [50, 250, 600, 1000]
    delays.forEach((d) => setTimeout(heal, d))
  })
})
