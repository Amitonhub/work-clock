'use client'
import React, { useRef, useState } from 'react'
import styles from "./datePick.module.scss"
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

function DatePick() {
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const endDateRef = useRef() as React.RefObject<ReactDatePicker>

  const handleStartDateChange = (date: Date) => {
    setStartDate(date)
    if (date.getTime() > endDate.getTime()) {
      setEndDate(date)
    }
  }

  const handleEndDateChange = (date: Date) => {
    setEndDate(date)
  }

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
        className={styles.dateInput}
        placeholderText="DD-MM-YYYY"
        ref={endDateRef}
      />
    </div>
  );
}

export default DatePick