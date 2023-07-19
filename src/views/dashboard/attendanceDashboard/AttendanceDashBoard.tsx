import React, { useState } from "react";
import styles from "./AttendanceDashboard.module.css";
import Divider from "@mui/material/Divider";
import dynamic from "next/dynamic";
import { Modal } from "react-bootstrap";
import AddOvertimeButton from "./Buttons/AddOvertimeButton";
import { Badge, Icon } from "@mui/material";
import QRCodeScanner from "./QRCodeScanner";

const DatePick = dynamic(() => import("@/views/dashboard/attendanceDashboard/date/DatePick"));
const ProfileInfo = dynamic(() => import("@/views/dashboard/attendanceDashboard/profileInfo/ProfileInfo"));
const QrCode = dynamic(() => import("@/views/dashboard/attendanceDashboard/qrCode/QrCode"));
const DailyAttendance = dynamic(() => import("@/views/dashboard/attendanceDashboard/DailyAttendance/DailyAttendance"));
const DailyAttendanceBreakDown = dynamic(() => import("@/views/dashboard/attendanceDashboard/DailyAttendanceBreakDown/DailyAttendanceBreakDown"));
const PunchInOutButton = dynamic(() => import("@/views/dashboard/attendanceDashboard/Buttons").then((module) => module.PunchInOutButton));
const AddTimeOffButton = dynamic(() => import("@/views/dashboard/attendanceDashboard/Buttons").then((module) => module.AddTimeOffButton));
const NotificationsIcon = dynamic(() => import("@mui/icons-material/Notifications"));
const QrCodeScannerIcon = dynamic(() => import("@mui/icons-material/QrCodeScanner"));
const QrCodeIcon = dynamic(() => import("@mui/icons-material/QrCode"));
const Sidebar = dynamic(() => import("@/views/dashboard/attendanceDashboard/Sidebar/Sidebar"), { loading: () => <div>Loading...</div> });

function AttendanceDashBoard() {
  const [show, setShow] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleToggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const [showQRCodeScanner, setShowQRCodeScanner] = useState(false);

  const handleOpenQRCodeScanner = () => {
    setShowQRCodeScanner(true);
  };

  const handleCloseQRCodeScanner = () => {
    setShowQRCodeScanner(false);
  };

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
              <div className={styles.QRCodeScannerMain}>
                <button
                  className={`btn btn-secondary rounded-circle ${styles.roundButton}`}
                  aria-label="QRCode Scanner"
                  onClick={handleOpenQRCodeScanner}
                >
                  <Icon
                    component={QrCodeScannerIcon}
                    fontSize="medium"
                    color="inherit"
                  />
                </button>
                <Modal
                  show={showQRCodeScanner}
                  onHide={handleCloseQRCodeScanner}
                  className={styles.modalDiv}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>QR Scanner For Attendance</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <QRCodeScanner
                      onScan={(data) => console.log(data)}
                      delay={500}
                    />
                  </Modal.Body>
                </Modal>
              </div>
              <div className={styles.QRCodeMain}>
                <button
                  className={`btn btn-secondary rounded-circle ${styles.roundButton}`}
                  aria-label="QRCode"
                  onClick={handleShow}
                >
                  <Icon
                    component={QrCodeIcon}
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
                <Icon
                  component={NotificationsIcon}
                  fontSize="large"
                  color="inherit"
                  onClick={handleToggleSidebar}
                />
                <Badge
                  color="secondary"
                  badgeContent={4}
                  className={styles.badge}
                />
              </div>
            </div>
          </div>
          <div className={styles.dailyAttendanceContainer}>
            <DailyAttendance />
          </div>
          <div className={styles.addTimeOffButton}>
            <PunchInOutButton />
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
