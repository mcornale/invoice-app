import { useCallback, useEffect } from 'react';
import INPUT_TYPES from '../../constants/input-types';
import useInput from '../../hooks/useInput';
import Icon from '../UI/Icon';
import InputGroup from '../UI/InputGroup/InputGroup';

const InvoiceFormItem = (props) => {
  const { item, setItemList, index } = props;

  const itemName = useInput(item.name, INPUT_TYPES.TEXT);
  const itemQuantity = useInput(item.quantity, INPUT_TYPES.QUANTITY);
  const itemPrice = useInput(item.price, INPUT_TYPES.PRICE);
  const itemTotal = useInput(item.total, INPUT_TYPES.PRICE, true);

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
    setItemList((prevItemList) =>
      prevItemList.map((itemObj, itemIndex) =>
        itemIndex === index
          ? {
              ...itemObj,
              quantity: newItemQuantity,
            }
          : itemObj
      )
    );

    itemQuantity.handleInputValueChange(newItemQuantity);
  };

  const handleItemPriceInputChange = (newItemPrice) => {
    setItemList((prevItemList) =>
      prevItemList.map((itemObj, itemIndex) =>
        itemIndex === index
          ? {
              ...itemObj,
              price: newItemPrice,
            }
          : itemObj
      )
    );

    itemPrice.handleInputValueChange(newItemPrice);
  };

  const handleItemTotalInputChange = useCallback(
    (newItemTotal) => {
      setItemList((prevItemList) =>
        prevItemList.map((itemObj, itemIndex) =>
          itemIndex === index
            ? {
                ...itemObj,
                total: newItemTotal,
              }
            : itemObj
        )
      );

      itemTotal.handleInputValueChange(newItemTotal);
    },
    [index, itemTotal, setItemList]
  );

  useEffect(() => {
    let newItemTotal = itemQuantity.inputValue * itemPrice.inputValue;
    if (
      itemQuantity.isFormatted &&
      itemPrice.isFormatted &&
      newItemTotal !== item.total
    )
      handleItemTotalInputChange(newItemTotal);
  }, [
    itemQuantity,
    itemPrice,
    itemTotal,
    item.total,
    handleItemTotalInputChange,
  ]);

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
