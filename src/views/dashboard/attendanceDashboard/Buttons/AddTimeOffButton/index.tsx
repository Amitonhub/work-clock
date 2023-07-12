import React, { useState } from "react";
import {
  Button,
  Popover,
  Box,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";
import Swal from "sweetalert2";
import styles from "./AddTimeOffButton.module.css";
import { ShowConfirmationAlert } from "@/common";

function AddTimeOffButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Lunch Break");

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBreakIn = async (breakType: string) => {
    const confirmed = await ShowConfirmationAlert(breakType);
    if (confirmed) {
      const currentTime = new Date().toLocaleTimeString();
      console.log(`${breakType} : ${currentTime}`);
      Swal.fire(`${breakType} Saved!`, currentTime, "success");
    }
  };

  const handleChangeOption = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const open = Boolean(anchorEl);
  const id = open ? "popover-add-time-off" : undefined;

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
            <Select
              value={selectedOption}
              onChange={handleChangeOption}
              className={styles.dropdown}
            >
              <MenuItem value="Lunch Break">Lunch Break</MenuItem>
              <MenuItem value="Tea Break">Tea Break</MenuItem>
            </Select>
          </div>
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
        </Box>
      </Popover>
    </>
  );
}
export default AddTimeOffButton;
