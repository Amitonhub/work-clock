import React, { useState, useEffect } from "react";
import { Button, Popover, Box, Typography, TextField } from "@mui/material";
import styles from "./AddOvertimeButton.module.css";
import { ShowAlert } from "@/common";
import { overtime } from "../../../../../../variable";

const AddOvertimeButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [overtimeValue, setOvertimeValue] = useState("00:00");
  const [projectManager, setProjectManager] = useState("");
  const [projectName, setProjectName] = useState("");
  const [isValidationVisible, setValidationVisible] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddOvertime = () => {
    handleClose();
    if (!isValidOvertimeFormat(overtimeValue)) {
      ShowAlert.fire(
        "Invalid Input",
        "Please enter a valid overtime format (HH:MM)",
        "error"
      );
      return;
    }

    ShowAlert.confirm({
      title: "Confirm Overtime",
      text: `Add overtime: ${overtimeValue}?`,
    }).then((result) => {
      if (result.isConfirmed) {
        const currentTime = new Date().toLocaleTimeString();
        console.log("Overtime:", overtimeValue);
        console.log("Project Manager:", projectManager);
        console.log("Project Name:", projectName);
        ShowAlert.fire(
          "Overtime Added!",
          `Overtime: ${overtimeValue}`,
          "success"
        );
        setDisableButton(true); 
      }
    });
  };

  const handleChangeOvertime = (event: any) => {
    setOvertimeValue(event.target.value);
  };

  const handleChangeProjectManager = (event: any) => {
    setProjectManager(event.target.value);
  };

  const handleChangeProjectName = (event: any) => {
    setProjectName(event.target.value);
  };

  const isValidOvertimeFormat = (value: string) => {
    const overtimeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return overtimeRegex.test(value);
  };

  useEffect(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();

    // Check if the current time is between 7:00 PM and 11:00 PM
    if (currentHour >= overtime.OVERTIME_START_HOUR && currentHour <= overtime.OVERTIME_END_HOUR) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? "popover-add-overtime" : undefined;

  return (
    <>
      <Button
        variant="outlined"
        color="inherit"
        className={styles.overtimeButton}
        onClick={handleClick}
        disabled={disableButton}
      >
        Add Overtime
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
            Add Overtime
          </Typography>
          <form>
            <div className={styles.formGroup}>
              <TextField
                label="Overtime (HH:MM)"
                value={overtimeValue}
                onChange={handleChangeOvertime}
                onFocus={() => setValidationVisible(true)}
                onBlur={() => setValidationVisible(true)}
                fullWidth
                margin="normal"
                error={
                  !isValidOvertimeFormat(overtimeValue) && isValidationVisible
                }
                helperText={
                  !isValidOvertimeFormat(overtimeValue) && isValidationVisible
                    ? "Invalid format (HH:MM)"
                    : ""
                }
              />
            </div>
            <div className={styles.formGroup}>
              <TextField
                label="Project Manager"
                value={projectManager}
                onChange={handleChangeProjectManager}
                fullWidth
                margin="normal"
              />
            </div>
            <div className={styles.formGroup}>
              <TextField
                label="Project Name"
                value={projectName}
                onChange={handleChangeProjectName}
                fullWidth
                margin="normal"
              />
            </div>
            <div className={styles.buttonGroup}>
              <Button
                variant="contained"
                color="primary"
                className={styles.primaryButton}
                onClick={handleAddOvertime}
              >
                Add Overtime
              </Button>
              <Button
                variant="contained"
                color="error"
                className={styles.secondaryButton}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Popover>
    </>
  );
};

export default AddOvertimeButton;
