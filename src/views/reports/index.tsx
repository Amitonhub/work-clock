"use client";
import React, { useEffect, useState } from "react";
import styles from "./reports.module.scss";
import { Alert, AlertTitle, Box, Button, Skeleton } from "@mui/material";
import ReportsTable from "./reports-table";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import { AttendanceDataType } from "../dashboard/types/attendanceDataType";
import ConfirmDownload from "./utils/ConfirmDownload";
import dynamic from "next/dynamic";
const DashBoardHeader = dynamic(
  () => import("@/views/dashboard/DashBoardHeader/DashBoardHeader")
);
const DatePick = dynamic(
  () => import("@/views/dashboard/attendanceDashboard/date/DatePick")
);

function ReportsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const user = useAppSelector((state) => state.user.UserData);
  const userAttendance = useAppSelector(
    (state) => state.attendance.attendanceData
  );
  const formattedData = userAttendance?.map((item: AttendanceDataType) => ({
    ...item,
    date: new Date(item.date),
  }));

  if (!formattedData) {
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      There is an error in fetching — <strong>report!</strong>
    </Alert>;
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    });
    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.header}>
        <DashBoardHeader />
      </div>
      <div className={styles.tableHeader}>
        {isLoading ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Skeleton variant="text" width={121} height={25} />
            <Skeleton variant="rectangular" width={115} height={35} />
            <Skeleton variant="rounded" width={40} height={35} />
            <Skeleton variant="rectangular" width={115} height={35} />
          </Box>
        ) : (
          <div className={styles.datePickReports}>
            <h5>TimeSheet : &nbsp;</h5>
            <span>
              <DatePick />
            </span>
          </div>
        )}
        {isLoading ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Skeleton variant="rounded" width={170} height={38} />
          </Box>
        ) : (
          <ConfirmDownload user={user} data={userAttendance} open={true} />
        )}
      </div>
      <div className={styles.tableMainDiv}>
        {isLoading ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Skeleton variant="rounded" width={206} height={35} />
          </Box>
        ) : (
          <Link href={"/dashboard"}>
            <Button className={styles.reportButton} variant="outlined">
              <ArrowBackIcon className={styles.leftArrow} /> &nbsp; Go to
              Dashboard{" "}
            </Button>
          </Link>
        )}
        {formattedData ? (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Your Attendance Report Generated — <strong>Successfully!</strong>
          </Alert>
        ) : (
          <Alert severity="info">
            <AlertTitle>Wait</AlertTitle>
            Report is — <strong>fetching!</strong>
          </Alert>
        )}
        <ReportsTable />
      </div>
    </div>

  );
}

export default ReportsPage;
