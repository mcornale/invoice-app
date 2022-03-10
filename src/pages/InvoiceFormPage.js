import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import InvoiceForm from '../components/Invoices/InvoiceForm/InvoiceForm';
import Modal from '../components/UI/Modal/Modal';
import { getInvoiceById } from '../store/invoicesSlice';

const InvoiceFormPage = () => {
  const navigate = useNavigate();
  const invoices = useSelector((state) => state.invoices.invoiceList);

  const { invoiceId } = useParams();
  const currentInvoice = useSelector((state) =>
    getInvoiceById(state, invoiceId)
  );

  useEffect(() => {
    if (!invoices) navigate(-1);
  }, [invoices, navigate]);

  return (
    <Modal>
      <InvoiceForm currentInvoice={currentInvoice} />
    </Modal>
  );
};

export default InvoiceFormPage;
