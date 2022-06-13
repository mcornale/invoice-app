import InvoicesList from '../components/Invoices/InvoiceList/InvoiceList';
import NoInvoicesFound from '../components/Invoices/NoInvoicesFound/NoInvoicesFound';
import { Outlet } from 'react-router-dom';
import InvoiceListHeader from '../components/Invoices/InvoiceListHeader/InvoiceListHeader';
import { useAppSelector } from '../store/store';

const InvoiceListPage = () => {
  const isLoadingInvoices = useAppSelector(
    (state) => state.invoices.isLoadingInvoices
  );

  const invoicesCount = useAppSelector(
    (state) => state.invoices.invoiceList?.length
  );

  return (
    <>
      <InvoiceListHeader />
      {isLoadingInvoices && <p>Loading...</p>}
      {!isLoadingInvoices &&
        (invoicesCount! > 0 ? <InvoicesList /> : <NoInvoicesFound />)}
      <Outlet />
    </>
  );
};

export default InvoiceListPage;
