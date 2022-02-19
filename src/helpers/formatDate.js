const formatDate = (paymentDueDate) =>
  `${paymentDueDate
    .getDate()
    .toString()
    .padStart(2, '0')} ${paymentDueDate.toLocaleDateString('en-EN', {
    year: 'numeric',
    month: 'short',
  })}`;

export default formatDate;
