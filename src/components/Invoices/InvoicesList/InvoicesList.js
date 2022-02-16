import InvoiceItem from '../InvoiceItem/InvoiceItem';

const InvoicesList = (props) => {
  const { invoicesData } = props;

  return (
    <ul>
      {invoicesData.map((invoiceItem, index) => (
        <InvoiceItem key={index} {...invoiceItem} />
      ))}
    </ul>
  );
};

export default InvoicesList;
