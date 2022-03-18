import styles from './InvoiceForm.module.css';
import InvoiceId from '../InvoiceId/InvoiceId';
import InputGroup from '../../UI/InputGroup/InputGroup';
import Button from '../../UI/Button/Button';
import { useEffect, useRef, useState } from 'react';
import INVOICE_FORM_MODES from '../../../constants/invoice-form-modes';
import InvoiceFormItems from '../InvoiceFormItems/InvoiceFormItems';
import useScrollPosition from '../../../hooks/useScrollPosition';
import PAYMENT_TERMS_OPTIONS from '../../../constants/payment-terms-options';
import useInput from '../../../hooks/useInput';
import INPUT_TYPES from '../../../constants/input-types';
import formatDateForFirebase from '../../../helpers/formatDateForFirebase';
import { useDispatch } from 'react-redux';
import { createOrUpdateInvoice } from '../../../store/invoicesSlice';
import { useNavigate } from 'react-router-dom';
import generateRandomId from '../../../helpers/generateRandomId';

const InvoiceForm = (props) => {
  const { invoiceId } = props;

  //check form mode
  const activeMode = invoiceId
    ? INVOICE_FORM_MODES.EDIT_INVOICE
    : INVOICE_FORM_MODES.NEW_INVOICE;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //check scrolling position and change invoice form style according to that
  const invoiceFormRef = useRef();
  const invoiceFormScrollPosition = useScrollPosition(invoiceFormRef);
  const invoiceFormClassNameArr = [
    styles.invoiceForm,
    styles.invoiceFormWithBottomGradient,
  ];

  if (invoiceFormRef.current && invoiceFormScrollPosition > 0)
    invoiceFormClassNameArr.push(styles.invoiceFormWithTopGradient);

  if (
    invoiceFormRef.current &&
    invoiceFormScrollPosition ===
      invoiceFormRef.current.scrollHeight - invoiceFormRef.current.clientHeight
  ) {
    invoiceFormClassNameArr.splice(
      invoiceFormClassNameArr.findIndex(
        (invoiceFormClassName) =>
          invoiceFormClassName === styles.invoiceFormWithBottomGradient
      ),
      1
    );
  }

  //inputs
  const senderAddressStreet = useInput(
    invoiceId?.senderAddress.street ?? '',
    INPUT_TYPES.TEXT
  );
  const senderAddressCity = useInput(
    invoiceId?.senderAddress.city ?? '',
    INPUT_TYPES.TEXT
  );
  const senderAddressPostCode = useInput(
    invoiceId?.senderAddress.postCode ?? '',
    INPUT_TYPES.TEXT
  );
  const senderAddressCountry = useInput(
    invoiceId?.senderAddress.country ?? '',
    INPUT_TYPES.TEXT
  );
  const clientName = useInput(invoiceId?.clientName ?? '', INPUT_TYPES.TEXT);
  const clientEmail = useInput(invoiceId?.clientEmail ?? '', INPUT_TYPES.EMAIL);
  const clientAddressStreet = useInput(
    invoiceId?.clientAddress.street ?? '',
    INPUT_TYPES.TEXT
  );
  const clientAddressCity = useInput(
    invoiceId?.clientAddress.city ?? '',
    INPUT_TYPES.TEXT
  );
  const clientAddressPostCode = useInput(
    invoiceId?.clientAddress.postCode ?? '',
    INPUT_TYPES.TEXT
  );
  const clientAddressCountry = useInput(
    invoiceId?.clientAddress.country ?? '',
    INPUT_TYPES.TEXT
  );
  const invoiceDate = useInput(
    activeMode === INVOICE_FORM_MODES.NEW_INVOICE
      ? new Date()
      : invoiceId?.createdAt,
    INPUT_TYPES.DATE,
    true
  );
  const paymentTerms = useInput(
    activeMode === INVOICE_FORM_MODES.NEW_INVOICE
      ? PAYMENT_TERMS_OPTIONS[PAYMENT_TERMS_OPTIONS.length - 1]
      : invoiceId?.paymentTerms,
    INPUT_TYPES.SELECT
  );
  const projectDescription = useInput(
    invoiceId?.description ?? '',
    INPUT_TYPES.TEXT
  );

  //item list
  const [invoiceItems, setInvoiceItems] = useState(invoiceId?.items ?? []);
  const [isNewItemAdded, setIsNewItemAdded] = useState(false);

  const handleNewItemAdded = () => {
    setIsNewItemAdded(true);
  };

  //when new item list is added scroll form to bottom
  useEffect(() => {
    if (isNewItemAdded) {
      invoiceFormRef.current.scrollTo(0, invoiceFormRef.current.scrollHeight);
      setIsNewItemAdded(false);
    }
  }, [isNewItemAdded]);

  //close form
  const handleInvoiceFormClose = () => {
    navigate(-1);
  };

  //submit form
  const handleInvoiceFormSubmit = (status) => {
    const newOrUpdatedInvoice = {
      id: invoiceId?.id ?? generateRandomId(),
      senderAddress: {
        street: senderAddressStreet?.inputValue ?? '',
        postCode: senderAddressPostCode?.inputValue ?? '',
        city: senderAddressCity?.inputValue ?? '',
        country: senderAddressCountry?.inputValue ?? '',
      },
      clientAddress: {
        street: clientAddressStreet?.inputValue ?? '',
        postCode: clientAddressPostCode?.inputValue ?? '',
        city: clientAddressCity?.inputValue ?? '',
        country: clientAddressCountry?.inputValue ?? '',
      },
      clientName: clientName?.inputValue ?? '',
      clientEmail: clientEmail?.inputValue ?? '',
      createdAt: formatDateForFirebase(new Date(invoiceDate.inputValue)),
      paymentDue: formatDateForFirebase(
        new Date(invoiceDate.inputValue).setDate(
          new Date(invoiceDate.inputValue).getDate() +
            Number(paymentTerms.inputValue)
        )
      ),
      paymentTerms: paymentTerms.inputValue,
      items: invoiceItems ?? {},
      total: invoiceItems.reduce(
        (accTotal, currItem) => accTotal + currItem.total,
        0
      ),
      description: projectDescription?.inputValue ?? '',
      status,
    };

    dispatch(createOrUpdateInvoice(newOrUpdatedInvoice));
    handleInvoiceFormClose();
  };

  return (
    <div className={styles.invoiceFormContainer}>
      <form className={invoiceFormClassNameArr.join(' ')} ref={invoiceFormRef}>
        <h2 className={styles.invoiceFormTitle}>
          {activeMode === INVOICE_FORM_MODES.NEW_INVOICE && 'New Invoice'}
          {activeMode === INVOICE_FORM_MODES.EDIT_INVOICE && (
            <>
              Edit <InvoiceId id={invoiceId.id} />
            </>
          )}
        </h2>
        <div>
          <section className={styles.invoiceFormSection}>
            <h4 className={styles.invoiceFormSectionTitle}>Bill From</h4>
            <InputGroup
              label='Street Address'
              type={senderAddressStreet.type}
              value={senderAddressStreet.inputValue}
              onChange={senderAddressStreet.handleInputValueChange}
            />
            <div className={styles.invoiceFormInputsRow}>
              <InputGroup
                label='City'
                type={senderAddressCity.type}
                value={senderAddressCity.inputValue}
                onChange={senderAddressCity.handleInputValueChange}
              />
              <InputGroup
                label='Post Code'
                type={senderAddressPostCode.type}
                value={senderAddressPostCode.inputValue}
                onChange={senderAddressPostCode.handleInputValueChange}
              />
              <InputGroup
                label='Country'
                type={senderAddressCountry.type}
                value={senderAddressCountry.inputValue}
                onChange={senderAddressCountry.handleInputValueChange}
              />
            </div>
          </section>
          <section className={styles.invoiceFormSection}>
            <h4 className={styles.invoiceFormSectionTitle}>Bill To</h4>
            <InputGroup
              label="Client's Name"
              type={clientName.type}
              value={clientName.inputValue}
              onChange={clientName.handleInputValueChange}
            />
            <InputGroup
              label="Client's Email"
              type={clientEmail.type}
              value={clientEmail.inputValue}
              onChange={clientEmail.handleInputValueChange}
            />
            <InputGroup
              label='Street Address'
              type={clientAddressStreet.type}
              value={clientAddressStreet.inputValue}
              onChange={clientAddressStreet.handleInputValueChange}
            />
            <div className={styles.invoiceFormInputsRow}>
              <InputGroup
                label='City'
                type={clientAddressCity.type}
                value={clientAddressCity.inputValue}
                onChange={clientAddressCity.handleInputValueChange}
              />
              <InputGroup
                label='Post Code'
                type={clientAddressPostCode.type}
                value={clientAddressPostCode.inputValue}
                onChange={clientAddressPostCode.handleInputValueChange}
              />
              <InputGroup
                label='Country'
                type={clientAddressCountry.type}
                value={clientAddressCountry.inputValue}
                onChange={clientAddressCountry.handleInputValueChange}
              />
            </div>
            <div className={styles.invoiceFormInputsRow}>
              <InputGroup
                label='Invoice Date'
                type={invoiceDate.type}
                value={invoiceDate.inputValue}
                onChange={invoiceDate.handleInputValueChange}
                disabled={invoiceId !== undefined}
              />
              <InputGroup
                label='Payment Terms'
                type={paymentTerms.type}
                options={PAYMENT_TERMS_OPTIONS}
                value={paymentTerms.inputValue}
                onChange={paymentTerms.handleInputValueChange}
              />
            </div>
            <InputGroup
              label='Project Description'
              type={projectDescription.type}
              value={projectDescription.inputValue}
              onChange={projectDescription.handleInputValueChange}
            />
          </section>
          <InvoiceFormItems
            itemList={invoiceItems}
            setItemList={setInvoiceItems}
            onAddNewItem={handleNewItemAdded}
          />
        </div>
        <section className={styles.invoiceFormSubmitSection}>
          {activeMode === INVOICE_FORM_MODES.NEW_INVOICE && (
            <>
              <Button
                onClick={handleInvoiceFormClose}
                style={{ marginRight: 'auto' }}
                buttonStyle='2'
              >
                Discard
              </Button>
              <Button
                onClick={handleInvoiceFormSubmit.bind(null, 'draft')}
                buttonStyle='3'
              >
                Save as Draft
              </Button>
              <Button
                onClick={handleInvoiceFormSubmit.bind(null, 'pending')}
                buttonStyle='1'
              >
                Save & Send
              </Button>
            </>
          )}
          {activeMode === INVOICE_FORM_MODES.EDIT_INVOICE && (
            <>
              <Button onClick={handleInvoiceFormClose} buttonStyle='2'>
                Cancel
              </Button>
              <Button
                onClick={handleInvoiceFormSubmit.bind(null, invoiceId.status)}
                buttonStyle='1'
              >
                Save Changes
              </Button>
            </>
          )}
        </section>
      </form>
    </div>
  );
};

export default InvoiceForm;
