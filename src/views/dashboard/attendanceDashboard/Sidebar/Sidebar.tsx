import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import {
  Divider,
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
import MessageIcon from "@mui/icons-material/Message";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useFetchNotificationsQuery } from "@/redux/services/notificationApi";
import { IUserNotification, notificationsData } from "@/redux/features/notificationSlice";
import { useDispatch } from "react-redux";
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const [starredNotifications, setStarredNotifications] = useState<string[]>([]);
  const {isLoading: isNotificationLoading,data,error,isSuccess,} = useFetchNotificationsQuery();
    
  const formattedData = data?.map((item: IUserNotification) => ({
    ...item,
    message: item.message,
    starred: item.starred
  }));

  const [notifications, setNotifications] = useState<
    { message: string; starred: boolean }[]
  >(formattedData || []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(notificationsData(formattedData || []));
    }
    if (error) {
      console.log('errror', error)
    }
  }, [notificationsData, isSuccess, error])

  const handleChangeTab = (event: SyntheticEvent, newTab: number) => {
    setActiveTab(newTab);
  };

  const toggleStar = (index: number) => {
    const updatedNotifications = [...notifications];
    updatedNotifications[index].starred = !updatedNotifications[index].starred;

    if (updatedNotifications[index].starred) {
      setStarredNotifications([
        ...starredNotifications,
        updatedNotifications[index].message,
      ]);
    } else {
      const newStarredNotifications = starredNotifications.filter(
        (message) => message !== updatedNotifications[index].message
      );
      setStarredNotifications(newStarredNotifications);
    }

    setNotifications(updatedNotifications);
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
      <Divider className={styles.dividerMainDiv} />
      <Tabs
        value={activeTab}
        onChange={handleChangeTab}
        variant="fullWidth"
        textColor="inherit"
        indicatorColor="primary"
      >
        <Tab icon={<MessageIcon />} iconPosition="start" label="All" />
        <Tab icon={<StarBorderIcon />} iconPosition="start" label="Starred" />
      </Tabs>
      {isNotificationLoading ? (
        <h6>Loading...</h6>
      ) : (
        <List>
          {activeTab === 0 &&
            notifications.map((notification, index) => (
              <>
                <ListItem key={index} className={styles.notificationItem}>
                  <ListItemIcon>
                    <Notifications className={styles.NotificationsIcon} />
                  </ListItemIcon>

                  <ListItemText
                    primary={notification.message}
                    className={styles.NotificationsText}
                  />
                  <div
                    className={styles.starBorderIconButton}
                    onClick={() => toggleStar(index)}
                    style={{
                      color: notification.starred ? "yellow" : "inherit",
                    }}
                  >
                    <StarBorderIcon />
                  </div>
                </ListItem>
                <Divider variant="inset" className={styles.dividerMain} />
              </>
            ))}
          {activeTab === 1 &&
            starredNotifications.map((message, index) => (
              <>
                <ListItem key={index} className={styles.notificationItem}>
                  <ListItemIcon>
                    <Notifications className={styles.NotificationsIcon} />
                  </ListItemIcon>
                  <ListItemText
                    primary={message}
                    className={styles.NotificationsText}
                  />
                  <div
                    className={styles.starBorderIconButton}
                    onClick={() =>
                      toggleStar(
                        notifications.findIndex(
                          (notification) => notification.message === message
                        )
                      )
                    }
                    style={{ color: "yellow" }}
                  >
                    <StarIcon />
                  </div>
                </ListItem>
                <Divider variant="inset" className={styles.dividerMain} />
              </>
            ))}
        </List>
      )}
    </Drawer>
  );
};

export default Sidebar;
