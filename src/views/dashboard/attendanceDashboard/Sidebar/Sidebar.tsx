import React from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Notifications, Close } from "@mui/icons-material";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      className={styles.drawer}
      classes={{
        paper: styles.drawerPaper,
      }}
      variant="persistent"
    >
      <div className={styles.sidebarHeader}>
        <div className={styles.arrowIcon} onClick={onClose}>
          <Close className={styles.arrowIconImage} />
        </div>
      </div>
      <List>
        <ListItemButton>
          <ListItemIcon>
            <Notifications />
          </ListItemIcon>
          <ListItemText primary="Notifications"/>
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
