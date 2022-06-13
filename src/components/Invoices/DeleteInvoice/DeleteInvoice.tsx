import styles from './DeleteInvoice.module.css';
import Button from '../../UI/Button/Button';
import Container from '../../UI/Container/Container';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteInvoice } from '../../../store/invoicesSlice';

type Props = {
  invoiceId: string;
};

const DeleteInvoice = (props: Props) => {
  const { invoiceId } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancelBtnClick = () => {
    navigate(-1);
  };

  const handleDeleteBtnClick = () => {
    navigate(-2);
    dispatch(deleteInvoice(invoiceId));
  };

  return (
    <div className={styles.deleteInvoice}>
      <Container>
        <h2 className={styles.deleteInvoiceTitle}>Confirm Deletion</h2>
        <p className={styles.deleteInvoiceMessage}>
          Are you sure you want to delete invoice #{invoiceId}? This action
          cannot be undone.
        </p>
        <div className={styles.deleteInvoiceActions}>
          <Button onClick={handleCancelBtnClick} buttonStyle='2'>
            Cancel
          </Button>
          <Button onClick={handleDeleteBtnClick} buttonStyle='4'>
            Delete
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default DeleteInvoice;
