'use client'
import React, { useState } from 'react'
import styles from "./date.module.css"

function DatePick() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value);
    setSelectedDate(selectedDate);
  };

  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className={styles.mainDiv}>
      <input
        type="date"
        className={styles.dateDiv}
        max={currentDate}
        value={selectedDate.toISOString().split('T')[0]}
        onChange={handleDateChange}
      />
    </div>
  );
}

export default DatePick