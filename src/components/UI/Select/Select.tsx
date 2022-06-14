import { forwardRef, useState } from 'react';
import Button from '../Button/Button';
import Icon from '../Icon';
import styles from './Select.module.css';

type Props = {
  className: string;
  value: string;
  onChange: (newValue: string) => void;
  options: number[];
};

const Select = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { className, value, onChange, options } = props;

  const [areOptionsVisible, setAreOptionsVisible] = useState(false);

  const handleSelectClick = () => {
    setAreOptionsVisible((prevOptionsState) => !prevOptionsState);
  };

  const handleOptionClick = (newSelectedOption: string) => {
    onChange(newSelectedOption);
    setAreOptionsVisible(false);
  };

  return (
    <div className={`${className} ${styles.selectContainer}`}>
      <Button
        onClick={handleSelectClick}
        className={`${styles.select} ${areOptionsVisible && styles.selectOpen}`}
        icon={<Icon icon='arrowDown' />}
      >
        <input
          type='text'
          value={`Net ${value} ${Number(value) === 1 ? 'Day' : 'Days'}`}
          ref={ref}
          readOnly
        />
      </Button>

      {areOptionsVisible && (
        <div className={styles.options}>
          {options.map((option, index) => (
            <Button
              key={index}
              onClick={handleOptionClick.bind(null, option.toString())}
              className={styles.option}
            >
              Net {option} {option === 1 ? 'Day' : 'Days'}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
});

export default Select;
