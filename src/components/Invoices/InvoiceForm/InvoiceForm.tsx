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
import { Invoice } from '../../../types/invoice';
import INVOICES_STATUSES from '../../../constants/invoices-statuses';

type Props = {
  invoice: Invoice;
};

const InvoiceForm = (props: Props) => {
  const { invoice } = props;

  //check form mode
  const activeMode = invoice
    ? INVOICE_FORM_MODES.EDIT_INVOICE
    : INVOICE_FORM_MODES.NEW_INVOICE;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //check scrolling position and change invoice form style according to that
  const invoiceFormRef = useRef<HTMLFormElement>(null);
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
    invoice?.senderAddress.street ?? '',
    INPUT_TYPES.TEXT
  );
  const senderAddressCity = useInput(
    invoice?.senderAddress.city ?? '',
    INPUT_TYPES.TEXT
  );
  const senderAddressPostCode = useInput(
    invoice?.senderAddress.postCode ?? '',
    INPUT_TYPES.TEXT
  );
  const senderAddressCountry = useInput(
    invoice?.senderAddress.country ?? '',
    INPUT_TYPES.TEXT
  );
  const clientName = useInput(invoice?.clientName ?? '', INPUT_TYPES.TEXT);
  const clientEmail = useInput(invoice?.clientEmail ?? '', INPUT_TYPES.EMAIL);
  const clientAddressStreet = useInput(
    invoice?.clientAddress.street ?? '',
    INPUT_TYPES.TEXT
  );
  const clientAddressCity = useInput(
    invoice?.clientAddress.city ?? '',
    INPUT_TYPES.TEXT
  );
  const clientAddressPostCode = useInput(
    invoice?.clientAddress.postCode ?? '',
    INPUT_TYPES.TEXT
  );
  const clientAddressCountry = useInput(
    invoice?.clientAddress.country ?? '',
    INPUT_TYPES.TEXT
  );
  const invoiceDate = useInput(
    activeMode === INVOICE_FORM_MODES.NEW_INVOICE
      ? new Date().toString()
      : invoice?.createdAt,
    INPUT_TYPES.DATE,
    true
  );
  const paymentTerms = useInput(
    activeMode === INVOICE_FORM_MODES.NEW_INVOICE
      ? PAYMENT_TERMS_OPTIONS[PAYMENT_TERMS_OPTIONS.length - 1].toString()
      : invoice?.paymentTerms.toString(),
    INPUT_TYPES.SELECT
  );
  const projectDescription = useInput(
    invoice?.description ?? '',
    INPUT_TYPES.TEXT
  );

  const inputsArr = [
    senderAddressStreet,
    senderAddressCity,
    senderAddressPostCode,
    senderAddressCountry,
    clientName,
    clientEmail,
    clientAddressStreet,
    clientAddressCity,
    clientAddressPostCode,
    clientAddressCountry,
    invoiceDate,
    paymentTerms,
    projectDescription,
  ];

  //item list
  const [invoiceItems, setInvoiceItems] = useState(invoice?.items ?? []);
  const [isNewItemAdded, setIsNewItemAdded] = useState(false);
  const [isSomeInputEmpty, setIsSomeInputEmpty] = useState(false);
  const [areItemsEmpty, setAreItemsEmpty] = useState(false);
  const [areErrorsVisible, setAreErrorsVisible] = useState(false);

  const handleNewItemAdded = () => {
    setIsNewItemAdded(true);
  };

  //when new item list is added scroll form to bottom
  useEffect(() => {
    if (invoiceFormRef.current && (isNewItemAdded || areErrorsVisible)) {
      invoiceFormRef.current.scrollTo(0, invoiceFormRef.current.scrollHeight);
      setIsNewItemAdded(false);
      setAreErrorsVisible(false);
    }
  }, [isNewItemAdded, areErrorsVisible]);

  //close form
  const handleInvoiceFormClose = () => {
    navigate(-1);
  };

  //submit form
  const handleInvoiceFormSubmit = (status: string) => {
    if (status === INVOICES_STATUSES.PENDING) {
      if (
        inputsArr.some((input) => input.inputValue === '') ||
        invoiceItems.some((item) =>
          Object.values(item).some((val) => val === '')
        )
      ) {
        setIsSomeInputEmpty(true);
        setAreErrorsVisible(true);
      } else setIsSomeInputEmpty(false);
      if (invoiceItems.length === 0) {
        setAreItemsEmpty(true);
        setAreErrorsVisible(true);
      } else setAreItemsEmpty(false);

      return;
    }

    const newOrUpdatedInvoice = {
      id: invoice?.id ?? generateRandomId(),
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
        new Date(
          new Date(invoiceDate.inputValue).setDate(
            new Date(invoiceDate.inputValue).getDate() +
              Number(paymentTerms.inputValue)
          )
        )
      ),
      paymentTerms: Number(paymentTerms.inputValue),
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
              Edit <InvoiceId id={invoice.id} />
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
              placeholder='e.g. email@example.com'
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
                disabled={invoice !== null}
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
              placeholder='e.g. Graphic Design Service'
            />
          </section>
          <InvoiceFormItems
            items={invoiceItems}
            setItems={setInvoiceItems}
            onAddNewItem={handleNewItemAdded}
          />
          {(isSomeInputEmpty || areItemsEmpty) && (
            <section className={styles.invoiceFormErrorsContainer}>
              {isSomeInputEmpty && (
                <p className={styles.invoiceFormError}>
                  - All fields must be added
                </p>
              )}
              {areItemsEmpty && (
                <p className={styles.invoiceFormError}>
                  - An item must be added
                </p>
              )}
            </section>
          )}
        </div>
        <section className={styles.invoiceFormSubmitSection}>
          {activeMode === INVOICE_FORM_MODES.NEW_INVOICE && (
            <>
              <Button
                onClick={handleInvoiceFormClose}
                buttonStyle='2'
                className={styles.invoiceFormSubmitSectionAloneButton}
              >
                Discard
              </Button>
              <Button
                onClick={handleInvoiceFormSubmit.bind(
                  null,
                  INVOICES_STATUSES.DRAFT
                )}
                buttonStyle='3'
              >
                Save as Draft
              </Button>
              <Button
                onClick={handleInvoiceFormSubmit.bind(
                  null,
                  INVOICES_STATUSES.PENDING
                )}
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
                onClick={handleInvoiceFormSubmit.bind(null, invoice.status)}
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
