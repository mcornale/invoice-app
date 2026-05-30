export const parseDate = (date: string | Date) => {
  if (date instanceof Date) return date;
  return !isNaN(Date.parse(date)) ? new Date(date) : null;
};
