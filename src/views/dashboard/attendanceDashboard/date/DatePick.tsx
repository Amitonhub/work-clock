'use client'
import React, { useRef, useState } from 'react'
import styles from "./datePick.module.scss"
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

function DatePick() {
  const [endDate, setEndDate] = useState<Date>(new Date ())
  const endDateRef = useRef() as React.RefObject<ReactDatePicker>;
  const today = new Date();

  const [startDate, setStartDate] = useState<Date>(() => {
    const initialStartDate = new Date(endDate);
    initialStartDate.setDate(initialStartDate.getDate() - 4);
      return initialStartDate;
  })

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
    const newEndDate = new Date(date);
    newEndDate.setDate(newEndDate.getDate() + 4);
    setEndDate(newEndDate);
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
    const newStartDate = new Date (date);
    newStartDate.setDate(newStartDate.getDate() - 4 )
    setStartDate(newStartDate)
  };

  return (
    <div className={styles.holidayDateSection}>
      <ReactDatePicker
        dateFormat="dd-MM-yyyy"
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        className={styles.dateInput}
        placeholderText="DD-MM-YYYY"
        maxDate={today}
      />
      <span className={styles.to}>To</span>
      <ReactDatePicker
        dateFormat="dd-MM-yyyy"
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        maxDate={today} 
        className={styles.dateInput}
        placeholderText="DD-MM-YYYY"
        ref={endDateRef}
      />
    </div>
  );
}

export default DatePick