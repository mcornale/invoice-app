import { useAppSelector } from '../../../store/store';
import InvoiceListItem from '../InvoiceListItem/InvoiceListItem';

const InvoiceList = () => {
  const { invoiceList, invoiceListFilters } = useAppSelector(
    (state) => state.invoices
  );

  const filteredInvoiceList =
    invoiceListFilters.length > 0
      ? invoiceList!.filter((invoiceListItem) =>
          invoiceListFilters.includes(invoiceListItem.status)
        )
      : [];

  return (
    <ul>
      {filteredInvoiceList!.map((invoiceListItem) => (
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
