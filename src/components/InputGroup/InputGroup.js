import { forwardRef, useState } from 'react';
import styles from './InputGroup.module.css';

const InputGroup = forwardRef((props, ref) => {
  const { label, type, value, noLabel, readOnly } = props;

  const [inputValue, setInputValue] = useState(value);

  const onChangeInputHandler = (event) => {
    setInputValue(event.target.value);
  };

  const inputGroupClassName = [styles.inputGroup];

  if (readOnly) inputGroupClassName.push(styles.inputGroupReadOnly);

  return (
    <div className={inputGroupClassName.join(' ')}>
      {!noLabel && <label>{label}</label>}
      <input
        onChange={onChangeInputHandler}
        type={type}
        value={inputValue}
        ref={ref}
        readOnly={readOnly}
      />
    </div>
  );
});

export default InputGroup;
