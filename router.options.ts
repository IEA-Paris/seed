import type { RouterConfig } from "@nuxt/schema"

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
        requestAnimationFrame(() => {
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
  },
} satisfies RouterConfig
