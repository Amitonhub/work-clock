"use client";
import React from "react";
import styles from "./dashboard.module.scss";
import { AttendanceDashBoard } from "@/views/dashboard/attendanceDashboard";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/redux/store";
const DashBoardHeader = dynamic(
  () => import("@/views/dashboard/DashBoardHeader/DashBoardHeader")
);
const Dashboard = () => {
  const checkTheme = useAppSelector((state) => state.theme.darkMode);

  return (
    <div className={styles.mainDiv}>
      <div className={`${styles.header} ${checkTheme ? styles.darkHeading : styles.lightHeading}`}>
        <DashBoardHeader />
      </div>
      <div className={styles.attendanceDashboardDiv}>
        <AttendanceDashBoard />
      </div>
    </div>
  );
};

export default Dashboard;
