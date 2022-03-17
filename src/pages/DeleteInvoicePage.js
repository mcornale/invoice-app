import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteInvoice from '../components/Invoices/DeleteInvoice/DeleteInvoice';
import Modal from '../components/UI/Modal/Modal';

const DeleteInvoicePage = () => {
  const navigate = useNavigate();
  const invoices = useSelector((state) => state.invoices.invoiceList);

  const { invoiceId } = useParams();

  useEffect(() => {
    if (!invoices) navigate(-1);
  }, [invoices, navigate]);

  return (
    <>
      {invoices && (
        <Modal hideSideBar>
          <DeleteInvoice currentInvoiceId={invoiceId} />
        </Modal>
      )}
    </>
  );
};

export default DeleteInvoicePage;
