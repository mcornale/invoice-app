import { useSelector } from 'react-redux';
import InvoicesListItem from '../InvoicesListItem/InvoicesListItem';

const InvoicesList = () => {
  const invoicesList = useSelector((state) => state.invoices.invoicesList);

  return (
    <ul>
      {invoicesList.map((invoiceListItem) => (
        <InvoicesListItem key={invoiceListItem.id} {...invoiceListItem} />
      ))}
    </ul>
  );
};

export default InvoicesList;
