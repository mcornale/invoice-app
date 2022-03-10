import { useSelector } from 'react-redux';
import Header from '../components/Layout/Header/Header';
import InvoicesList from '../components/Invoices/InvoiceList/InvoiceList';
import NoInvoicesFound from '../components/Invoices/NoInvoicesFound/NoInvoicesFound';
import { Outlet } from 'react-router-dom';

const InvoicesPage = () => {
  const invoicesCount = useSelector(
    (state) => state.invoices.invoicesList.length
  );

  const isLoadingInvoices = useSelector(
    (state) => state.invoices.isLoadingInvoices
  );

  return (
    <>
      <Header />
      {isLoadingInvoices && <p>Loading...</p>}
      {!isLoadingInvoices &&
        (invoicesCount > 0 ? <InvoicesList /> : <NoInvoicesFound />)}
      <Outlet />
    </>
  );
};

export default InvoicesPage;
