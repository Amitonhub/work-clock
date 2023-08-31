"use client";
import { Box, Skeleton } from "@mui/material";
import styles from "./DashBoardHeader.module.css";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
const Logout = dynamic(() => import("@/views/dashboard/Logout/index"));
function DashBoardHeader() {
  const currentPage = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    });
    return () => {
      setIsLoading(false);
    };
  }, []);
  return (
    <>
      {isLoading ? (
        <Box sx={{ display: "flex", alignItems: "center", padding: "10px" }}>
          <Skeleton
            sx={{ bgcolor: "#444D5C" }}
            variant="rectangular"
            animation="wave"
            width={370}
            height={40}
          />
        </Box>
      ) : (
        <div className={styles.heading}>
          {currentPage === "/dashboard"
            ? "Attendance Dashboard"
            : "Attendance Reports"}
        </div>
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
    </>
  );
}

export default DashBoardHeader;
