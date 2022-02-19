import StandOutContainer from '../../UI/StandOutContainer/StandOutContainer';
import InvoiceStatus from '../InvoiceStatus/InvoiceStatus';
import Button from '../../UI/Button/Button';
import styles from './InvoiceActions.module.css';

const InvoiceActions = (props) => {
  const { status } = props;

  return (
    <StandOutContainer>
      <section className={styles.invoiceActionsContainer}>
        <div className={styles.invoiceStatus}>
          <p>Status</p>
          <InvoiceStatus status={status} />
        </div>
        <div className={styles.invoiceActions}>
          <Button buttonStyle='2' text='Edit' />
          <Button buttonStyle='4' text='Delete' />
          <Button buttonStyle='1' text='Mark as Paid' />
        </div>
      </section>
    </StandOutContainer>
  );
};

export default InvoiceActions;
