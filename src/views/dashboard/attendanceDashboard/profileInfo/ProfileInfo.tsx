"use client";
import React from "react";
import styles from "./profileInfo.module.css";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Icon } from "@mui/material";

function ProfileInfo() {
  const name = "Karun Gupta";
  const designation = "Software Engineer";

  return (
    <div className={styles.container}>
      <div className={styles.profileInfo}>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 80, height: 80, fontSize: 40 }}>
            {name[0]}
          </Avatar>
        </div>
        <div className={styles.info}>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.designation}>{designation}</p>
        </div>
      </div>
      <Divider variant="middle" className={styles.Divider} />
      <div className={styles.timeInfo}>
        <strong className={styles.timeInfoHeaderMain}>
          <Icon 
          component={AccessTimeIcon}
          fontSize="large"
          color="inherit"/>
          &nbsp; &nbsp; &nbsp;{" "}
          <span className={styles.timeInfoHeader}>180.00 Total Hrs </span>
        </strong>
      </div>
      <div className={styles.timeInfoSubMain}>
        <div className={styles.timeInfoSub}>
          <span className={styles.timeInfoSubHead}>72 Hrs</span>
          <span className={styles.timeInfoSubInterval}>Regular </span>
        </div>
        <div className={styles.timeInfoSub}>
          <span className={styles.timeInfoSubHead}>35 Hrs</span>
          <span className={styles.timeInfoSubInterval}>OverTime </span>
        </div>
      </div>
      <div className={styles.timeInfoSubMain}>
        <div className={styles.timeInfoSub}>
          <span className={styles.timeInfoSubHead}>24 Hrs</span>
          <span className={styles.timeInfoSubInterval}>Holiday </span>
        </div>
        <div className={styles.timeInfoSub}>
          <span className={styles.timeInfoSubHead}>15 Hrs</span>
          <span className={styles.timeInfoSubInterval}>PTO </span>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
