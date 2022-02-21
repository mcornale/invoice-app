import { Link } from 'react-router-dom';
import StandOutContainer from '../../StandOutContainer/StandOutContainer';

import styles from './InvoicesListItem.module.css';
import InvoiceStatus from '../InvoiceStatus/InvoiceStatus';
import formatTotal from '../../../helpers/formatTotal';
import formatDate from '../../../helpers/formatDate';
import InvoiceId from '../InvoiceId/InvoiceId';
import Icon from '../../Icon/Icon';

const InvoicesListItem = (props) => {
  const { id, paymentDue, clientName, total, status } = props;

  return (
    <li className={styles.invoicesListItem}>
      <StandOutContainer>
        <Link className={styles.invoicesListItemLink} to={`${id}`}>
          <InvoiceId id={id} />
          <p className={styles.invoicesListItemPaymentDue}>
            {formatDate(new Date(paymentDue))}
          </p>
          <p className={styles.invoicesListItemClientName}>{clientName}</p>
          <p className={styles.invoicesListItemTotal}>{formatTotal(total)}</p>
          <InvoiceStatus status={status} />
          <Icon icon='arrowRight' />
        </Link>
      </StandOutContainer>
    </li>
  );
};

export default InvoicesListItem;
