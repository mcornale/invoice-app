import { useState } from 'react';
import formatDate from '../../../helpers/formatDate';
import Calendar from '../Calendar/Calendar';
import Icon from '../Icon/Icon';

import styles from './InputDate.module.css';

const InputDate = (props) => {
  const { value, className, readOnly } = props;

  const [inpuDateValue, setInputDateValue] = useState(formatDate(value));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleInputDateClick = () => {
    setIsCalendarOpen((prevCalendarState) => !prevCalendarState);
  };

  const handleCalendarDayClick = (newDate) => {
    setInputDateValue(formatDate(newDate));
    setIsCalendarOpen(false);
  };

  return (
    <div className={`${className} ${styles.inputDateContainer}`}>
      <button onClick={handleInputDateClick} className={styles.inputDate}>
        <p>{inpuDateValue}</p>
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
