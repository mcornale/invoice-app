import styles from './DeleteInvoice.module.css';
import Button from '../../UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteInvoice } from '../../../store/invoicesSlice';

const DeleteInvoice = (props) => {
  const { currentInvoiceId } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancelBtnClick = () => {
    navigate(-1);
  };

  const handleDeleteBtnClick = () => {
    navigate(-2);
    dispatch(deleteInvoice(currentInvoiceId));
  };

  return (
    <div className={styles.deleteInvoice}>
      <h2 className={styles.deleteInvoiceTitle}>Confirm Deletion</h2>
      <p className={styles.deleteInvoiceMessage}>
        Are you sure you want to delete invoice #{currentInvoiceId}? This action
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
    </div>
  );
};

export default DeleteInvoice;
