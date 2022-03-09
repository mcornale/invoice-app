import { useState } from 'react';
import formatDate from '../../../helpers/formatDate';
import Calendar from '../Calendar/Calendar';
import Icon from '../Icon';

import styles from './InputDate.module.css';

const InputDate = (props) => {
  const { value, onChange, className, disabled } = props;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const inputDateClassName = [styles.inputDate];
  if (disabled) inputDateClassName.push(styles.inputDateDisabled);

  const handleInputDateClick = () => {
    setIsCalendarOpen((prevCalendarState) => !prevCalendarState);
  };

  const handleCalendarDayClick = (newDate) => {
    onChange(newDate);
    setIsCalendarOpen(false);
  };

  return (
    <div className={`${className} ${styles.inputDateContainer}`}>
      <button
        type='button'
        {...(!disabled && { onClick: handleInputDateClick })}
        className={inputDateClassName.join(' ')}
      >
        <input type='text' value={formatDate(value)} readOnly />
        <Icon icon='calendar' />
      </button>
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
