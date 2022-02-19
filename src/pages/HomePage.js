import { useSelector } from 'react-redux';
import Header from '../components/Header/Header';
import InvoicesList from '../components/Invoices/InvoicesList/InvoicesList';
import NoInvoicesFound from '../components/Invoices/NoInvoicesFound/NoInvoicesFound';

const HomePage = () => {
  const invoicesCount = useSelector(
    (state) => state.invoices.invoicesList.length
  );
  const isLoadingInvoices = useSelector(
    (state) => state.invoices.isLoadingData
  );

  return (
    <>
      <Header />
      {!isLoadingInvoices &&
        (invoicesCount > 0 ? <InvoicesList /> : <NoInvoicesFound />)}
    </>
  );
};

export default HomePage;
