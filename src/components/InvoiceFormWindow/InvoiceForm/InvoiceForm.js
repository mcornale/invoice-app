import styles from './InvoiceForm.module.css';
import InvoiceId from '../../Invoices/InvoiceId/InvoiceId';
import InputGroup from '../../UI/InputGroup/InputGroup';
import Button from '../../UI/Button/Button';
import { useEffect, useRef, useState } from 'react';
import { INVOICE_FORM_MODES } from '../../../constants/invoice-form-modes';
import InvoiceFormItemList from '../InvoiceFormItemList/InvoiceFormItemList';
import useScrollPosition from '../../../hooks/useScrollPosition';
import { PAYMENT_TERMS_OPTIONS } from '../../../constants/payment-terms-options';
import useInput from '../../../hooks/useInput';

const InvoiceForm = (props) => {
  const { currentInvoice } = props;

  //check scrolling position and change invoice form style according to that
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

  //check form mode
  const activeMode = currentInvoice
    ? INVOICE_FORM_MODES.EDIT_INVOICE
    : INVOICE_FORM_MODES.NEW_INVOICE;

  //inputs
  const senderAddressStreet = useInput(currentInvoice?.senderAddress.street);
  const senderAddressCity = useInput(currentInvoice?.senderAddress.city);
  const senderAddressPostCode = useInput(
    currentInvoice?.senderAddress.postCode
  );
  const senderAddressCountry = useInput(currentInvoice?.senderAddress.country);
  const clientName = useInput(currentInvoice?.clientName);
  const clientEmail = useInput(currentInvoice?.clientEmail);
  const clientAddressStreet = useInput(currentInvoice?.clientAddress.street);
  const clientAddressCity = useInput(currentInvoice?.clientAddress.city);
  const clientAddressPostCode = useInput(
    currentInvoice?.clientAddress.postCode
  );
  const clientAddressCountry = useInput(currentInvoice?.clientAddress.country);
  const invoiceDate = useInput(
    activeMode === INVOICE_FORM_MODES.NEW_INVOICE
      ? new Date()
      : currentInvoice?.createdAt
  );
  const paymentTerms = useInput(
    activeMode === INVOICE_FORM_MODES.NEW_INVOICE
      ? PAYMENT_TERMS_OPTIONS[PAYMENT_TERMS_OPTIONS.length - 1]
      : currentInvoice?.paymentTerms
  );
  const projectDescription = useInput(currentInvoice?.description);

  //item list
  const [itemList, setItemList] = useState(currentInvoice?.items ?? []);

  //when item list changes scroll to bottom
  useEffect(() => {
    invoiceFormRef.current.scrollTo(0, invoiceFormRef.current.scrollHeight);
  }, [itemList]);

  //submit form
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
              Edit <InvoiceId id={currentInvoice.id} />
            </>
          )}
        </h2>
        <div>
          <section className={styles.invoiceFormSection}>
            <h4 className={styles.invoiceFormSectionTitle}>Bill From</h4>
            <InputGroup
              label='Street Address'
              type='text'
              value={senderAddressStreet.inputValue}
              onChange={senderAddressStreet.handleInputValueChange}
            />
            <div className={styles.invoiceFormInputsRow}>
              <InputGroup
                label='City'
                type='text'
                value={senderAddressCity.inputValue}
                onChange={senderAddressCity.handleInputValueChange}
              />
              <InputGroup
                label='Post Code'
                type='text'
                value={senderAddressPostCode.inputValue}
                onChange={senderAddressPostCode.handleInputValueChange}
              />
              <InputGroup
                label='Country'
                type='text'
                value={senderAddressCountry.inputValue}
                onChange={senderAddressCountry.handleInputValueChange}
              />
            </div>
          </section>
          <section className={styles.invoiceFormSection}>
            <h4 className={styles.invoiceFormSectionTitle}>Bill To</h4>
            <InputGroup
              label="Client's Name"
              type='text'
              value={clientName.inputValue}
              onChange={clientName.handleInputValueChange}
            />
            <InputGroup
              label="Client's Email"
              type='email'
              value={clientEmail.inputValue}
              onChange={clientEmail.handleInputValueChange}
            />
            <InputGroup
              label='Street Address'
              type='text'
              value={clientAddressStreet.inputValue}
              onChange={clientAddressStreet.handleInputValueChange}
            />
            <div className={styles.invoiceFormInputsRow}>
              <InputGroup
                label='City'
                type='text'
                value={clientAddressCity.inputValue}
                onChange={clientAddressCity.handleInputValueChange}
              />
              <InputGroup
                label='Post Code'
                type='text'
                value={clientAddressPostCode.inputValue}
                onChange={clientAddressPostCode.handleInputValueChange}
              />
              <InputGroup
                label='Country'
                type='text'
                value={clientAddressCountry.inputValue}
                onChange={clientAddressCountry.handleInputValueChange}
              />
            </div>
            <div className={styles.invoiceFormInputsRow}>
              <InputGroup
                label='Invoice Date'
                type='date'
                value={invoiceDate.inputValue}
                onChange={invoiceDate.handleInputValueChange}
                disabled={currentInvoice !== undefined}
              />
              <InputGroup
                label='Payment Terms'
                type='select'
                options={PAYMENT_TERMS_OPTIONS}
                value={paymentTerms.inputValue}
                onChange={paymentTerms.handleInputValueChange}
              />
            </div>
            <InputGroup
              label='Project Description'
              type='text'
              value={projectDescription.inputValue}
              onChange={projectDescription.handleInputValueChange}
            />
          </section>
          <InvoiceFormItemList itemList={itemList} setItemList={setItemList} />
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
