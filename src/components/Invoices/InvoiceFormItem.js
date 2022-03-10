import useInput from '../../hooks/useInput';
import Icon from '../UI/Icon';
import InputGroup from '../UI/InputGroup/InputGroup';

const InvoiceFormItem = (props) => {
  const { item, setItemList, index } = props;

  const itemName = useInput(item.name);
  const itemQuantity = useInput(item.quantity);
  const itemPrice = useInput(item.price);
  const itemTotal = useInput(item.total);

  const handleDeleteBtnClick = () => {
    setItemList((prevItemList) =>
      prevItemList.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const handleItemNameInputChange = (newItemName) => {
    setItemList((prevItemList) =>
      prevItemList.map((itemObj, itemIndex) =>
        itemIndex === index ? { ...itemObj, name: newItemName } : itemObj
      )
    );

    itemName.handleInputValueChange(newItemName);
  };

  const handleItemQuantityInputChange = (newItemQuantity) => {
    let newItemTotal = newItemQuantity * itemPrice.inputValue;
    setItemList((prevItemList) =>
      prevItemList.map((itemObj, itemIndex) =>
        itemIndex === index
          ? {
              ...itemObj,
              quantity: newItemQuantity,
              total: newItemTotal,
            }
          : itemObj
      )
    );

    itemQuantity.handleInputValueChange(newItemQuantity);
    itemTotal.handleInputValueChange(newItemTotal);
  };

  const handleItemPriceInputChange = (newItemPrice) => {
    let newItemTotal = newItemPrice * itemQuantity.inputValue;
    setItemList((prevItemList) =>
      prevItemList.map((itemObj, itemIndex) =>
        itemIndex === index
          ? {
              ...itemObj,
              price: newItemPrice,
              total: newItemTotal,
            }
          : itemObj
      )
    );

    itemPrice.handleInputValueChange(newItemPrice);
    itemTotal.handleInputValueChange(newItemTotal);
  };

  const handleItemTotalInputChange = (newItemTotal) => {
    setItemList((prevItemList) =>
      prevItemList.map((itemObj, itemIndex) =>
        itemIndex === index ? { ...itemObj, total: newItemTotal } : itemObj
      )
    );
  };

  return (
    <>
      <InputGroup
        label='Item Name'
        type='text'
        value={itemName.inputValue}
        onChange={handleItemNameInputChange}
        noLabel
      />
      <InputGroup
        label='Qty.'
        type='quantity'
        value={itemQuantity.inputValue}
        onChange={handleItemQuantityInputChange}
        noLabel
      />
      <InputGroup
        label='Price'
        type='price'
        value={itemPrice.inputValue}
        onChange={handleItemPriceInputChange}
        noLabel
      />
      <InputGroup
        label='Total'
        type='price'
        value={itemTotal.inputValue}
        onChange={handleItemTotalInputChange}
        noLabel
        readOnly
      />
      <button onClick={handleDeleteBtnClick} type='button'>
        <Icon icon='delete' />
      </button>
    </>
  );
};

export default InvoiceFormItem;
