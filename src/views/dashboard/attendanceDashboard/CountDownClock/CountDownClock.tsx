import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { variables } from "@/constants";

function CountDownClock() {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };
  return (
    <>
      <CountdownCircleTimer
        isPlaying
        duration={variables.COUNTDOWN_CLOCK_DURATION}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[
          variables.COUNTDOWN_CLOCK_DURATION * 0.75,
          variables.COUNTDOWN_CLOCK_DURATION * 0.5,
          variables.COUNTDOWN_CLOCK_DURATION * 0.25,
          variables.COUNTDOWN_CLOCK_DURATION * 0,
        ]}
        size={130}
      >
        {({ remainingTime }) => <h5>{formatTime(remainingTime)}</h5>}
      </CountdownCircleTimer>
    </>
  );
}

export default CountDownClock;
