import Button from '../../UI/Button/Button';
import Icon from '../../UI/Icon';
import InvoiceFormItem from '../InvoiceFormItem';
import styles from './InvoiceFormItemList.module.css';

const InvoiceFormItemList = (props) => {
  const { itemList, setItemList, onAddNewItem } = props;

  const handleAddNewItemBtnClick = () => {
    setItemList((prevItemList) => [
      ...prevItemList,
      {
        name: undefined,
        quantity: undefined,
        price: undefined,
        total: undefined,
      },
    ]);

    onAddNewItem();
  };

  return (
    <section className={styles.invoiceFormItemList}>
      <h3 className={styles.invoiceFormItemListTitle}>Item List</h3>
      <div className={styles.invoiceFormItemListGrid}>
        <label>Item Name</label>
        <label>Qty.</label>
        <label>Price</label>
        <label>Total</label>
        <label></label>
        {itemList?.map((item, index) => (
          <InvoiceFormItem
            key={index}
            index={index}
            item={item}
            setItemList={setItemList}
          />
        ))}
      </div>
      <Button
        onClick={handleAddNewItemBtnClick}
        text='Add New Item'
        icon={<Icon icon='plus' />}
        buttonStyle='2'
      />
    </section>
  );
};

export default InvoiceFormItemList;
