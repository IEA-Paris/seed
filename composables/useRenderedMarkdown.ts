import { ref, watchEffect } from "vue"
import markdownParser from "@nuxt/content/transformers/markdown"
export function useRenderedMarkdown(
  source: () => string | undefined,
  key: string,
) {
  const rendered = ref("")

  watchEffect(async () => {
    try {
      const text = source()
      rendered.value = text ? await markdownParser.parse(key, text) : ""
    } catch (error) {
      console.error("Error parsing markdown:", error)
      rendered.value = ""
    }
  })
  console.log("rendered: ", rendered)

  return rendered
}
