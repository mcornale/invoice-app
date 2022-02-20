import { Link } from 'react-router-dom';
import StandOutContainer from '../../StandOutContainer/StandOutContainer';
import arrowSrc from '../../../assets/icons/icon-arrow-right.svg';

import styles from './InvoiceListItem.module.css';
import InvoiceStatus from '../InvoiceStatus/InvoiceStatus';
import formatTotal from '../../../helpers/formatTotal';
import formatDate from '../../../helpers/formatDate';
import InvoiceId from '../InvoiceId/InvoiceId';

const InvoiceListItem = (props) => {
  const { id, paymentDue, clientName, total, status } = props;

  return (
    <li className={styles.invoiceListItem}>
      <StandOutContainer>
        <Link className={styles.invoiceListItemLink} to={`${id}`}>
          <InvoiceId id={id} />
          <p className={styles.invoiceListItemPaymentDue}>
            {formatDate(new Date(paymentDue))}
          </p>
          <p className={styles.invoiceListItemClientName}>{clientName}</p>
          <p className={styles.invoiceListItemTotal}>{formatTotal(total)}</p>
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
