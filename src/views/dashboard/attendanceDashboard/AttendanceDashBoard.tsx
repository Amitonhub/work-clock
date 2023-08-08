import React, { useState, useRef, useEffect } from "react";
import styles from "./AttendanceDashboard.module.css";
import Divider from "@mui/material/Divider";
import dynamic from "next/dynamic";
import { Modal } from "react-bootstrap";
import AddOvertimeButton from "./Buttons/AddOvertimeButton";
import { Badge, Icon } from "@mui/material";
import QRCodeScanner from "./QRCodeScanner";

import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const DatePick = dynamic(
  () => import("@/views/dashboard/attendanceDashboard/date/DatePick")
);
const ProfileInfo = dynamic(
  () => import("@/views/dashboard/attendanceDashboard/profileInfo/ProfileInfo")
);
const QrCode = dynamic(
  () => import("@/views/dashboard/attendanceDashboard/qrCode/QrCode")
);
const DailyAttendance = dynamic(
  () =>
    import(
      "@/views/dashboard/attendanceDashboard/DailyAttendance/DailyAttendance"
    )
);
const DailyAttendanceBreakDown = dynamic(
  () =>
    import(
      "@/views/dashboard/attendanceDashboard/DailyAttendanceBreakDown/DailyAttendanceBreakDown"
    )
);
const PunchInOutButton = dynamic(() =>
  import("@/views/dashboard/attendanceDashboard/Buttons").then(
    (module) => module.PunchInOutButton
  )
);
const AddTimeOffButton = dynamic(() =>
  import("@/views/dashboard/attendanceDashboard/Buttons").then(
    (module) => module.AddTimeOffButton
  )
);
const NotificationsIcon = dynamic(
  () => import("@mui/icons-material/Notifications")
);
const AccountCircleIcon = dynamic(
  () => import("@mui/icons-material/AccountCircle")
);
const QrCodeScannerIcon = dynamic(
  () => import("@mui/icons-material/QrCodeScanner")
);
const QrCodeIcon = dynamic(() => import("@mui/icons-material/QrCode"));
const Sidebar = dynamic(
  () => import("@/views/dashboard/attendanceDashboard/Sidebar/Sidebar")
);
const ProfileSidebar = dynamic(
  () =>
    import(
      "@/views/dashboard/attendanceDashboard/ProfileSidebar/ProfileSidebar"
    )
);

function AttendanceDashBoard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileSidebarOpen, setProfileSidebarOpen] = useState(false);
  const qrCodeScannerValue = useRef<any>() 
  const handleToggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const handleToggleProfileSidebar = () =>
    setProfileSidebarOpen(!isProfileSidebarOpen);

  const [showQRCodeScanner, setShowQRCodeScanner] = useState(false);

  useEffect(() => {
    const checkCamera = (async() => {
      try{
          if(await navigator.mediaDevices.getUserMedia({video: true})){
              return 'camera detected'
          }
      }catch(err){
          qrCodeScannerValue.current.style.display = 'none';        // uncomment for hiding qr scanner in desktop
          console.log("err", err)
          return "err"
      }
  })
    checkCamera()
}, [])
    
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    });
    return () => {
      setIsLoading(false);
    };
  }, []);

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
              {isLoading ? (
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Skeleton variant="rectangular" width={115} height={30} />
                  <Skeleton variant="text" width={115} height={35} />
                  <Skeleton variant="rectangular" width={40} height={40} />
                  <Skeleton variant="text" width={115} height={35} />
                </Box>
              ) : (
                <DatePick />
              )}
            </div>
            <div className={styles.maindivHeadersub}>
              {isLoading ? (
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Skeleton
                    variant="circular"
                    animation="wave"
                    width={55}
                    height={55}
                  />
                  <Skeleton
                    variant="circular"
                    animation="wave"
                    width={55}
                    height={55}
                  />
                  <Skeleton
                    variant="circular"
                    animation="wave"
                    width={55}
                    height={55}
                  />
                </Box>
              ) : (
                <>
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
                      <Modal.Header closeButton className={styles.modalHeader}>
                        <Modal.Title className={styles.modalTitle}>
                          QR Scanner For Attendance
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body className={styles.modalBody}>
                        <QRCodeScanner
                          setShowQRCodeScanner={setShowQRCodeScanner}
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
                      <Modal.Header
                        closeButton
                        className={styles.qrModalHeader}
                      >
                        <Modal.Title className={styles.qrModalTitle}>
                          QR Code For Attendance
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body className={styles.qrCodeBody}>
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
                    <Badge badgeContent={4} className={styles.badge} />
                  </div>
                  <div className={styles.profileIcon}>
                    <Icon
                      component={AccountCircleIcon}
                      color="inherit"
                      onClick={handleToggleProfileSidebar}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className={styles.dailyAttendanceContainer}>
            {isLoading ? (
              <Box sx={{ alignItems: "center" }}>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={380}
                  height={40}
                />
                <Skeleton variant="text" animation="wave" width={1400} />
              </Box>
            ) : (
              <DailyAttendance />
            )}
          </div>
          <div className={styles.addTimeOffButton}>
            {isLoading ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={120}
                  height={40}
                />
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={120}
                  height={40}
                />
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={120}
                  height={40}
                />
              </Box>
            ) : (
              <>
                <PunchInOutButton />
                <AddTimeOffButton />
                <AddOvertimeButton />
              </>
            )}
          </div>
          <div className={styles.dailyAttendanceBreakDown}>
            {isLoading ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={1400}
                  height={140}
                />
              </Box>
            ) : (
              <DailyAttendanceBreakDown />
            )}
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
      <ProfileSidebar
        isOpen={isProfileSidebarOpen}
        onClose={handleToggleProfileSidebar}
      />
    </div>
  );
}

export default AttendanceDashBoard;
