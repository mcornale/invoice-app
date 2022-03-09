import { useState } from 'react';

const useInput = (value) => {
  const [inputValue, setInputValue] = useState(value ?? '');

  const handleInputValueChange = (newInputValue) => {
    setInputValue(newInputValue);
  };

  return { inputValue, handleInputValueChange };
};

export default useInput;
