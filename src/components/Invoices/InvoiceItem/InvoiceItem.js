import { Link } from 'react-router-dom';
import StandOutContainer from '../../UI/StandOutContainer/StandOutContainer';
import arrowSrc from '../../../assets/icons/icon-arrow-right.svg';

import styles from './InvoiceItem.module.css';
import InvoiceStatus from '../InvoiceStatus/InvoiceStatus';

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
      <StandOutContainer>
        <Link className={styles.invoiceItemLink} to={`${id}`}>
          <p className={styles.invoiceItemId}>{id}</p>
          <p className={styles.invoiceItemPaymentDue}>{formattedPaymentDue}</p>
          <p className={styles.invoiceItemClientName}>{clientName}</p>
          <p className={styles.invoiceItemTotal}>{formattedTotal}</p>
          <InvoiceStatus status={status} />
          <img
            className={styles.invoiceItemArrow}
            src={arrowSrc}
            alt='view invoice details'
          />
        </Link>
      </StandOutContainer>
    </li>
  );
};

export default InvoiceItem;
