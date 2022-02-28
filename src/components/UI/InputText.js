import { useEffect, useState } from 'react';

const InputText = (props) => {
  const { value, className, isOkToUpdateInputText, formatInputText } = props;

  const [inputValue, setInputValue] = useState(
    formatInputText ? formatInputText(value) : value
  );

  useEffect(() => {
    if (formatInputText) {
      const timeoutFormat = setTimeout(() => {
        setInputValue(formatInputText(inputValue));
      }, 500);

      return () => {
        clearTimeout(timeoutFormat);
      };
    }
  }, [inputValue, formatInputText]);

  const onChangeInputHandler = (event) => {
    const newInputValue = event.target.value;

    if (isOkToUpdateInputText && !isOkToUpdateInputText(newInputValue)) return;

    setInputValue(event.target.value);
  };

  return (
    <input
      type='text'
      className={className}
      onChange={onChangeInputHandler}
      value={inputValue}
    />
  );
};

export default InputText;
