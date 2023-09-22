import usePersistantTimer from "./utils/ptimer";
import styles from "./countDown.module.scss";
import React, { useEffect } from "react";
import { Oswald } from 'next/font/google'

const oswald = Oswald({ subsets: ['latin'] })

const CountDownClock = () => {
  const [count, start, pause, reset] = usePersistantTimer(false, { updateFrequency: 1, maximumValue: 0 });

  const countdown = (value: number, count: number): string => {
    const seconds = Math.round(count / 1000);
    const remainingSeconds = value - seconds;
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const remainingSecondsFormatted = remainingSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSecondsFormatted.toString().padStart(2, '0')}`;
  };

  const counter = countdown(32400 , count)

  useEffect(() => {
    if(counter === "00:00:00"){
      pause();
    }
  },[count])

  return (
    <div className={`${oswald.className} ${styles.timerDiv}`}>
      {/* <div className={styles.buttonGroup}>
        <button onClick={start}>start</button>
        <button onClick={pause}>pause</button>
        <button onClick={reset}>reset</button>
      </div> */}
      <div className={styles.countdownCircle}>
        <div className={styles.countdownText}>{counter}</div>
      </div>
    </div>
  );
};

export default CountDownClock;
