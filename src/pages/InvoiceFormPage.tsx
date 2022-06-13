import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InvoiceForm from '../components/Invoices/InvoiceForm/InvoiceForm';
import Modal from '../components/UI/Modal/Modal';
import { getInvoiceById } from '../store/invoicesSlice';
import { useAppSelector } from '../store/store';

const InvoiceFormPage = () => {
  const navigate = useNavigate();

  const isInvoiceListFetched = useAppSelector(
    (state) => state.invoices.isInvoiceListFetched
  );

  const { invoiceId } = useParams();
  const currentInvoice = useAppSelector((state) =>
    getInvoiceById(state, invoiceId)
  );

  useEffect(() => {
    if (!isInvoiceListFetched) navigate(-1);
  }, [isInvoiceListFetched, navigate]);

  return (
    <>
      {isInvoiceListFetched && (
        <Modal>
          <InvoiceForm invoice={currentInvoice!} />
        </Modal>
      )}
    </>
  );
};

export default InvoiceFormPage;
