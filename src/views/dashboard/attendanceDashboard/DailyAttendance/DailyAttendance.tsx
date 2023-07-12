import React from "react";
import styles from "./DailyAttendance.module.css";
import Tooltip from "@mui/material/Tooltip";

function DailyAttendance() {
  const totalHours = 180.0;
  const approvedHours = 100.0;
  const unapprovedHours = 30.0;
  const holidayHours = 50.0;

  const getProgressBarValue = (hours: number) => {
    return (hours / totalHours) * 100;
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.timeInfo}>
        <h4 className={styles.timeInfoHeaderMain}>
          Hour Breakdown - &nbsp;
          <span className={styles.timeInfoHeader}>{totalHours} Total Hrs</span>
        </h4>
        <Tooltip
        className={styles.progressBar}
          title={`Approved: ${approvedHours} Hrs\nUnapproved: ${unapprovedHours} Hrs\nHolidays: ${holidayHours} Hrs`}
          arrow
          placement="top"
        >
          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressBarSegment}
              style={{
                width: `${getProgressBarValue(approvedHours)}%`,
                backgroundColor: "green",
              }}
            ></div>
            <div
              className={styles.progressBarSegment}
              style={{
                width: `${getProgressBarValue(unapprovedHours)}%`,
                backgroundColor: "crimson",
              }}
            ></div>
            <div
              className={styles.progressBarSegment}
              style={{
                width: `${getProgressBarValue(holidayHours)}%`,
                backgroundColor: "grey",
              }}
            ></div>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

export default DailyAttendance;
