import styles from './InvoiceStatus.module.css';

const InvoiceStatus = (props) => {
  const { status } = props;

  return (
    <div data-status={status} className={styles.invoiceStatus}>
      {`${status[0].toUpperCase()}${status.slice(1).toLowerCase()}`}
    </div>
  );
};

export default InvoiceStatus;
