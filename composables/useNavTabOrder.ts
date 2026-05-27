/**
 * Builds the flat keyboard tab sequence across the site's main + footer
 * navigation. The order is driven by the `order` field declared on sitemap
 * entries in static.config.ts — entries without `order` (e.g. megamenu
 * activators with no own page) are skipped, so keyboard users tab straight
 * to the destinations that actually exist.
 *
 * Both the desktop topbar and the mobile menu consume this composable to
 * render an off-screen ordered link list, so visual layout and keyboard
 * navigation can diverge without duplicating the source of truth.
 */
interface SitemapNode {
  text: string
  path?: string
  order?: number
  children?: SitemapNode[]
}

export interface NavLink {
  /** i18n key for the visible label. */
  text: string
  /** Internal route path (may contain a hash). */
  path: string
  /** Order index from the sitemap; lower = earlier in tab sequence. */
  order: number
}

const collect = (nodes: SitemapNode[] | undefined, acc: NavLink[]) => {
  if (!nodes) return
  for (const node of nodes) {
    if (typeof node.order === "number" && node.path) {
      acc.push({ text: node.text, path: node.path, order: node.order })
    }
    if (node.children) collect(node.children, acc)
  }
}

export const useNavTabOrder = () => {
  const config = useAppConfig()
  return computed<NavLink[]>(() => {
    const flat: NavLink[] = []
    collect(config.sitemap?.main as SitemapNode[] | undefined, flat)
    collect(config.sitemap?.footer as SitemapNode[] | undefined, flat)
    return flat.sort((a, b) => a.order - b.order)
  })
}
