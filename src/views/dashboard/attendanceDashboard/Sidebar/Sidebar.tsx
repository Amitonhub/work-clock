import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
} from "@mui/material";
import { Notifications, Close } from "@mui/icons-material";
import styles from "./Sidebar.module.css";
import MessageIcon from '@mui/icons-material/Message';
import FaceIcon from '@mui/icons-material/Face';
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [notifications, setNotifications] = useState([
    "Notification 1",
    "Notification 2",
    "Notification 3"
  ]);

  const handleChangeTab = (event: React.SyntheticEvent, newTab: number) => {
    setActiveTab(newTab);
  };

  const handleRemoveNotification = (index: number) => {
    setNotifications((prevNotifications) => {
      const updatedNotifications = [...prevNotifications];
      updatedNotifications.splice(index, 1);
      return updatedNotifications;
    });
  };

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
        <div className={styles.headerDiv}>
          <h4>Notifications</h4>
        </div>
        <div className={styles.closeIcon} onClick={onClose}>
          <Close className={styles.closeIconImage} />
        </div>
      </div>

      <Tabs
        value={activeTab}
        onChange={handleChangeTab}
        variant="fullWidth"
        textColor="inherit"
        indicatorColor="secondary"
      >
        <Tab icon={<MessageIcon />} iconPosition="start" label="Recents" />
        <Tab icon={<FaceIcon />} iconPosition="start" label="HR Approved" />
      </Tabs>
      <List>
        {activeTab === 0 &&
          notifications.map((notification, index) => (
            <ListItem
              key={index}
              className={styles.notificationItem}
              onClick={() => handleRemoveNotification(index)}
            >
              <ListItemIcon>
                <Notifications className={styles.NotificationsIcon} />
              </ListItemIcon>
              <ListItemText
                primary={notification}
                className={styles.NotificationsText}
              />
              <div className={styles.closeButton}>
                <Close />
              </div>
            </ListItem>
          ))}
        {activeTab === 1 && (
          <>
            <ListItem className={styles.notificationItem}>
              <ListItemIcon>
                <Notifications className={styles.NotificationsIcon} />
              </ListItemIcon>
              <ListItemText
                primary="HR Approved 1"
                className={styles.NotificationsText}
              />
            </ListItem>
            <ListItem className={styles.notificationItem}>
              <ListItemIcon>
                <Notifications className={styles.NotificationsIcon} />
              </ListItemIcon>
              <ListItemText
                primary="HR Approved 2"
                className={styles.NotificationsText}
              />
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
