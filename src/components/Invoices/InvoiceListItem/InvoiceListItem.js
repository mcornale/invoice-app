import { Link } from 'react-router-dom';
import StandOutContainer from '../../UI/StandOutContainer/StandOutContainer';
import arrowSrc from '../../../assets/icons/icon-arrow-right.svg';

import styles from './InvoiceListItem.module.css';
import InvoiceStatus from '../InvoiceStatus/InvoiceStatus';

const InvoiceListItem = (props) => {
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
    <li className={styles.invoiceListItem}>
      <StandOutContainer>
        <Link className={styles.invoiceListItemLink} to={`${id}`}>
          <p className={styles.invoiceListItemId}>{id}</p>
          <p className={styles.invoiceListItemPaymentDue}>
            {formattedPaymentDue}
          </p>
          <p className={styles.invoiceListItemClientName}>{clientName}</p>
          <p className={styles.invoiceListItemTotal}>{formattedTotal}</p>
          <InvoiceStatus status={status} />
          <img
            className={styles.invoiceListItemArrow}
            src={arrowSrc}
            alt='view invoice details'
          />
        </Link>
      </StandOutContainer>
    </li>
  );
};

export default InvoiceListItem;
