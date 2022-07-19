import { useEffect, useState } from 'react';
import INPUT_TYPES from '../constants/input-types';
import formatDate from '../helpers/formatDate';

const useInput = (value: string, type: string, formatNow = false) => {
  let formatInputValue: ((inputValue: string) => string) | null = null;

  if (type === INPUT_TYPES.PRICE)
    formatInputValue = (inputValue) => Number(inputValue).toFixed(2).toString();

  if (type === INPUT_TYPES.QUANTITY)
    formatInputValue = (inputValue) => Number(inputValue).toFixed(0).toString();

  if (type === INPUT_TYPES.DATE)
    formatInputValue = (inputValue) => formatDate(new Date(inputValue));

  const [inputValue, setInputValue] = useState(
    formatInputValue ? formatInputValue(value) : value
  );

  const [isTouched, setIsTouched] = useState(false);
  const [isFormatted, setIsFormatted] = useState(true);
  const [isEmpty, setIsEmpty] = useState(value === '');

  useEffect(() => {
    if (formatInputValue && isTouched && !isFormatted) {
      const formatInputTimeout = setTimeout(() => {
        setInputValue((prevInputValue) =>
          formatInputValue ? formatInputValue(prevInputValue) : prevInputValue
        );
        setIsFormatted(true);
      }, 400);

      return () => {
        clearTimeout(formatInputTimeout);
      };
    }
  }, [formatInputValue, isTouched, isFormatted]);

  const handleInputValueChange = (newInputValue: string) => {
    setIsTouched(true);

    if (newInputValue === '') setIsEmpty(true);

    if (!formatNow && formatInputValue) setIsFormatted(false);

    if (formatNow && formatInputValue)
      setInputValue(formatInputValue(newInputValue));
    else setInputValue(newInputValue);
  };

  return {
    inputValue,
    handleInputValueChange,
    isFormatted,
    isTouched,
    type,
    isEmpty,
  };
};

export default useInput;
