import Header from '../components/Header/Header';
import InvoicesList from '../components/Invoices/InvoicesList/InvoicesList';
import invoicesData from '../assets/data/data.json';
import NoInvoicesFound from '../components/Invoices/NoInvoicesFound/NoInvoicesFound';

const HomePage = () => {
  return (
    <>
      <Header />
      {invoicesData.length > 0 ? (
        <InvoicesList invoicesData={invoicesData} />
      ) : (
        <NoInvoicesFound />
      )}
    </>
  );
};

export default HomePage;
