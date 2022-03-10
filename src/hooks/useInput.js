import { useEffect, useState } from 'react';
import INPUT_TYPES from '../constants/input-types';
import formatDate from '../helpers/formatDate';

const useInput = (value, type, formatNow = false) => {
  let formatInputValue;

  if (type === INPUT_TYPES.PRICE)
    formatInputValue = (inputValue) => Number(inputValue).toFixed(2);

  if (type === INPUT_TYPES.QUANTITY)
    formatInputValue = (inputValue) => Number(inputValue).toFixed(0);

  if (type === INPUT_TYPES.DATE)
    formatInputValue = (inputValue) => formatDate(inputValue);

  const [inputValue, setInputValue] = useState(
    formatInputValue ? formatInputValue(value) : value
  );

  const [isTouched, setIsTouched] = useState(false);
  const [isFormatted, setIsFormatted] = useState(true);

  useEffect(() => {
    if (formatInputValue && isTouched && !isFormatted) {
      const formatInputTimeout = setTimeout(() => {
        setInputValue((prevInputValue) => formatInputValue(prevInputValue));
        setIsFormatted(true);
      }, 400);

      return () => {
        clearTimeout(formatInputTimeout);
      };
    }
  }, [formatInputValue, isTouched, isFormatted]);

  const handleInputValueChange = (newInputValue) => {
    setIsTouched(true);

    if (!formatNow && formatInputValue) setIsFormatted(false);

    if (formatNow && formatInputValue)
      setInputValue(formatInputValue(newInputValue));
    else setInputValue(newInputValue);
  };

  return { inputValue, handleInputValueChange, isFormatted, isTouched, type };
};

export default useInput;
