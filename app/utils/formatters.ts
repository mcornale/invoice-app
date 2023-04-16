export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
  }).format(date);

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);

export const upperFirst = (word: string) =>
  word[0].toUpperCase() + word.slice(1).toLowerCase();
