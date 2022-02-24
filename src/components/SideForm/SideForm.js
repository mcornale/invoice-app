import styles from './SideForm.module.css';
import InvoiceId from '../Invoices/InvoiceId/InvoiceId';
import InputGroup from '../InputGroup/InputGroup';
import Button from '../Button/Button';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { SIDE_FORM_MODES } from '../../constants/side-form-modes';
import { useParams } from 'react-router-dom';
import SideFormItemList from './SideFormItemList/SideFormItemList';
import useScrollPosition from '../../hooks/useScrollPosition';

const SideForm = () => {
  const sideFormClassName = [styles.sideForm];

  const sideFormRef = useRef();
  const sideFormScrollPosition = useScrollPosition(sideFormRef);

  const billFromStreetAddrInputRef = useRef();
  const billFromCityInputRef = useRef();
  const billFromPostCodeInputRef = useRef();
  const billFromCountryInputRef = useRef();

  if (sideFormRef.current && sideFormScrollPosition > 0)
    sideFormClassName.push(styles.sideFormWithTopGradient);

  if (
    sideFormRef.current &&
    sideFormScrollPosition <
      sideFormRef.current.scrollHeight - sideFormRef.current.clientHeight
  )
    sideFormClassName.push(styles.sideFormWithBottomGradient);

  console.log(sideFormScrollPosition);

  const { invoiceId } = useParams();

  const currentInvoice = useSelector((state) =>
    state.invoices.invoicesList.find((invoice) => invoice.id === invoiceId)
  );

  const activeMode = currentInvoice
    ? SIDE_FORM_MODES.EDIT_INVOICE
    : SIDE_FORM_MODES.NEW_INVOICE;

  return (
    <div className={styles.sideFormWindow}>
      <form className={sideFormClassName.join(' ')} ref={sideFormRef}>
        <h2 className={styles.sideFormTitle}>
          {activeMode === SIDE_FORM_MODES.NEW_INVOICE && 'New Invoice'}
          {activeMode === SIDE_FORM_MODES.EDIT_INVOICE && (
            <>
              Edit <InvoiceId id={invoiceId} />
            </>
          )}
        </h2>
        <div>
          <section className={styles.sideFormSection}>
            <h4 className={styles.sideFormSectionTitle}>Bill From</h4>
            <InputGroup
              label='Street Address'
              type='text'
              value={currentInvoice?.senderAddress.street}
              ref={billFromStreetAddrInputRef}
            />
            <div className={styles.sideFormInputsRow}>
              <InputGroup
                label='City'
                type='text'
                value={currentInvoice?.senderAddress.city}
                ref={billFromCityInputRef}
              />
              <InputGroup
                label='Post Code'
                type='text'
                value={currentInvoice?.senderAddress.postCode}
                ref={billFromPostCodeInputRef}
              />
              <InputGroup
                label='Country'
                type='text'
                value={currentInvoice?.senderAddress.country}
                ref={billFromCountryInputRef}
              />
            </div>
          </section>
          <section className={styles.sideFormSection}>
            <h4 className={styles.sideFormSectionTitle}>Bill To</h4>
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
            <div className={styles.sideFormInputsRow}>
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
            <div className={styles.sideFormInputsRow}>
              <InputGroup
                label='Invoice Date'
                type='date'
                value={currentInvoice?.createdAt}
              />
              <InputGroup
                label='Payment Terms'
                type='date'
                value={currentInvoice?.paymentDue}
              />
            </div>
            <InputGroup
              label='Project Description'
              type='text'
              value={currentInvoice?.description}
            />
          </section>
          <SideFormItemList currentInvoice={currentInvoice} />
        </div>
        <section className={styles.sideFormSubmitSection}>
          {activeMode === SIDE_FORM_MODES.NEW_INVOICE && (
            <>
              <Button text='Discard' buttonStyle='2' />
              <Button text='Save as Draft' buttonStyle='3' />
              <Button text='Save & Send' buttonStyle='1' />
            </>
          )}
          {activeMode === SIDE_FORM_MODES.EDIT_INVOICE && (
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

export default SideForm;
