import Container from '../../UI/Container/Container';
import InvoiceStatus from '../InvoiceStatus/InvoiceStatus';
import Button from '../../UI/Button/Button';
import styles from './InvoiceActions.module.css';
import { useDispatch } from 'react-redux';
import { showEditInvoiceForm } from '../../../store/sideFormSlice';

const InvoiceActions = (props) => {
  const { status } = props;

  const dispatch = useDispatch();

  const handleEditBtnClick = () => {
    dispatch(showEditInvoiceForm());
  };

  return (
    <Container>
      <section className={styles.invoiceActionsContainer}>
        <div className={styles.invoiceStatus}>
          <p>Status</p>
          <InvoiceStatus status={status} />
        </div>
        <div className={styles.invoiceActions}>
          <Button onClick={handleEditBtnClick} buttonStyle='2' text='Edit' />
          <Button buttonStyle='4' text='Delete' />
          <Button buttonStyle='1' text='Mark as Paid' />
        </div>
      </section>
    </Container>
  );
};

export default InvoiceActions;
