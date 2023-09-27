import React from "react";
import styles from "./DailyAttendance.module.scss";
import Tooltip from "@mui/material/Tooltip";
import { useAppSelector } from "@/redux/store";

function DailyAttendance() {
  const checkTheme = useAppSelector((state) => state.theme.darkMode);
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
        <h4 className={styles.timeInfoHeaderMain} style={{color: checkTheme ? "white" : "black"}}> 
          Hour Breakdown - &nbsp;
          <span className={styles.timeInfoHeader}>{totalHours} Total Hrs</span>
        </h4>
        <div className={styles.progressBarContainer}>
          <Tooltip
            title={`Approved: ${approvedHours} Hrs`}
            arrow
            placement="top-end"
          >
            <button
              className={styles.progressBarSegment}
              style={{
                width: `${getProgressBarValue(approvedHours)}%`,
                backgroundColor: checkTheme ? "#213555" : "#02A4EF",
              }}
              aria-label={`Approved: ${approvedHours} Hrs`}
            />
          </Tooltip>
          <Tooltip
            title={`Unapproved: ${unapprovedHours} Hrs`}
            arrow
            placement="top"
          >
            <button
              className={styles.progressBarSegment}
              style={{
                width: `${getProgressBarValue(unapprovedHours)}%`,
                backgroundColor: "#5A5B5C",
              }}
              aria-label={`Unapproved: ${unapprovedHours} Hrs`}
            />
          </Tooltip>
          <Tooltip
            title={`Holidays: ${holidayHours} Hrs`}
            arrow
            placement="top"
          >
            <button
              className={styles.progressBarSegment}
              style={{
                width: `${getProgressBarValue(holidayHours)}%`,
                backgroundColor: "grey",
              }}
              aria-label={`Holidays: ${holidayHours} Hrs`}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default DailyAttendance;
