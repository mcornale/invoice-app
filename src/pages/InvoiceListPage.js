import { useSelector } from 'react-redux';
import InvoicesList from '../components/Invoices/InvoiceList/InvoiceList';
import NoInvoicesFound from '../components/Invoices/NoInvoicesFound/NoInvoicesFound';
import { Outlet } from 'react-router-dom';
import InvoiceListHeader from '../components/Invoices/InvoiceListHeader/InvoiceListHeader';

const InvoiceListPage = () => {
  const invoicesCount = useSelector(
    (state) => state.invoices.invoiceList?.length
  );

  const isLoadingInvoices = useSelector(
    (state) => state.invoices.isLoadingInvoices
  );

  return (
    <>
      <InvoiceListHeader />
      {isLoadingInvoices && <p>Loading...</p>}
      {!isLoadingInvoices &&
        (invoicesCount > 0 ? <InvoicesList /> : <NoInvoicesFound />)}
      <Outlet />
    </>
  );
};

export default InvoiceListPage;
