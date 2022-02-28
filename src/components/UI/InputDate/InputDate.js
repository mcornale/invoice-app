import { forwardRef, useState } from 'react';

import styles from './InputDate.module.css';

const InputDate = forwardRef((props, ref) => {
  const { value, className } = props;

  const [inputValue, setInputValue] = useState(value);

  return <p className={className}>Date</p>;
});

export default InputDate;
