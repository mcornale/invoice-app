import Container from '../../UI/Container/Container';
import styles from './InvoiceDetails.module.css';
import InvoiceId from '../InvoiceId/InvoiceId';
import formatTotal from '../../../helpers/formatTotal';
import formatDate from '../../../helpers/formatDate';
import { InvoiceAddress, InvoiceItems } from '../../../types/invoice-types';

type Props = {
  invoiceId: string;
  invoiceSenderAddress: InvoiceAddress;
  invoiceClientAddress: InvoiceAddress;
  invoiceClientEmail: string;
  invoiceClientName: string;
  invoiceDate: string;
  invoicePaymentDue: string;
  invoiceDescription: string;
  invoiceItems: InvoiceItems;
  invoiceTotal: number;
};

const InvoiceDetails = (props: Props) => {
  const {
    invoiceId,
    invoiceDescription,
    invoiceSenderAddress,
    invoiceClientAddress,
    invoiceDate,
    invoicePaymentDue,
    invoiceClientName,
    invoiceClientEmail,
    invoiceItems,
    invoiceTotal,
  } = props;

  return (
    <Container>
      <section className={styles.invoiceDetails}>
        <div className={styles.invoiceDetailsRow}>
          <div className={styles.invoiceIdAndDescription}>
            <h3>
              <InvoiceId id={invoiceId} />
            </h3>
            <p>{invoiceDescription}</p>
          </div>
          <div className={styles.invoiceSenderAddress}>
            <p>{invoiceSenderAddress.street}</p>
            <p>{invoiceSenderAddress.city}</p>
            <p>{invoiceSenderAddress.postCode}</p>
            <p>{invoiceSenderAddress.country}</p>
          </div>
        </div>
        <div className={styles.invoiceDetailsRow}>
          <div className={styles.invoiceDates}>
            <div className={styles.invoiceCreationDate}>
              <p>Invoice Date</p>
              <h3>{formatDate(new Date(invoiceDate))}</h3>
            </div>
            <div className={styles.invoicePaymentDue}>
              <p>Payment Due</p>
              <h3>{formatDate(new Date(invoicePaymentDue))}</h3>
            </div>
          </div>
          <div>
            <div className={styles.invoiceBillInfo}>
              <p>Bill To</p>
              <h3>{invoiceClientName}</h3>
            </div>
            <div className={styles.invoiceClientAddress}>
              <p>{invoiceClientAddress.street}</p>
              <p>{invoiceClientAddress.city}</p>
              <p>{invoiceClientAddress.postCode}</p>
              <p>{invoiceClientAddress.country}</p>
            </div>
          </div>
          <div className={styles.invoiceClientEmai}>
            <p>Sent To</p>
            <h3>{invoiceClientEmail}</h3>
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
              {invoiceItems.map((item, index) => (
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
              {formatTotal(invoiceTotal)}
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default InvoiceDetails;
