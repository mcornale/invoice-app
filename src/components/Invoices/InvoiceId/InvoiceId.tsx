import styles from './InvoiceId.module.css';

type Props = {
  id: string;
};

const InvoiceId = (props: Props) => {
  const { id } = props;

  return <span className={styles.invoiceId}>{id}</span>;
};

export default InvoiceId;
