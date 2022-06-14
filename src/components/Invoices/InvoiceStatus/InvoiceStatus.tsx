import INVOICES_STATUSES from '../../../constants/invoices-statuses';
import styles from './InvoiceStatus.module.css';

type Props = {
  status: string;
};

const InvoiceStatus = (props: Props) => {
  const { status } = props;

  const invoiceStatusClassName = [styles.invoiceStatus];

  if (status === INVOICES_STATUSES.DRAFT)
    invoiceStatusClassName.push(styles.invoiceStatusDraft);
  if (status === INVOICES_STATUSES.PENDING)
    invoiceStatusClassName.push(styles.invoiceStatusPending);
  if (status === INVOICES_STATUSES.PAID)
    invoiceStatusClassName.push(styles.invoiceStatusPaid);

  return (
    <div className={invoiceStatusClassName.join(' ')}>
      {`${status[0].toUpperCase()}${status.slice(1).toLowerCase()}`}
    </div>
  );
};

export default InvoiceStatus;
