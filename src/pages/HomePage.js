import { useSelector } from 'react-redux';
import Header from '../components/Layout/Header/Header';
import InvoicesList from '../components/Invoices/InvoiceList/InvoiceList';
import NoInvoicesFound from '../components/Invoices/NoInvoicesFound/NoInvoicesFound';
import InvoiceForm from '../components/InvoiceFormWindow/InvoiceForm/InvoiceForm';
import Modal from '../components/UI/Modal/Modal';

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
          <InvoiceForm />
        </Modal>
      )}
      <Header />
      {!isLoadingInvoices &&
        (invoicesCount > 0 ? <InvoicesList /> : <NoInvoicesFound />)}
    </>
  );
};

export default HomePage;
