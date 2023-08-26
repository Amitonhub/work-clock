import React, { useState, useEffect } from "react";
import { Button, Popover, Box, Typography, MenuItem, Select } from "@mui/material";
import Swal from "sweetalert2";
import styles from "./AddTimeOffButton.module.css";
import { ShowAlert } from "@/common";
import { useAttendanceMutation } from "@/redux/services/attendanceApi";
import { AttendanceTypes } from "@/views/dashboard/types/attendanceType";
import Loader from "@/components/Loader/Loader";
import { ToastError } from "@/utils/showToastAlerts";
import { useAppSelector } from "@/redux/store";
import { AttendanceDataType, Punch } from "@/views/dashboard/types/attendanceDataType";
import moment from "moment";
import { mealIn, mealOut, teaIn, teaOut } from "../../../../../../variable";

function AddTimeOffButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [showButton, setShowButton] = useState(true);
  const [isAllPunchDone, setIsAllPunchDone] = useState(false);
  const [attendanceAction, { data, isLoading, isSuccess, error, isError }] = useAttendanceMutation();
  const userAttendance = useAppSelector((state) => state.attendance.attendanceData)
  const currentTime = new Date().toLocaleTimeString();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBreakIn = async (breakType: string) => {
    handleClose();
    const confirmed = await ShowAlert.confirm({
      title: `Confirm ${breakType}`,
      text: `Are you sure you want to take ${breakType}?`,
    });
    if (confirmed.isConfirmed) {
      console.log(`${breakType} : ${currentTime}`);
      attendanceAction(breakType)
    }
    if (isSuccess) {
      Swal.fire(`${breakType} Saved!`, currentTime, "success");
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "popover-add-time-off" : undefined;

  useEffect(() => {
    const currentTime = new Date();
    const today = moment(currentTime).format('L')
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();

    // Check if the current time is between 1:15 PM and 2:00 PM
    if (currentHour === 13 && currentMinutes >= 15 && currentMinutes <= 59) {
      setSelectedOption("Lunch Break");
      setShowButton(true);
    }
    // Check if the current time is between 4:30 PM and 5:50 PM
    else if (
      (currentHour === teaIn.TEA_IN_HOUR &&
        currentMinutes >= teaIn.TEA_IN_MINUTE) ||
      (currentHour === teaOut.TEA_OUT_HOUR &&
        currentMinutes <= teaOut.TEA_OUT_MINUTE)
    ) {
      setShowButton(true);
    }
    // Default option if the current time is outside the specified ranges
    else {
      setSelectedOption("");
      setShowButton(false);
    }

    if (isLoading) {
      <Loader />
    }
    if (isError) {
      ToastError("you have already took break")
    }
  }, [isError, isLoading, userAttendance]);

  if (!showButton) {
    return null;
  }

  return (
    <>
      <Button
        disabled={isAllPunchDone}
        variant="outlined"
        color="warning"
        onClick={handleClick}
        className={styles.mainButton}
      >
        Add Time Off
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box className={styles.popoverContent}>
          <Typography variant="h6" className={styles.headerPopOver}>
            Time Off
          </Typography>
          <div className={styles.formGroup}>
            {selectedOption === "" ? (
              <Select
                value={selectedOption}
                onChange={(event) => setSelectedOption(event.target.value)}
                className={styles.dropdown}
              >
                <MenuItem value="">Select an option</MenuItem>
              </Select>
            ) : (
              <Typography>{selectedOption}</Typography>
            )}
          </div>
          {selectedOption !== "" && (
            <div className={styles.buttonDiv}>
              <div className={styles.formGroup}>
                <Button
                  variant="contained"
                  className={styles.primaryButton}
                  onClick={() => handleBreakIn(selectedOption)}
                >
                  Take Break
                </Button>
              </div>
              <div className={styles.buttonGroup}>
                <Button
                  variant="contained"
                  color="error"
                  className={styles.secondaryButton}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </Box>
      </Popover>
    </>
  );
}

export default AddTimeOffButton;
