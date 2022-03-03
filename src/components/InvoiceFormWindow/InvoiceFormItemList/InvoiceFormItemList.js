import { Fragment } from 'react';
import Button from '../../UI/Button/Button';
import Icon from '../../UI/Icon/Icon';
import InputGroup from '../../UI/InputGroup/InputGroup';
import styles from './InvoiceFormItemList.module.css';

const InvoiceFormItemList = (props) => {
  const { currentInvoice } = props;

  return (
    <section className={styles.invoiceFormItemList}>
      <h3 className={styles.invoiceFormItemListTitle}>Item List</h3>
      <div className={styles.invoiceFormItemListGrid}>
        <label>Item Name</label>
        <label>Qty.</label>
        <label>Price</label>
        <label>Total</label>
        <label></label>
        {currentInvoice?.items.map((item, index) => (
          <Fragment key={index}>
            <InputGroup
              label='Item Name'
              type='text'
              value={item.name}
              noLabel
            />
            <InputGroup
              label='Qty.'
              type='quantity'
              value={item.quantity}
              noLabel
            />
            <InputGroup label='Price' type='price' value={item.price} noLabel />
            <InputGroup
              label='Total'
              type='price'
              value={item.total}
              noLabel
              readOnly
            />
            <button>
              <Icon icon='delete' />
            </button>
          </Fragment>
        ))}
      </div>
      <Button text='Add New Item' icon={<Icon icon='plus' />} buttonStyle='2' />
    </section>
  );
};

export default InvoiceFormItemList;
