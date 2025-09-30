import { defineNuxtPlugin } from "#app"

function matchesHydration(msg: string) {
  const needles = [
    "Hydration",
    "hydration",
    "node mismatch",
    "Text content does not match server-rendered HTML",
    "mismatch of nodes",
  ]
  return needles.some((n) => msg.includes(n))
}

async function sendLog(payload: any) {
  try {
    const body = JSON.stringify(payload)
    // Prefer sendBeacon if available, fallback to fetch
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      const blob = new Blob([body], { type: "application/json" })
      navigator.sendBeacon("/api/hydration-log", blob)
    } else {
      await fetch("/api/hydration-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      })
    }
  } catch (_) {
    // ignore
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp
  const originalWarn = console.warn
  const originalError = console.error

  console.warn = (...args: any[]) => {
    try {
      const msg = args.map((a) => (typeof a === "string" ? a : "")).join(" ")
      if (matchesHydration(msg)) {
        sendLog({ level: "warn", msg, args })
      }
    } catch {}
    originalWarn(...args)
  }

  console.error = (...args: any[]) => {
    try {
      const msg = args.map((a) => (typeof a === "string" ? a : "")).join(" ")
      if (matchesHydration(msg)) {
        sendLog({ level: "error", msg, args })
      }
    } catch {}
    originalError(...args)
  }

  const prevWarn = app.config.warnHandler
  app.config.warnHandler = (msg, instance, trace) => {
    try {
      if (matchesHydration(msg)) {
        sendLog({ level: "vue-warn", msg, trace })
      }
    } catch {}
    if (typeof prevWarn === "function") return prevWarn(msg, instance, trace)
  }
})
