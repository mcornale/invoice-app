import Container from '../../UI/Container/Container';
import InvoiceStatus from '../InvoiceStatus/InvoiceStatus';
import Button from '../../UI/Button/Button';
import styles from './InvoiceActions.module.css';
import { Link } from 'react-router-dom';

const InvoiceActions = (props) => {
  const { status } = props;

  return (
    <Container>
      <section className={styles.invoiceActionsContainer}>
        <div className={styles.invoiceStatus}>
          <p>Status</p>
          <InvoiceStatus status={status} />
        </div>
        <div className={styles.invoiceActions}>
          <Link to='edit'>
            <Button buttonStyle='2'>Edit</Button>
          </Link>
          <Link to='delete'>
            <Button buttonStyle='4'>Delete</Button>
          </Link>
          <Button buttonStyle='1'>Mark as Paid</Button>
        </div>
      </section>
    </Container>
  );
};

export default InvoiceActions;
