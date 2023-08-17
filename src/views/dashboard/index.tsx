"use client";
import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { AttendanceDashBoard } from "@/views/dashboard/attendanceDashboard";
import Divider from "@mui/material/Divider";
import { RootState, useAppSelector } from "@/redux/store";
import Logout from "./Logout";
import { Box, Skeleton } from "@mui/material";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      setIsLoading(false);
    };
  }, []);
  // const userData = (useAppSelector((state) => state.authReducer.userInfo))   // trial for redux selector

  return (
    <div className={styles.mainDiv}>
      {/* <h1>{userData?.email}</h1> */}
      <div className={styles.header}>
        {isLoading ? (
          <Box sx={{ display: "flex", alignItems: "center", padding: "10px" }}>
            <Skeleton
              sx={{ bgcolor: "#444D5C" }}
              variant="rectangular"
              animation="wave"
              width={450}
              height={50}
            />
          </Box>
        ) : (
          <div className={styles.heading}>Time & Attendance</div>
        )}
        {isLoading ? (
          <Box sx={{ display: "flex", alignItems: "center", padding: "20px" }}>
            <Skeleton
              sx={{ bgcolor: "#444D5C" }}
              variant="rectangular"
              animation="wave"
              width={30}
              height={30}
            />
          </Box>
        ) : (
          <div className={styles.logoutDiv}>
            <Logout />
          </div>
        )}
      </div>
      <Divider variant="middle" className={styles.Divider} />
      {/*  */}
      <div className={styles.attendanceDashboardDiv}>
        <AttendanceDashBoard />
      </div>
    </div>
  );
};

export default Dashboard;
