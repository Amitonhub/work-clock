"use client";
import { Box, Skeleton } from "@mui/material";
import styles from "./DashBoardHeader.module.css";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { toggleMode } from "@/redux/features/ThemeToggleSlice";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAppSelector } from "@/redux/store";

const Logout = dynamic(() => import("@/views/dashboard/Logout/index"));

function DashBoardHeader() {
  const currentPage = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const theme = useAppSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  const handleThemeToggle = () => {
    dispatch(toggleMode(!theme));
  };

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
            ? "Dashboard"
            : "Attendance Reports"}
        </div>
      )}
      {isLoading ? (
        <>
          <Box sx={{ display: "flex", alignItems: "center", padding: "20px" }}>
            <Skeleton
              sx={{ bgcolor: "#444D5C" }}
              variant="rectangular"
              animation="wave"
              width={30}
              height={30}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", padding: "20px" }}>
            <Skeleton
              sx={{ bgcolor: "#444D5C" }}
              variant="rectangular"
              animation="wave"
              width={30}
              height={30}
            />
          </Box>
        </>
      ) : (
        <div style={{ display: "flex", alignItems: "center", paddingRight: "20px" }}>
          <div className={styles.ThemeIcon} onClick={handleThemeToggle}>
            {theme ? <LightModeIcon /> : <DarkModeIcon />}
          </div>
          <div className={styles.logoutDiv}>
            <Logout />
          </div>
        </div>
      )}
    </>
  );
}

export default DashBoardHeader;
