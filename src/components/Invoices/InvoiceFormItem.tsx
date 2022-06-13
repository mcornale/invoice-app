import { useCallback, useEffect } from 'react';
import INPUT_TYPES from '../../constants/input-types';
import useInput from '../../hooks/useInput';
import { InvoiceItem, InvoiceItems } from '../../types/invoice-types';
import Button from '../UI/Button/Button';
import Icon from '../UI/Icon';
import InputGroup from '../UI/InputGroup/InputGroup';

type Props = {
  item: InvoiceItem;
  setItems: React.Dispatch<React.SetStateAction<InvoiceItems>>;
  index: number;
};

const InvoiceFormItem = (props: Props) => {
  const { item, setItems, index } = props;

  const itemName = useInput(item.name, INPUT_TYPES.TEXT);
  const itemQuantity = useInput(item.quantity.toString(), INPUT_TYPES.QUANTITY);
  const itemPrice = useInput(item.price.toString(), INPUT_TYPES.PRICE);
  const itemTotal = useInput(item.total.toString(), INPUT_TYPES.PRICE, true);

  const handleDeleteBtnClick = () => {
    setItems((prevItemList) =>
      prevItemList.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const handleItemNameInputChange = (newItemName: string) => {
    setItems((prevItemList) =>
      prevItemList.map((itemObj, itemIndex) =>
        itemIndex === index ? { ...itemObj, name: newItemName } : itemObj
      )
    );

    itemName.handleInputValueChange(newItemName);
  };

  const handleItemQuantityInputChange = (newItemQuantity: number) => {
    setItems((prevItemList) =>
      prevItemList.map((itemObj, itemIndex) =>
        itemIndex === index
          ? {
              ...itemObj,
              quantity: newItemQuantity,
            }
          : itemObj
      )
    );

    itemQuantity.handleInputValueChange(newItemQuantity.toString());
  };

  const handleItemPriceInputChange = (newItemPrice: number) => {
    setItems((prevItemList) =>
      prevItemList.map((itemObj, itemIndex) =>
        itemIndex === index
          ? {
              ...itemObj,
              price: newItemPrice,
            }
          : itemObj
      )
    );

    itemPrice.handleInputValueChange(newItemPrice.toString());
  };

  const handleItemTotalInputChange = useCallback(
    (newItemTotal) => {
      setItems((prevItemList) =>
        prevItemList.map((itemObj, itemIndex) =>
          itemIndex === index
            ? {
                ...itemObj,
                total: newItemTotal,
              }
            : itemObj
        )
      );

      itemTotal.handleInputValueChange(newItemTotal.toString());
    },
    [index, itemTotal, setItems]
  );

  useEffect(() => {
    let newItemTotal =
      Number(itemQuantity.inputValue) * Number(itemPrice.inputValue);
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
      <Button onClick={handleDeleteBtnClick} icon={<Icon icon='delete' />} />
    </>
  );
};

export default InvoiceFormItem;
