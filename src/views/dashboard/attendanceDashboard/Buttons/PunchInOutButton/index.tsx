import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import styles from "./PunchInOutButton.module.scss";
import { ShowAlert } from "@/common";
import moment from "moment";
import { AttendanceDataType, Punch } from "@/views/dashboard/types/attendanceDataType";
import { useAppSelector } from "@/redux/store";
import { useAttendanceMutation } from "@/redux/services/attendanceApi";
import { AttendanceTypes } from "@/views/dashboard/types/attendanceType";

const PunchInOutButton = () => {
  const [isPunchedOut, setIsPunchedOut] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [attendanceAction, { data, isLoading, isSuccess, error, isError }] = useAttendanceMutation();
  const userAttendance = useAppSelector((state) => state.attendance.attendanceData)
  const currentTime = new Date();
  const today = moment(currentTime).format('L')
  const currentHour = currentTime.getHours();

  useEffect(() => {
    const hasAttendanceToday = userAttendance?.some((item: AttendanceDataType) => moment(item.date).format('L') === today);
    if (hasAttendanceToday) {
      const attendanceToday = userAttendance.find((item: AttendanceDataType) => moment(item.date).format('L') === today);
      const hasPunchOut = attendanceToday?.punches?.some((item: Punch) => item.type === AttendanceTypes.punchOut);
      setIsPunchedOut(hasPunchOut);
    } else {
      setIsPunchedOut(true);
    }

    // Check if the current time is above 7 pm
    if (currentHour >= 19) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [userAttendance, today, currentHour]);

  const handlePunch = () => {
    const punchAction = "out";
    const confirmText = `Are you sure you want to punch ${punchAction}?`;

    ShowAlert.confirm({
      title: `Confirm Punch ${punchAction}`,
      text: confirmText,
    }).then((result) => {
      if (result.isConfirmed) {
        const punchMessage = `You have punched ${punchAction}.`;
        attendanceAction(AttendanceTypes.punchOut)
        ShowAlert.fire(
          `Punch ${punchAction.charAt(0).toUpperCase() + punchAction.slice(1)}`,
          punchMessage, "success"
        );
      }
    });
  };

  if (!showButton) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      color={"error"}
      className={styles.PunchInOutButton}
      onClick={handlePunch}
      disabled={isPunchedOut}
    >
      {"Punch Out"}
    </Button>
  );
};

export default PunchInOutButton;
