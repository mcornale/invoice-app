export const parseDate = (date: string) =>
  !isNaN(Date.parse(date)) ? new Date(date) : null;
