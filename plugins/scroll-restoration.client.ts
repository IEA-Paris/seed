// Scroll-to-top reliability for navigations between pages with different scroll
// timing (snap-scroll `.scroller` pages, server-rendered about pages, and
// client-loaded list pages like /fellows and /events).
//
// Two browser behaviours fight scroll-to-top here:
//
// 1. history.scrollRestoration = "auto" (Nuxt's default) re-applies the prior
//    page's scroll offset on its own.
// 2. Even with "manual", when a route's content loads *after* navigation (list
//    pages fetch on the client), the document is briefly short, so our router
//    scrollBehavior's scrollTo(0) lands on a short page; when the list arrives
//    the document grows and the browser restores the clamped offset, jumping
//    back down. Confirmed via CDP: scrollTo(0) fires on an 813px-tall document,
//    then ~150ms later the document grows to ~3900px and scrollY snaps to the
//    previous offset.
//
// Fix: lock scrollRestoration to "manual", and after each real navigation keep
// re-pinning the scroll position to the top until the document height settles,
// so late-arriving content can't drag the page back down. Hash navigations and
// same-path query changes (list filters/pagination handle their own scroll) are
// left alone.
export default defineNuxtPlugin({
  name: "scroll-to-top",
  dependsOn: ["nuxt:router"],
  enforce: "post",
  setup(nuxtApp) {
    if (!import.meta.client) return

    if ("scrollRestoration" in window.history) {
      try {
        Object.defineProperty(window.history, "scrollRestoration", {
          configurable: true,
          get: () => "manual",
          set: () => {},
        })
      } catch {
        window.history.scrollRestoration = "manual"
      }
    }

    const router = useRouter()

    // Reset every scrollable surface to the top: the window plus any nested
    // snap-scroll container (the homepage scrolls inside `.scroller`, not the
    // window — see router.options.ts).
    const scrollAllToTop = () => {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
      document
        .querySelectorAll<HTMLElement>(".scroller")
        .forEach((el) => (el.scrollTop = 0))
    }

    router.afterEach((to, from) => {
      // Let the browser handle in-page anchors and list filter/pagination
      // (same path, query-only change) — those manage their own scroll.
      if (to.hash) return
      if (to.path === from.path) return

      // Re-pin to the top across a short settle window. Each time the document
      // grows (async list content arriving), pull scroll back up. Stops early
      // once the user scrolls themselves, so we never fight intentional input.
      let lastHeight = -1
      let userScrolled = false
      const onUserScroll = () => {
        // A scroll we didn't cause while still at/near the top is the user's.
        if (window.scrollY > 4) userScrolled = true
      }
      window.addEventListener("wheel", () => (userScrolled = true), {
        passive: true,
        once: true,
      })
      window.addEventListener("touchmove", () => (userScrolled = true), {
        passive: true,
        once: true,
      })

      const start = performance.now()
      const tick = () => {
        if (userScrolled) return
        const height = document.documentElement.scrollHeight
        if (height !== lastHeight) {
          lastHeight = height
          scrollAllToTop()
        }
        // Keep watching for ~1.2s — long enough for client-side list fetches to
        // resolve and grow the document — then stop.
        if (performance.now() - start < 1200) {
          requestAnimationFrame(tick)
        } else {
          window.removeEventListener("scroll", onUserScroll, true)
        }
      }
      window.addEventListener("scroll", onUserScroll, true)
      requestAnimationFrame(tick)
    })
  },
})
