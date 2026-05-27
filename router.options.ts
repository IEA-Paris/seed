import type { RouterConfig } from "@nuxt/schema"

export default {
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    if (to.hash) {
      return new Promise((resolve) => {
        const nuxtApp = useNuxtApp()
        const tryScroll = () => {
          const el = document.querySelector(to.hash) as HTMLElement | null
          if (el) {
            resolve({ el: to.hash, behavior: "smooth" })
          } else {
            resolve({ top: 0, behavior: "smooth" })
          }
        }
        nuxtApp.hooks.hookOnce("page:finish", () => {
          setTimeout(tryScroll, 50)
        })
      })
    }

    return { top: 0, behavior: "smooth" }
  },
} satisfies RouterConfig
