import { useState } from 'react';
import Button from '../Button/Button';
import Calendar from '../Calendar/Calendar';
import Icon from '../Icon';

import styles from './InputDate.module.css';

type Props = {
  value: string;
  onChange: (newValue: string) => void;
  className: string;
  disabled: boolean;
};

const InputDate = (props: Props) => {
  const { value, onChange, className, disabled } = props;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const inputDateContainerClassName = [className, styles.inputDateContainer];
  if (isCalendarOpen)
    inputDateContainerClassName.push(styles.inputDateContainerOpen);

  const inputDateClassName = [styles.inputDate];
  if (disabled) inputDateClassName.push(styles.inputDateDisabled);

  const handleInputDateClick = () => {
    setIsCalendarOpen((prevCalendarState) => !prevCalendarState);
  };

  const handleCalendarDayClick = (newDate: string) => {
    onChange(newDate);
    setIsCalendarOpen(false);
  };

  return (
    <div className={inputDateContainerClassName.join(' ')}>
      <Button
        {...(!disabled && { onClick: handleInputDateClick })}
        className={inputDateClassName.join(' ')}
        icon={<Icon icon='calendar' />}
      >
        <input type='text' value={value} readOnly />
      </Button>
      {isCalendarOpen && (
        <Calendar
          onCalendarDayClick={handleCalendarDayClick}
          className={styles.inputDateCalendar}
          inputDate={value}
        />
      )}
    </div>
  );
};

export default InputDate;
