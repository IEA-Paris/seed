/**
 * Truncates text and optionally adds a link at the end
 * @param {string} text - The text to truncate
 * @param {number} stop - The maximum length before truncation
 * @param {string} [link] - The text for the link (if url is provided)
 * @param {string} [url] - The URL for the link
 * @returns {string} - The truncated text with optional link
 */
export const truncate = (text, stop, link, url) => {
  if (typeof text !== "string" || text.length <= stop) return text

  const truncated = text.slice(0, stop)
  return url && link
    ? `${truncated}... <a href="${url}">${link}</a>`
    : `${truncated}...`
}

/**
 * Highlights search terms in text and truncates intelligently around matches
 * @param {number} stop - The maximum length before truncation
 * @param {string} word - The text to process
 * @param {string[]} query - Array of search terms to highlight
 * @param {string} [url] - Optional URL for "read more" link
 * @param {string} [link] - Optional link text
 * @returns {string} - The processed text with highlights and truncation
 */
export const highlightAndTruncate = (stop, word, query, url, link) => {
  try {
    // Validate inputs
    if (typeof word !== "string" || !word) return ""
    if (!Array.isArray(query)) query = [query].filter(Boolean)

    const hasQuery =
      query.length > 0 && query.some((term) => term && term.length)
    const needsTruncation = word.length > stop

    if (!hasQuery || !needsTruncation) {
      const highlighted = hasQuery ? highlightTerms(word, query) : word
      return needsTruncation
        ? `${highlighted.slice(0, stop)}${url ? `... <a href="${url}">${link}</a>` : "..."}`
        : highlighted
    }

    // Find all match positions
    const matchPositions = query
      .flatMap((term) => getAllIndices(word.toLowerCase(), term.toLowerCase()))
      .sort((a, b) => a - b)

    if (matchPositions.length === 0) {
      return `${word.slice(0, stop)}${url ? `... <a href="${url}">${link}</a>` : "..."}`
    }

    // Determine the best truncation window around matches
    const firstMatch = matchPositions[0]
    const lastMatch = matchPositions[matchPositions.length - 1]
    const maxTermLength = Math.max(...query.map((term) => term.length))

    let truncatedText
    if (firstMatch > stop + maxTermLength) {
      // Match is far into the text - show end with match
      const start = Math.max(0, lastMatch - stop + maxTermLength)
      truncatedText = `...${word.slice(start, start + stop)}`
    } else {
      // Show beginning with match
      truncatedText = word.slice(0, stop)
    }

    // Highlight terms in the truncated text
    const highlighted = highlightTerms(truncatedText, query)

    return `${highlighted}${url ? `... <a href="${url}">${link}</a>` : "..."}`
  } catch (error) {
    console.error("Error in highlightAndTruncate:", error)
    return ""
  }
}

// Helper function to highlight search terms
const highlightTerms = (text, terms) => {
  return terms.reduce((result, term) => {
    const regex = new RegExp(escapeRegExp(term), "gi")
    return result.replace(
      regex,
      (match) =>
        `<strong style="color: darkslategray; background-color: yellow;">${match}</strong>`,
    )
  }, text)
}

// Helper function to escape regex special characters
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

// Helper function to find all indices of a substring
const getAllIndices = (str, substr) => {
  const indices = []
  let pos = str.indexOf(substr)

  while (pos !== -1) {
    indices.push(pos)
    pos = str.indexOf(substr, pos + substr.length)
  }

  return indices
}
