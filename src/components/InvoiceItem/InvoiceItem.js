import { Link } from 'react-router-dom';
import arrowSrc from '../../assets/icons/icon-arrow-right.svg';

import styles from './InvoiceItem.module.css';

const InvoiceItem = (props) => {
  const { id, paymentDue, clientName, total, status } = props;

  const formatPaymentDue = (paymentDueDate) =>
    `${paymentDueDate
      .getDate()
      .toString()
      .padStart(2, '0')} ${paymentDueDate.toLocaleDateString('en-EN', {
      year: 'numeric',
      month: 'short',
    })}`;

  const formattedPaymentDue = formatPaymentDue(new Date(paymentDue));

  const formatTotal = (total) => {
    let [totalIntPart, totalDecimalPart] = total
      .toFixed(2)
      .toString()
      .split('.');

    if (totalIntPart.length > 3) {
      totalIntPart = [...totalIntPart]
        .reverse()
        .map((digit, index) =>
          index !== 0 && index % 3 === 0 ? `${digit}'` : digit
        )
        .reverse()
        .join('');
    }

    return [totalIntPart, totalDecimalPart].join('.');
  };

  const formattedTotal = formatTotal(total);

  return (
    <li className={styles.invoiceItem}>
      <Link className={styles.invoiceItemLink} to={`${id}`}>
        <p className={styles.invoiceItemId}>{id}</p>
        <p className={styles.invoiceItemPaymentDue}>{formattedPaymentDue}</p>
        <p className={styles.invoiceItemClientName}>{clientName}</p>
        <p className={styles.invoiceItemTotal}>{formattedTotal}</p>
        <p data-status={status} className={styles.invoiceItemStatus}>
          {`${status[0].toUpperCase()}${status.slice(1).toLowerCase()}`}
        </p>
        <img
          className={styles.invoiceItemArrow}
          src={arrowSrc}
          alt='view invoice details'
        />
      </Link>
    </li>
  );
};

export default InvoiceItem;
