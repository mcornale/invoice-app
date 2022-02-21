import { Link, useParams } from 'react-router-dom';
import InvoiceActions from '../components/Invoices/InvoiceActions/InvoiceActions';
import InvoiceDetails from '../components/Invoices/InvoiceDetails/InvoiceDetails';
import Button from '../components/Button/Button';
import { useSelector } from 'react-redux';
import Modal from '../components/Modal/Modal';
import SideForm from '../components/SideWindow/SideForm/SideForm';
import Icon from '../components/Icon/Icon';

const InvoicePage = () => {
  const { invoiceId } = useParams();

  const currentInvoice = useSelector((state) =>
    state.invoices.invoicesList.find((invoice) => invoice.id === invoiceId)
  );

  return (
    <>
      <Link to='/'>
        <Button icon={<Icon icon='arrowLeft' />} text='Go back' />
      </Link>
      <InvoiceActions status={currentInvoice.status} />
      <InvoiceDetails {...currentInvoice} />
    </>
  );
};

export default InvoicePage;
