import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import InvoiceForm from '../components/Invoices/InvoiceForm/InvoiceForm';
import Modal from '../components/UI/Modal/Modal';
import { getInvoiceById } from '../store/invoicesSlice';

const InvoiceFormPage = () => {
  const navigate = useNavigate();

  const isInvoiceListFetched = useSelector(
    (state) => state.invoices.isInvoiceListFetched
  );

  const { invoiceId } = useParams();
  const currentInvoice = useSelector((state) =>
    getInvoiceById(state, invoiceId)
  );

  useEffect(() => {
    if (!isInvoiceListFetched) navigate(-1);
  }, [isInvoiceListFetched, navigate]);

  return (
    <>
      {isInvoiceListFetched && (
        <Modal>
          <InvoiceForm invoice={currentInvoice} />
        </Modal>
      )}
    </>
  );
};

export default InvoiceFormPage;
