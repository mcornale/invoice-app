import { Link, useParams } from 'react-router-dom';
import InvoiceActions from '../components/Invoices/InvoiceActions/InvoiceActions';
import InvoiceDetails from '../components/Invoices/InvoiceDetails/InvoiceDetails';
import arrowLeftIconSrc from '../assets/icons/icon-arrow-left.svg';
import Button from '../components/UI/Button/Button';
import { useSelector } from 'react-redux';

const InvoicePage = () => {
  const { invoiceId } = useParams();

  const currentInvoice = useSelector((state) =>
    state.invoices.invoicesList.find((invoice) => invoice.id === invoiceId)
  );

  return (
    <>
      <Link to='/'>
        <Button iconSrc={arrowLeftIconSrc} text='Go back' />
      </Link>
      <InvoiceActions status={currentInvoice.status} />
      <InvoiceDetails {...currentInvoice} />
    </>
  );
};

export default InvoicePage;
