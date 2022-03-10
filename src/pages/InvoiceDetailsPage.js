import { Link, Outlet, useParams } from 'react-router-dom';
import InvoiceActions from '../components/Invoices/InvoiceActions/InvoiceActions';
import InvoiceDetails from '../components/Invoices/InvoiceDetails/InvoiceDetails';
import Button from '../components/UI/Button/Button';
import { useSelector } from 'react-redux';
import Icon from '../components/UI/Icon';
import { getInvoiceById } from '../store/invoicesSlice';

const InvoiceDetailsPage = () => {
  const isLoadingInvoices = useSelector(
    (state) => state.invoices.isLoadingInvoices
  );

  const { invoiceId } = useParams();

  const currentInvoice = useSelector((state) =>
    getInvoiceById(state, invoiceId)
  );

  return (
    <>
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
      <Outlet />
    </>
  );
};

export default InvoiceDetailsPage;
