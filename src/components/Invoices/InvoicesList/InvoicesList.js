import { useSelector } from 'react-redux';
import InvoiceListItem from '../InvoiceListItem/InvoiceListItem';

const InvoicesList = () => {
  const invoicesList = useSelector((state) => state.invoices.invoicesList);

  return (
    <ul>
      {invoicesList.map((invoiceListItem) => (
        <InvoiceListItem key={invoiceListItem.id} {...invoiceListItem} />
      ))}
    </ul>
  );
};

export default InvoicesList;
