import { Link } from 'react-router-dom';
import Container from '../../UI/Container/Container';

import styles from './InvoiceListItem.module.css';
import InvoiceStatus from '../InvoiceStatus/InvoiceStatus';
import formatTotal from '../../../helpers/formatTotal';
import formatDate from '../../../helpers/formatDate';
import InvoiceId from '../InvoiceId/InvoiceId';
import Icon from '../../UI/Icon';

type Props = {
  invoiceId: string;
  invoiceClientName: string;
  invoicePaymentDue: string;
  invoiceTotal: number;
  invoiceStatus: string;
};

const InvoiceListItem = (props: Props) => {
  const {
    invoiceId,
    invoiceClientName,
    invoicePaymentDue,
    invoiceTotal,
    invoiceStatus,
  } = props;

  return (
    <li className={styles.invoiceListItem}>
      <Container>
        <Link className={styles.invoiceListItemLink} to={`${invoiceId}`}>
          <p className={styles.invoiceListItemId}>
            <InvoiceId id={invoiceId} />
          </p>
          <p className={styles.invoiceListItemPaymentDue}>
            Due {formatDate(new Date(invoicePaymentDue))}
          </p>
          <p className={styles.invoiceListItemClientName}>
            {invoiceClientName}
          </p>
          <p className={styles.invoiceListItemTotal}>
            £ {formatTotal(invoiceTotal)}
          </p>
          <InvoiceStatus status={invoiceStatus} />
          <Icon icon='arrowRight' />
        </Link>
      </Container>
    </li>
  );
};

export default InvoiceListItem;
