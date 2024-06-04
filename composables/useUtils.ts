export const formatDate = (dateStr: string, locale: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale)
}
export const getDateMonth = (dateStr: string, locale: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleString(locale, { month: "long" })
}
export const getDetailedFormatedDate = (
  dateStr: string,
  locale: string
): { day: number; month: string; year: number } => {
  console.log("locale: ", locale)
  console.log("dateStr: ", dateStr)
  const date = new Date(dateStr)
  return {
    day: date.getDay(),
    month: getDateMonth(dateStr, locale),
    year: date.getFullYear(),
  }
}
