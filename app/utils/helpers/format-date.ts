export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
  }).format(date);
