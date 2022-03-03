import { useState } from 'react';
import Icon from '../Icon/Icon';
import styles from './Select.module.css';

const Select = (props) => {
  const { className, value, options } = props;

  const [selectedOption, setSelectedOption] = useState(value);
  const [areOptionsVisible, setAreOptionsVisible] = useState(false);

  const handleSelectClick = () => {
    setAreOptionsVisible((prevOptionsState) => !prevOptionsState);
  };

  const handleOptionClick = (newSelectedOption) => {
    setSelectedOption(newSelectedOption);
    setAreOptionsVisible(false);
  };

  return (
    <div className={`${className} ${styles.selectContainer}`}>
      <button
        onClick={handleSelectClick}
        className={`${styles.select} ${areOptionsVisible && styles.selectOpen}`}
      >
        <p>{`Net ${selectedOption} ${
          selectedOption === 1 ? 'Day' : 'Days'
        }`}</p>
        <Icon icon='arrowDown' />
      </button>
      {areOptionsVisible && (
        <div className={styles.options}>
          {options.map((option) => (
            <button
              onClick={handleOptionClick.bind(null, option)}
              className={styles.option}
            >{`Net ${option} ${option === 1 ? 'Day' : 'Days'}`}</button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
