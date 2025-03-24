import { ref, watchEffect } from "vue"
import markdownParser from "@nuxt/content/transformers/markdown"

export function useRenderedMarkdown(
  source: () => string | undefined,
  key: string,
) {
  const rendered = ref("")

  watchEffect(async () => {
    const text = source()
    if (text) {
      rendered.value = await markdownParser.parse(key, text)
    } else {
      rendered.value = ""
    }
  })

  return rendered
}
