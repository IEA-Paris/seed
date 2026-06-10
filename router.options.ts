import type { RouterConfig } from "@nuxt/schema"

// Snap-scroll pages (e.g. the homepage) wrap their content in a `.scroller`
// element that is its own scroll container (overflow-y: scroll, fixed height).
// On those pages the window never scrolls — the `.scroller` does. Vue Router's
// scrollBehavior only ever touches the window, so navigating between a
// `.scroller` page and a regular (window-scrolled) page leaves the nested
// container scrolled where it was. Reset it here too. (Late re-pinning for
// client-loaded list pages lives in plugins/scroll-restoration.client.ts.)
function resetScrollContainers() {
  document.querySelectorAll<HTMLElement>(".scroller").forEach((el) => {
    el.scrollTop = 0
  })
}

export default {
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    // Same path, only query changed (filters / pagination on list pages).
    // Lists already handle their own scroll inside the page; don't override.
    if (to.path === from.path) return false

    // Wait for the new page to finish loading (handles out-in transitions and
    // async data on detail pages) before scrolling, otherwise the scroll fires
    // mid-transition and the final position is wrong.
    return new Promise((resolve) => {
      const nuxtApp = useNuxtApp()
      nuxtApp.hooks.hookOnce("page:finish", () => {
        // Two frames: the first lets the out-in page transition swap in the new
        // DOM, the second lets layout settle before we resolve the scroll target
        // (needed for hash anchors so the element exists and is positioned).
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Reset the nested snap-scroll container regardless of where we land,
            // so leaving/entering a `.scroller` page always starts from the top.
            resetScrollContainers()

            if (to.hash) {
              const el = document.querySelector(to.hash) as HTMLElement | null
              resolve(
                el
                  ? { el: to.hash, behavior: "smooth" }
                  : { top: 0, behavior: "instant" as ScrollBehavior },
              )
            } else {
              resolve({ top: 0, behavior: "instant" as ScrollBehavior })
            }
          })
        })
      })
    })
  },
} satisfies RouterConfig
