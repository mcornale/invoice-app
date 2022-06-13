import { useAppSelector } from '../../../store/store';
import InvoiceListItem from '../InvoiceListItem/InvoiceListItem';

const InvoiceList = () => {
  const invoiceList = useAppSelector((state) => state.invoices.invoiceList);

  return (
    <ul>
      {invoiceList!.map((invoiceListItem) => (
        <InvoiceListItem
          key={invoiceListItem.id}
          invoiceId={invoiceListItem.id}
          invoiceClientName={invoiceListItem.clientName}
          invoicePaymentDue={invoiceListItem.paymentDue}
          invoiceTotal={invoiceListItem.total}
          invoiceStatus={invoiceListItem.status}
        />
      ))}
    </ul>
  );
};

export default InvoiceList;
