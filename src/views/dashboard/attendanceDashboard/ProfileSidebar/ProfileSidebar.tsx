import React, { useState } from "react";
import { Drawer } from "@mui/material";
import { Close } from "@mui/icons-material";
import styles from "./Sidebar.module.css";
import { ProfileInfo } from "../profileInfo";
import { useAppSelector } from "@/redux/store";
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const checkTheme = useAppSelector((state) => state.theme.darkMode)

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      className={styles.drawer}
      classes={{
        paper:`${styles.drawerPaper} ${checkTheme ? styles.darkContainer : ""}`,
      }}
      variant="persistent"
    >
      <div className={styles.sidebarHeader}>
        <div className={styles.headerDiv}>
          <h4>Profile</h4>
        </div>
        <div className={styles.closeIcon} onClick={onClose}>
          <Close className={styles.closeIconImage} />
        </div>
      </div>
      <ProfileInfo />
    </Drawer>
  );
};

export default Sidebar;
