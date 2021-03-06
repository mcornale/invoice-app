import { useState } from 'react';
import formatDate from '../../../helpers/formatDate';
import Button from '../Button/Button';
import Icon from '../Icon';
import styles from './Calendar.module.css';

const MIN_DAY_NUMBER = 1;
const MIN_MONTH_NUMBER = 0;
const MAX_MONTH_NUMBER = 11;
const DAYS_OF_THE_WEEK = 7;

type Props = {
  className: string;
  inputDate: string;
  onCalendarDayClick: (newDate: string) => void;
};

const Calendar = (props: Props) => {
  const { className, inputDate, onCalendarDayClick } = props;

  const selectedDate = new Date(inputDate);

  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth());

  const selectedMonthDays: number[] = [];
  const previousMonthDays: number[] = [];
  const nextMonthDays: number[] = [];

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

  const populateDaysArray = (date: Date, daysArr: number[]) => {
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
        <Button
          onClick={handleArrowLeftClick}
          icon={<Icon icon='arrowLeft' />}
          className={styles.calendarHeaderButton}
        />

        <p>
          {formatDate(
            new Date(selectedYear, selectedMonth, MIN_DAY_NUMBER)
          ).slice(2)}
        </p>
        <Button
          onClick={handleArrowRightClick}
          className={styles.calendarHeaderButton}
          icon={<Icon icon='arrowRight' />}
        />
      </div>
      <div className={styles.calendarDays}>
        {previousMonthDays.map((day, index) => (
          <Button className={styles.calendarDayHidden} key={index}>
            {day}
          </Button>
        ))}
        {selectedMonthDays.map((day, index) => (
          <Button
            onClick={onCalendarDayClick.bind(
              null,
              new Date(selectedYear, selectedMonth, day).toString()
            )}
            className={styles.calendarDay}
            key={index}
          >
            {day}
          </Button>
        ))}
        {nextMonthDays.map((day, index) => (
          <Button className={styles.calendarDayHidden} key={index}>
            {day}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
