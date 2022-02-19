import { Link, useParams } from 'react-router-dom';
import invoicesData from '../assets/data/data.json';
import InvoiceActions from '../components/Invoices/InvoiceActions/InvoiceActions';
import InvoiceDetails from '../components/Invoices/InvoiceDetails/InvoiceDetails';
import arrowLeftIconSrc from '../assets/icons/icon-arrow-left.svg';
import Button from '../components/UI/Button/Button';

const InvoicePage = () => {
  const { invoiceId } = useParams();

  const currentInvoice = invoicesData.find(
    (invoice) => invoice.id === invoiceId
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
