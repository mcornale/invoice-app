const formatDate = (date) => {
  if (!(date instanceof Date)) date = new Date(date);

  const day = date.getDate().toString().padStart(2, '0');

  return `${day} ${date.toLocaleDateString('en-EN', {
    year: 'numeric',
    month: 'short',
  })}`;
};
export default formatDate;
