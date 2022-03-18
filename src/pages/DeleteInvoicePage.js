import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteInvoice from '../components/Invoices/DeleteInvoice/DeleteInvoice';
import Modal from '../components/UI/Modal/Modal';

const DeleteInvoicePage = () => {
  const navigate = useNavigate();
  const isInvoiceListFetched = useSelector(
    (state) => state.invoices.isInvoiceListFetched
  );

  const { invoiceId } = useParams();

  useEffect(() => {
    if (!isInvoiceListFetched) navigate(-1);
  }, [isInvoiceListFetched, navigate]);

  return (
    <>
      {isInvoiceListFetched && (
        <Modal hideSideBar>
          <DeleteInvoice invoiceId={invoiceId} />
        </Modal>
      )}
    </>
  );
};

export default DeleteInvoicePage;
