import Button from '../../UI/Button/Button';
import Icon from '../../UI/Icon';
import InvoiceFormItem from '../InvoiceFormItem';
import styles from './InvoiceFormItems.module.css';

const InvoiceFormItems = (props) => {
  const { itemList, setItemList, onAddNewItem } = props;

  const handleAddNewItemBtnClick = () => {
    setItemList((prevItemList) => [
      ...prevItemList,
      {
        name: '',
        quantity: 0,
        price: 0,
        total: 0,
      },
    ]);

    onAddNewItem();
  };

  return (
    <section className={styles.invoiceFormItems}>
      <h3 className={styles.invoiceFormItemsTitle}>Item List</h3>
      <div className={styles.invoiceFormItemsGrid}>
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
        icon={<Icon icon='plus' />}
        buttonStyle='2'
      >
        Add New Item
      </Button>
    </section>
  );
};

export default InvoiceFormItems;
