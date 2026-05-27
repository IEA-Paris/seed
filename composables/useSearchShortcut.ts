/**
 * Global keyboard shortcut to open search:
 *   - Cmd+K (mac) / Ctrl+K (other) — always opens
 *   - "/"                          — opens unless the user is already typing
 *
 * Both shortcuts call `onTrigger(event)` so the caller decides whether to
 * focus an inline input or navigate to /search.
 */
export const useSearchShortcut = (onTrigger: (event: KeyboardEvent) => void) => {
  if (typeof window === "undefined") return

  const isTextInput = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return false
    const tag = target.tagName
    return (
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      tag === "SELECT" ||
      target.isContentEditable
    )
  }

  const onKeydown = (event: KeyboardEvent) => {
    const isModK =
      (event.metaKey || event.ctrlKey) &&
      !event.altKey &&
      event.key.toLowerCase() === "k"
    const isSlash = event.key === "/" && !isTextInput(event.target)

    if (!isModK && !isSlash) return
    event.preventDefault()
    onTrigger(event)
  }

  onMounted(() => window.addEventListener("keydown", onKeydown))
  onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown))
}
