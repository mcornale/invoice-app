import { Fragment } from 'react';
import Button from '../../Button/Button';
import Icon from '../../Icon/Icon';
import InputGroup from '../../InputGroup/InputGroup';
import styles from './SideFormItemList.module.css';

const SideFormItemList = (props) => {
  const { currentInvoice } = props;

  return (
    <section className={styles.sideFormItemList}>
      <h3 className={styles.sideFormItemListTitle}>Item List</h3>
      <div className={styles.sideFormItemListGrid}>
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
              type='string'
              value={item.quantity}
              noLabel
            />
            <InputGroup
              label='Price'
              type='string'
              value={item.price}
              noLabel
            />
            <InputGroup
              label='Total'
              type='string'
              value={item.total}
              noLabel
              readOnly
            />
            <Button text='' icon={<Icon icon='delete' />} />
          </Fragment>
        ))}
      </div>
      <Button text='Add New Item' icon={<Icon icon='plus' />} buttonStyle='2' />
    </section>
  );
};

export default SideFormItemList;
