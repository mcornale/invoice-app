import { useState } from 'react';
import Button from '../Button/Button';
import Icon from '../Icon';
import styles from './MultiCheckBox.module.css';

type Props = {
  activeOptions: string[];
  onChange: (newValue: string) => void;
  options: string[];
};

const MultiCheckBox = (props: Props) => {
  const { activeOptions, onChange, options } = props;
  const [areOptionsVisible, setAreOptionsVisible] = useState(false);

  const handleOptionClick = (optionClicked: string) => {
    if (onChange) onChange(optionClicked);
  };

  const handleButtonClick = () => {
    setAreOptionsVisible((prevAreOptionsVisible) => !prevAreOptionsVisible);
  };

  return (
    <div className={styles.multiCheckBoxContainer}>
      <Button
        onClick={handleButtonClick}
        className={`${styles.multiCheckBox} ${
          areOptionsVisible && styles.multiCheckBoxOpen
        }`}
        icon={<Icon icon='arrowDown' />}
      >
        <p>Filter by status</p>
      </Button>
      {areOptionsVisible && (
        <div className={styles.multiCheckBoxOptions}>
          {options.map((option, index) => (
            <Button
              key={index}
              onClick={handleOptionClick.bind(null, option)}
              className={styles.multiCheckBoxOption}
              icon={
                <div
                  className={`${styles.multiCheckBoxCheckBox} ${
                    activeOptions.includes(option) &&
                    styles.multiCheckBoxActiveCheckBox
                  }`}
                ></div>
              }
            >
              {`${option[0].toUpperCase()}${option.slice(1)}`}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiCheckBox;
