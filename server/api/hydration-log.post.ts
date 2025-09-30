import { defineEventHandler, readBody } from "h3"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    // Minimal noise: only log hydration-related payloads
    console.log("[hydration-log]", JSON.stringify(body))
  } catch (e) {
    // ignore
  }
  return { ok: true }
})
