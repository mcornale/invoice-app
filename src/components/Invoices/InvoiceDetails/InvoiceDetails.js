import StandOutContainer from '../../StandOutContainer/StandOutContainer';
import styles from './InvoiceDetails.module.css';
import InvoiceId from '../InvoiceId/InvoiceId';
import formatTotal from '../../../helpers/formatTotal';
import formatDate from '../../../helpers/formatDate';

const InvoiceDetails = (props) => {
  const {
    id,
    description,
    senderAddress: {
      city: senderCity,
      country: senderCountry,
      postCode: senderPostCode,
      street: senderStreet,
    },
    createdAt,
    paymentDue,
    clientName,
    clientAddress: {
      city: clientCity,
      country: clientCountry,
      postCode: clientPostCode,
      street: clientStreet,
    },
    clientEmail,
    items,
    total,
  } = props;

  return (
    <StandOutContainer>
      <section className={styles.invoiceDetails}>
        <div>
          <div className={styles.invoiceIdAndDescription}>
            <h3 className={styles.invoiceId}>
              <InvoiceId id={id} />
            </h3>
            <p>{description}</p>
          </div>
          <div className={styles.invoiceSenderAddress}>
            <p>{senderStreet}</p>
            <p>{senderCity}</p>
            <p>{senderPostCode}</p>
            <p>{senderCountry}</p>
          </div>
        </div>
        <div>
          <div className={styles.invoiceDates}>
            <div className={styles.invoiceCreationDate}>
              <p>Invoice Date</p>
              <h3>{formatDate(new Date(createdAt))}</h3>
            </div>
            <div className={styles.invoicePaymentDue}>
              <p>Payment Due</p>
              <h3>{formatDate(new Date(paymentDue))}</h3>
            </div>
          </div>
          <div>
            <div className={styles.invoiceBillInfo}>
              <p>Bill To</p>
              <h3>{clientName}</h3>
            </div>
            <div className={styles.invoiceClientAddress}>
              <p>{clientStreet}</p>
              <p>{clientCity}</p>
              <p>{clientPostCode}</p>
              <p>{clientCountry}</p>
            </div>
          </div>
          <div className={styles.invoiceClientEmai}>
            <p>Sent To</p>
            <h3>{clientEmail}</h3>
          </div>
        </div>
        <div className={styles.invoiceItems}>
          <table className={styles.invoiceItemsTable}>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>QTY.</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className={styles.invoiceItemName}>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{formatTotal(item.price)}</td>
                  <td className={styles.invoiceItemTotal}>
                    {formatTotal(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.invoiceItemsTotal}>
            <p className={styles.invoiceItemsTotalLabel}>Amount Due</p>
            <p className={styles.invoiceItemsTotalValue}>
              {formatTotal(total)}
            </p>
          </div>
        </div>
      </section>
    </StandOutContainer>
  );
};

export default InvoiceDetails;
