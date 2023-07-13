import React, { useState, useEffect } from "react";
import { Button, Popover, Box, Typography, MenuItem, Select } from "@mui/material";
import Swal from "sweetalert2";
import styles from "./AddTimeOffButton.module.css";
import { ShowAlert } from "@/common";

function AddTimeOffButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [showButton, setShowButton] = useState(true);

  const handleClick = (event:any) => {
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
      const currentTime = new Date().toLocaleTimeString();
      console.log(`${breakType} : ${currentTime}`);
      Swal.fire(`${breakType} Saved!`, currentTime, "success");
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "popover-add-time-off" : undefined;

  useEffect(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    
    // Check if the current time is between 1:15 PM and 2:00 PM
    if (currentHour === 13 && currentMinutes >= 15 && currentMinutes <= 59) {
      setSelectedOption("Lunch Break");
      setShowButton(true);
    }
    // Check if the current time is between 4:30 PM and 5:50 PM
    else if (
      (currentHour === 16 && currentMinutes >= 30) ||
      (currentHour === 17 && currentMinutes <= 30)
    ) {
      setSelectedOption("Tea Break");
      setShowButton(true);
    }
    // Default option if the current time is outside the specified ranges
    else {
      setSelectedOption("");
      setShowButton(false);
    }
  }, []);

  if (!showButton) {
    return null;
  }

  return (
    <>
      <Button
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
