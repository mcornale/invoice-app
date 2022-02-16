import Header from '../components/Header/Header';
import InvoicesList from '../components/InvoicesList/InvoicesList';
import invoicesData from '../assets/data/data.json';
import NoInvoicesFound from '../components/NoInvoicesFound/NoInvoicesFound';

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
