export const formatDate = (dateStr: string, locale: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale);
};
