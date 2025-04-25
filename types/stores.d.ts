import { events } from "~/stores/factory" // This imports the type, not the value

declare module "#app" {
  interface NuxtApp {
    // Or if using the $stores namespace:
    $stores: {
      events: ReturnType<ReturnType<typeof createDynamicStore<"events">>>
      news: ReturnType<ReturnType<typeof createDynamicStore<"news">>>
      people: ReturnType<ReturnType<typeof createDynamicStore<"people">>>
      projects: ReturnType<ReturnType<typeof createDynamicStore<"projects">>>
      fellowships: ReturnType<
        ReturnType<typeof createDynamicStore<"fellowships">>
      >
      publications: ReturnType<
        ReturnType<typeof createDynamicStore<"publications">>
      >
    }
  }
}

// Add others as needed
