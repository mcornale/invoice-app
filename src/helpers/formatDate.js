const formatDate = (date) =>
  `${date.getDate().toString().padStart(2, '0')} ${date.toLocaleDateString(
    'en-EN',
    {
      year: 'numeric',
      month: 'short',
    }
  )}`;

export default formatDate;
