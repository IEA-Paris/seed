import type { RouterConfig } from "@nuxt/schema"

export default {
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: "smooth" }
  },
} satisfies RouterConfig
