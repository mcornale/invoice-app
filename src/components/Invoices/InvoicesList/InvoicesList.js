import InvoiceListItem from '../InvoiceListItem/InvoiceListItem';

const InvoicesList = (props) => {
  const { invoicesData } = props;

  return (
    <ul>
      {invoicesData.map((invoiceListItem, index) => (
        <InvoiceListItem key={index} {...invoiceListItem} />
      ))}
    </ul>
  );
};

export default InvoicesList;
