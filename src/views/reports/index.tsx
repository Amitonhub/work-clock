'use client'
import React, { useEffect } from "react";
import styles from './reports.module.scss'
import { Alert, AlertTitle, Button, Divider } from "@mui/material";
import ReportsTable from "./reports-table";
import { DatePick } from "../dashboard/attendanceDashboard/date";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RefreshIcon from '@mui/icons-material/Refresh';
import EastIcon from '@mui/icons-material/East';
import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import { CSVLink } from "react-csv";
import { AttendanceDataType } from "../dashboard/types/attendanceDataType";
import { ToastSuccess } from "@/utils/showToastAlerts";
import { useRouter } from "next/navigation";
import ConfirmDownload from "./utils/ConfirmDownload";

function ReportsPage() {
  const router = useRouter()
  const user = useAppSelector((state) => state.user.UserData)
  const userAttendance = useAppSelector((state) => state.attendance.attendanceData)
  const formattedData = userAttendance?.map((item: AttendanceDataType) => ({
    ...item,
    date: new Date(item.date),
  }));

  const refreshClick = () => {
    window.location.reload()
    ToastSuccess('data has been updated')
  }

  if (!formattedData) {
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      There is an error in fetching — <strong>report!</strong>
    </Alert>
  }

  return (
    <div className={styles.mainDiv}>
      <div className={styles.header}>Attendance Report</div>
      <Divider variant="middle" className={styles.Divider} />
      <div className={styles.tableHeader}>
        <div className={styles.datePickReports}>
          <h5>Choose dates : &nbsp;</h5>
          <span>
            <DatePick />
          </span>
        </div>
        <div className={styles.rightHeaderDiv}>
          <ConfirmDownload user={user} data={userAttendance} open={true} />
          <Button onClick={refreshClick} className={styles.reportDownload} variant="contained"><RefreshIcon /></Button>
        </div>
      </div>
      <Link href={'/'}>
        <Button className={styles.reportButton} variant="outlined">Go to Dashboard &nbsp;  <EastIcon className={styles.leftArrow} /> </Button>
      </Link>
      {formattedData ?
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Your Attendance Report Generated  — <strong>Successfully!</strong>
        </Alert>
        :
        <Alert severity="info">
          <AlertTitle>Wait</AlertTitle>
          Report is — <strong>fetching!</strong>
        </Alert>
      }
      <ReportsTable />
    </div>
  )
}

export default ReportsPage;
