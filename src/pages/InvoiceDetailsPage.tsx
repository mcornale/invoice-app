import { Outlet, useNavigate, useParams } from 'react-router-dom';
import InvoiceActions from '../components/Invoices/InvoiceActions/InvoiceActions';
import InvoiceDetails from '../components/Invoices/InvoiceDetails/InvoiceDetails';
import Button from '../components/UI/Button/Button';
import Icon from '../components/UI/Icon';
import { getInvoiceById } from '../store/invoicesSlice';
import { useAppSelector } from '../store/store';

const InvoiceDetailsPage = () => {
  const navigate = useNavigate();

  const isLoadingInvoices = useAppSelector(
    (state) => state.invoices.isLoadingInvoices
  );

  const { invoiceId } = useParams();
  const currentInvoice = useAppSelector((state) =>
    getInvoiceById(state, invoiceId)
  );

  const handleGoBackBtnClick = () => {
    navigate(-1);
  };

  return (
    <>
      {isLoadingInvoices && <p>Loading...</p>}
      {!isLoadingInvoices && currentInvoice && (
        <>
          <Button
            onClick={handleGoBackBtnClick}
            icon={<Icon icon='arrowLeft' />}
          >
            Go back
          </Button>
          <InvoiceActions status={currentInvoice.status} />
          <InvoiceDetails
            invoiceId={currentInvoice.id}
            invoiceDescription={currentInvoice.description}
            invoiceSenderAddress={currentInvoice.senderAddress}
            invoiceClientAddress={currentInvoice.clientAddress}
            invoiceDate={currentInvoice.createdAt}
            invoicePaymentDue={currentInvoice.paymentDue}
            invoiceClientName={currentInvoice.clientName}
            invoiceClientEmail={currentInvoice.clientEmail}
            invoiceItems={currentInvoice.items}
            invoiceTotal={currentInvoice.total}
          />
        </>
      )}
      <Outlet />
    </>
  );
};

export default InvoiceDetailsPage;
