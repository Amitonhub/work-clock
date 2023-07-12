import React, { useState } from "react";
import {
  Button,
  Popover,
  Box,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import Swal from "sweetalert2";
import styles from "./AddOvertimeButton.module.css";

const AddOvertimeButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [overtimeValue, setOvertimeValue] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [projectName, setProjectName] = useState("");
  const [isValidationVisible, setValidationVisible] = useState(false);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddOvertime = () => {
    if (!isValidOvertimeFormat(overtimeValue)) {
      Swal.fire(
        "Invalid Input",
        "Please enter a valid overtime format (HH:MM)",
        "error"
      );
      return;
    }

    const currentTime = new Date().toLocaleTimeString();
    console.log("Overtime:", overtimeValue);
    console.log("Project Manager:", projectManager);
    console.log("Project Name:", projectName);
    Swal.fire("Overtime Added!", `Overtime: ${overtimeValue}`, "success");
    handleClose();
  };

  const handleChangeOvertime = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setOvertimeValue(event.target.value);
  };

  const handleChangeProjectManager = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setProjectManager(event.target.value);
  };

  const handleChangeProjectName = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setProjectName(event.target.value);
  };

  const isValidOvertimeFormat = (value: string) => {
    const overtimeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return overtimeRegex.test(value);
  };

  const open = Boolean(anchorEl);
  const id = open ? "popover-add-overtime" : undefined;

  return (
    <>
      <Button
        variant="outlined"
        color="inherit"
        className={styles.overtimeButton}
        onClick={handleClick}
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
                label="Overtime Value (HH:MM)"
                value={overtimeValue}
                onChange={handleChangeOvertime}
                onFocus={() => setValidationVisible(true)}
                onBlur={() => setValidationVisible(false)}
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
                color="secondary"
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
