import { forwardRef, useState } from 'react';
import Icon from '../Icon';
import styles from './Select.module.css';

const Select = forwardRef((props, ref) => {
  const { className, value, onChange, options } = props;

  const [areOptionsVisible, setAreOptionsVisible] = useState(false);

  const handleSelectClick = () => {
    setAreOptionsVisible((prevOptionsState) => !prevOptionsState);
  };

  const handleOptionClick = (newSelectedOption) => {
    onChange(newSelectedOption);
    setAreOptionsVisible(false);
  };

  return (
    <div className={`${className} ${styles.selectContainer}`}>
      <button
        type='button'
        onClick={handleSelectClick}
        className={`${styles.select} ${areOptionsVisible && styles.selectOpen}`}
      >
        <input
          type='text'
          value={`Net ${value} ${value === 1 ? 'Day' : 'Days'}`}
          ref={ref}
          readOnly
        />
        <Icon icon='arrowDown' />
      </button>
      {areOptionsVisible && (
        <div className={styles.options}>
          {options.map((option, index) => (
            <button
              type='button'
              key={index}
              onClick={handleOptionClick.bind(null, option)}
              className={styles.option}
            >{`Net ${option} ${option === 1 ? 'Day' : 'Days'}`}</button>
          ))}
        </div>
      )}
    </div>
  );
});

export default Select;
