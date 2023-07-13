import React, { useState } from "react";
import { Button } from "@mui/material";
import styles from "./PunchInOutButton.module.css";
import { ShowAlert } from "@/common";

const PunchInOutButton = () => {
  const [isPunchedIn, setIsPunchedIn] = useState(false);

  const handlePunch = () => {
    const punchAction = isPunchedIn ? "out" : "in";
    const confirmText = `Are you sure you want to punch ${punchAction}?`;

    ShowAlert.confirm({
      title: `Confirm Punch ${punchAction}`,
      text: confirmText,
    }).then((result) => {
      if (result.isConfirmed) {
        const currentTime = new Date().toLocaleTimeString();
        const punchMessage = `You have punched ${punchAction}.`;

        console.log(
          `Punched ${
            punchAction.charAt(0).toUpperCase() + punchAction.slice(1)
          } Time:`,
          currentTime
        );
        setIsPunchedIn(!isPunchedIn);
        ShowAlert.fire(
          `Punch ${punchAction.charAt(0).toUpperCase() + punchAction.slice(1)}`,
          punchMessage,
          isPunchedIn ? "success" : "success"
        );
      }
    });
  };

  return (
    <Button
      variant="outlined"
      color={isPunchedIn ? "error" : "success"}
      className={styles.PunchInOutButton}
      onClick={handlePunch}
    >
      {isPunchedIn ? "Punch Out" : "Punch In"}
    </Button>
  );
};

export default PunchInOutButton;
