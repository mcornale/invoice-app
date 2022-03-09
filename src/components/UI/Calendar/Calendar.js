import { useState } from 'react';
import formatDate from '../../../helpers/formatDate';
import Icon from '../Icon';
import styles from './Calendar.module.css';

const MIN_DAY_NUMBER = 1;
const MIN_MONTH_NUMBER = 0;
const MAX_MONTH_NUMBER = 11;
const DAYS_OF_THE_WEEK = 7;

const Calendar = (props) => {
  const { className, inputDate, onCalendarDayClick } = props;

  const selectedDate = new Date(inputDate);

  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth());

  const selectedMonthDays = [];
  const previousMonthDays = [];
  const nextMonthDays = [];

  const handleArrowLeftClick = () => {
    if (selectedMonth - 1 < MIN_MONTH_NUMBER) {
      setSelectedYear((prevSelectedYear) => --prevSelectedYear);
      setSelectedMonth(MAX_MONTH_NUMBER);
    } else setSelectedMonth((prevSelectedMonth) => --prevSelectedMonth);
  };

  const handleArrowRightClick = () => {
    if (selectedMonth + 1 > MAX_MONTH_NUMBER) {
      setSelectedYear((prevSelectedYear) => ++prevSelectedYear);
      setSelectedMonth(MIN_MONTH_NUMBER);
    } else setSelectedMonth((prevSelectedMonth) => ++prevSelectedMonth);
  };

  const populateDaysArray = (date, daysArr) => {
    let dayToPush = date.getDate();
    daysArr.push(dayToPush);
    date.setDate(dayToPush + 1);
  };

  const generateCalendarDays = () => {
    const date = new Date(selectedYear, selectedMonth, MIN_DAY_NUMBER);
    const firstDayOfSelectedMonth = date.getDay();
    let daysToFillAtStart = 0;

    if (firstDayOfSelectedMonth === 0) daysToFillAtStart = DAYS_OF_THE_WEEK - 1;
    if (firstDayOfSelectedMonth > 0)
      daysToFillAtStart =
        DAYS_OF_THE_WEEK - (DAYS_OF_THE_WEEK - firstDayOfSelectedMonth + 1);

    date.setDate(date.getDate() - daysToFillAtStart);

    while (daysToFillAtStart > 0) {
      populateDaysArray(date, previousMonthDays);
      daysToFillAtStart--;
    }

    while (date.getMonth() === selectedMonth) {
      populateDaysArray(date, selectedMonthDays);
    }

    while (
      (previousMonthDays.length +
        selectedMonthDays.length +
        nextMonthDays.length) %
        DAYS_OF_THE_WEEK !==
      0
    ) {
      populateDaysArray(date, nextMonthDays);
    }
  };

  generateCalendarDays();

  return (
    <div className={`${className} ${styles.calendar}`}>
      <div className={styles.calendarHeader}>
        <button
          type='button'
          onClick={handleArrowLeftClick}
          className={styles.calendarHeaderButton}
        >
          <Icon icon='arrowLeft' />
        </button>
        <p>
          {formatDate(
            new Date(selectedYear, selectedMonth, MIN_DAY_NUMBER)
          ).slice(2)}
        </p>
        <button
          type='button'
          onClick={handleArrowRightClick}
          className={styles.calendarHeaderButton}
        >
          <Icon icon='arrowRight' />
        </button>
      </div>
      <div className={styles.calendarDays}>
        {previousMonthDays.map((day, index) => (
          <button
            type='button'
            className={styles.calendarDayHidden}
            key={index}
          >
            {day}
          </button>
        ))}
        {selectedMonthDays.map((day, index) => (
          <button
            type='button'
            onClick={onCalendarDayClick.bind(
              null,
              new Date(selectedYear, selectedMonth, day)
            )}
            className={styles.calendarDay}
            key={index}
          >
            {day}
          </button>
        ))}
        {nextMonthDays.map((day, index) => (
          <button
            type='button'
            className={styles.calendarDayHidden}
            key={index}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
