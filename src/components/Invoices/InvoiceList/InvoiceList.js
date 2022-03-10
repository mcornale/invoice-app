import { useSelector } from 'react-redux';
import InvoiceListItem from '../InvoiceListItem/InvoiceListItem';

const InvoiceList = () => {
  const invoiceList = useSelector((state) => state.invoices.invoiceList);

  return (
    <ul>
      {invoiceList.map((invoiceListItem) => (
        <InvoiceListItem key={invoiceListItem.id} {...invoiceListItem} />
      ))}
    </ul>
  );
};

export default InvoiceList;
