import React, { useState } from "react";
import styles from "./AttendanceDashboard.module.css";
import { DatePick } from "@/views/dashboard/attendanceDashboard/date";
import { ProfileInfo } from "@/views/dashboard/attendanceDashboard/profileInfo";
import Divider from "@mui/material/Divider";
import { Modal } from "react-bootstrap";
import { QrCode } from "@/views/dashboard/attendanceDashboard/qrCode";
import { DailyAttendance } from "@/views/dashboard/attendanceDashboard/DailyAttendance";
import { DailyAttendanceBreakDown } from "@/views/dashboard/attendanceDashboard/DailyAttendanceBreakDown";
import { AddOvertimeButton } from "@/views/dashboard/attendanceDashboard/Buttons";
import { AddTimeOffButton } from "@/views/dashboard/attendanceDashboard/Buttons";
import { Badge, Icon } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { Sidebar } from "@/views/dashboard/attendanceDashboard/Sidebar";

function AttendanceDashBoard() {
  const [show, setShow] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleToggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  return (
    <div className={styles.container}>
      <div className={styles.navBar}>
        <div className={styles.mainDiv}>
          <div className={styles.maindivHeader}>
            <div className={styles.box}>
              <h5>TimeSheets: </h5>
              <DatePick />
            </div>
            <div className={styles.maindivHeadersub}>
              <div className={styles.QRCodeMain}>
                <button
                  className={`btn btn-secondary rounded-circle ${styles.roundButton}`}
                  onClick={handleShow}
                >
                  <Icon
                    component={QrCodeScannerIcon}
                    fontSize="medium"
                    color="inherit"
                  />
                </button>
                <Modal
                  show={show}
                  onHide={handleClose}
                  className={styles.modalDiv}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>QR Code For Attendance</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <QrCode />
                  </Modal.Body>
                </Modal>
              </div>
              <div className={styles.bellIcon}>
                <Badge color="secondary" badgeContent={4} >
                  <Icon
                    component={NotificationsIcon}
                    fontSize="large"
                    color="inherit"
                    onClick={handleToggleSidebar}
                  />
                </Badge>
              </div>
            </div>
          </div>
          <div className={styles.dailyAttendanceContainer}>
            <DailyAttendance />
          </div>
          <div className={styles.addTimeOffButton}>
            <AddTimeOffButton />
            <AddOvertimeButton />
          </div>
          <div className={styles.dailyAttendanceBreakDown}>
            <DailyAttendanceBreakDown />
          </div>
        </div>
        <div className={styles.profileInfo}>
          <Divider orientation="vertical" flexItem className={styles.Divider} />
          <div className={styles.profileInfoWrapper}>
            <ProfileInfo />
          </div>
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={handleToggleSidebar} />
    </div>
  );
}

export default AttendanceDashBoard;
