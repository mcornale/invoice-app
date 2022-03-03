import styles from './InvoiceForm.module.css';
import InvoiceId from '../../Invoices/InvoiceId/InvoiceId';
import InputGroup from '../../UI/InputGroup/InputGroup';
import Button from '../../UI/Button/Button';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { INVOICE_FORM_MODES } from '../../../constants/invoice-form-modes';
import { useParams } from 'react-router-dom';
import InvoiceFormItemList from '../InvoiceFormItemList/InvoiceFormItemList';
import useScrollPosition from '../../../hooks/useScrollPosition';
import { PAYMENT_TERMS_OPTIONS } from '../../../constants/payment-terms-options';

const InvoiceForm = () => {
  const invoiceFormClassName = [styles.invoiceForm];
  const invoiceFormRef = useRef();
  const invoiceFormScrollPosition = useScrollPosition(invoiceFormRef);

  if (invoiceFormRef.current && invoiceFormScrollPosition > 0)
    invoiceFormClassName.push(styles.invoiceFormWithTopGradient);

  if (
    invoiceFormRef.current &&
    invoiceFormScrollPosition <
      invoiceFormRef.current.scrollHeight - invoiceFormRef.current.clientHeight
  )
    invoiceFormClassName.push(styles.invoiceFormWithBottomGradient);

  const { invoiceId } = useParams();

  const currentInvoice = useSelector((state) =>
    state.invoices.invoicesList.find((invoice) => invoice.id === invoiceId)
  );

  const activeMode = currentInvoice
    ? INVOICE_FORM_MODES.EDIT_INVOICE
    : INVOICE_FORM_MODES.NEW_INVOICE;

  const handleInvoiceFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.invoiceFormContainer}>
      <form
        onSubmit={handleInvoiceFormSubmit}
        className={invoiceFormClassName.join(' ')}
        ref={invoiceFormRef}
      >
        <h2 className={styles.invoiceFormTitle}>
          {activeMode === INVOICE_FORM_MODES.NEW_INVOICE && 'New Invoice'}
          {activeMode === INVOICE_FORM_MODES.EDIT_INVOICE && (
            <>
              Edit <InvoiceId id={invoiceId} />
            </>
          )}
        </h2>
        <div>
          <section className={styles.invoiceFormSection}>
            <h4 className={styles.invoiceFormSectionTitle}>Bill From</h4>
            <InputGroup
              label='Street Address'
              type='text'
              value={currentInvoice?.senderAddress.street}
            />
            <div className={styles.invoiceFormInputsRow}>
              <InputGroup
                label='City'
                type='text'
                value={currentInvoice?.senderAddress.city}
              />
              <InputGroup
                label='Post Code'
                type='text'
                value={currentInvoice?.senderAddress.postCode}
              />
              <InputGroup
                label='Country'
                type='text'
                value={currentInvoice?.senderAddress.country}
              />
            </div>
          </section>
          <section className={styles.invoiceFormSection}>
            <h4 className={styles.invoiceFormSectionTitle}>Bill To</h4>
            <InputGroup
              label="Client's Name"
              type='text'
              value={currentInvoice?.clientName}
            />
            <InputGroup
              label="Client's Email"
              type='email'
              value={currentInvoice?.clientEmail}
            />
            <InputGroup
              label='Street Address'
              type='text'
              value={currentInvoice?.clientAddress.street}
            />
            <div className={styles.invoiceFormInputsRow}>
              <InputGroup
                label='City'
                type='text'
                value={currentInvoice?.clientAddress.city}
              />
              <InputGroup
                label='Post Code'
                type='text'
                value={currentInvoice?.clientAddress.postCode}
              />
              <InputGroup
                label='Country'
                type='text'
                value={currentInvoice?.clientAddress.country}
              />
            </div>
            <div className={styles.invoiceFormInputsRow}>
              <InputGroup
                label='Invoice Date'
                type='date'
                value={currentInvoice?.createdAt}
              />
              <InputGroup
                label='Payment Terms'
                type='select'
                options={PAYMENT_TERMS_OPTIONS}
                value={currentInvoice?.paymentTerms}
              />
            </div>
            <InputGroup
              label='Project Description'
              type='text'
              value={currentInvoice?.description}
            />
          </section>
          <InvoiceFormItemList currentInvoice={currentInvoice} />
        </div>
        <section className={styles.invoiceFormSubmitSection}>
          {activeMode === INVOICE_FORM_MODES.NEW_INVOICE && (
            <>
              <Button
                style={{ marginRight: 'auto' }}
                text='Discard'
                buttonStyle='2'
              />
              <Button text='Save as Draft' buttonStyle='3' />
              <Button text='Save & Send' buttonStyle='1' />
            </>
          )}
          {activeMode === INVOICE_FORM_MODES.EDIT_INVOICE && (
            <>
              <Button text='Cancel' buttonStyle='2' />
              <Button text='Save Changes' buttonStyle='1' />
            </>
          )}
        </section>
      </form>
    </div>
  );
};

export default InvoiceForm;
