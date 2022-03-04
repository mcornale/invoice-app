import { Link, useParams } from 'react-router-dom';
import InvoiceActions from '../components/Invoices/InvoiceActions/InvoiceActions';
import InvoiceDetails from '../components/Invoices/InvoiceDetails/InvoiceDetails';
import Button from '../components/UI/Button/Button';
import { useSelector } from 'react-redux';

import Icon from '../components/UI/Icon/Icon';
import Modal from '../components/UI/Modal/Modal';
import InvoiceForm from '../components/InvoiceFormWindow/InvoiceForm/InvoiceForm';

const InvoicePage = () => {
  const isLoadingInvoices = useSelector(
    (state) => state.sideForm.isLoadingInvoices
  );

  const { invoiceId } = useParams();

  const currentInvoice = useSelector((state) =>
    state.invoices.invoicesList.find((invoice) => invoice.id === invoiceId)
  );

  const isEditInvoiceFormVisible = useSelector(
    (state) => state.sideForm.isEditInvoiceFormVisible
  );

  return (
    <>
      {isEditInvoiceFormVisible && (
        <Modal>
          <InvoiceForm />
        </Modal>
      )}
      {isLoadingInvoices && <p>Loading...</p>}
      {!isLoadingInvoices && currentInvoice && (
        <>
          <Link to='/'>
            <Button icon={<Icon icon='arrowLeft' />} text='Go back' />
          </Link>
          <InvoiceActions status={currentInvoice.status} />
          <InvoiceDetails currentInvoice={currentInvoice} />
        </>
      )}
    </>
  );
};

export default InvoicePage;
