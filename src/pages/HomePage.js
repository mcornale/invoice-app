import { useSelector } from 'react-redux';
import Header from '../components/Header/Header';
import InvoicesList from '../components/Invoices/InvoicesList/InvoicesList';
import NoInvoicesFound from '../components/Invoices/NoInvoicesFound/NoInvoicesFound';
import SideForm from '../components/SideForm/SideForm';
import Modal from '../components/Modal/Modal';

const HomePage = () => {
  const invoicesCount = useSelector(
    (state) => state.invoices.invoicesList.length
  );
  const isLoadingInvoices = useSelector(
    (state) => state.invoices.isLoadingData
  );

  const isNewInvoiceFormVisible = useSelector(
    (state) => state.sideForm.isNewInvoiceFormVisible
  );

  return (
    <>
      {isNewInvoiceFormVisible && (
        <Modal>
          <SideForm />
        </Modal>
      )}
      <Header />
      {!isLoadingInvoices &&
        (invoicesCount > 0 ? <InvoicesList /> : <NoInvoicesFound />)}
    </>
  );
};

export default HomePage;
