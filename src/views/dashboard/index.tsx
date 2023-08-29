"use client";
import React from "react";
import styles from "./dashboard.module.css";
import { AttendanceDashBoard } from "@/views/dashboard/attendanceDashboard";
import dynamic from "next/dynamic";
const DashBoardHeader = dynamic(
  () => import("@/views/dashboard/DashBoardHeader/DashBoardHeader")
);
const Dashboard = () => {
  // const userData = (useAppSelector((state) => state.authReducer.userInfo))   // trial for redux selector

  return (
    <div className={styles.mainDiv}>
      <div className={styles.header}>
        <DashBoardHeader />
      </div>
      <div className={styles.attendanceDashboardDiv}>
        <AttendanceDashBoard />
      </div>
    </div>
  );
};

export default Dashboard;
