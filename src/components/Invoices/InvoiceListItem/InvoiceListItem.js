import { Link } from 'react-router-dom';
import Container from '../../UI/Container/Container';

import styles from './InvoiceListItem.module.css';
import InvoiceStatus from '../InvoiceStatus/InvoiceStatus';
import formatTotal from '../../../helpers/formatTotal';
import formatDate from '../../../helpers/formatDate';
import InvoiceId from '../InvoiceId/InvoiceId';
import Icon from '../../UI/Icon/Icon';

const InvoiceListItem = (props) => {
  const { id, paymentDue, clientName, total, status } = props;

  return (
    <li className={styles.invoiceListItem}>
      <Container>
        <Link className={styles.invoiceListItemLink} to={`${id}`}>
          <InvoiceId id={id} />
          <p className={styles.invoiceListItemPaymentDue}>
            {formatDate(paymentDue)}
          </p>
          <p className={styles.invoiceListItemClientName}>{clientName}</p>
          <p className={styles.invoiceListItemTotal}>{formatTotal(total)}</p>
          <InvoiceStatus status={status} />
          <Icon icon='arrowRight' />
        </Link>
      </Container>
    </li>
  );
};

export default InvoiceListItem;
