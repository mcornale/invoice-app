import styles from './InvoiceId.module.css';

const InvoiceId = (props) => {
  const { id } = props;

  return <span className={styles.invoiceId}>{id}</span>;
};

export default InvoiceId;
