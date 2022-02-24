import StandOutContainer from '../../StandOutContainer/StandOutContainer';
import styles from './InvoiceDetails.module.css';
import InvoiceId from '../InvoiceId/InvoiceId';
import formatTotal from '../../../helpers/formatTotal';
import formatDate from '../../../helpers/formatDate';

const InvoiceDetails = (props) => {
  const { currentInvoice } = props;

  return (
    <StandOutContainer>
      <section className={styles.invoiceDetails}>
        <div>
          <div className={styles.invoiceIdAndDescription}>
            <h3>
              <InvoiceId id={currentInvoice.id} />
            </h3>
            <p>{currentInvoice.description}</p>
          </div>
          <div className={styles.invoiceSenderAddress}>
            <p>{currentInvoice.senderAddress.street}</p>
            <p>{currentInvoice.senderAddress.city}</p>
            <p>{currentInvoice.senderAddress.postCode}</p>
            <p>{currentInvoice.senderAddress.country}</p>
          </div>
        </div>
        <div>
          <div className={styles.invoiceDates}>
            <div className={styles.invoiceCreationDate}>
              <p>Invoice Date</p>
              <h3>{formatDate(new Date(currentInvoice.createdAt))}</h3>
            </div>
            <div className={styles.invoicePaymentDue}>
              <p>Payment Due</p>
              <h3>{formatDate(new Date(currentInvoice.paymentDue))}</h3>
            </div>
          </div>
          <div>
            <div className={styles.invoiceBillInfo}>
              <p>Bill To</p>
              <h3>{currentInvoice.clientName}</h3>
            </div>
            <div className={styles.invoiceClientAddress}>
              <p>{currentInvoice.clientAddress.street}</p>
              <p>{currentInvoice.clientAddress.city}</p>
              <p>{currentInvoice.clientAddress.postCode}</p>
              <p>{currentInvoice.clientAddress.country}</p>
            </div>
          </div>
          <div className={styles.invoiceClientEmai}>
            <p>Sent To</p>
            <h3>{currentInvoice.clientEmail}</h3>
          </div>
        </div>
        <div className={styles.invoiceItems}>
          <table className={styles.invoiceItemsTable}>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {currentInvoice.items.map((item, index) => (
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
              {formatTotal(currentInvoice.total)}
            </p>
          </div>
        </div>
      </section>
    </StandOutContainer>
  );
};

export default InvoiceDetails;
