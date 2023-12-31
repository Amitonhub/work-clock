"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./AttendanceDashboard.module.scss";
import dynamic from "next/dynamic";
import { Modal } from "react-bootstrap";
import AddOvertimeButton from "./Buttons/AddOvertimeButton";
import { Badge, Button, Icon } from "@mui/material";
import QRCodeScanner from "./QRCodeScanner";
import EastIcon from "@mui/icons-material/East";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Link from "next/link";
import moment from "moment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { IUserNotification } from "@/redux/features/notificationSlice";
import { useFetchNotificationsQuery } from "@/redux/services/notificationApi";
import { useAppSelector } from "@/redux/store";

const ProfileInfo = dynamic(
  () => import("@/views/dashboard/attendanceDashboard/profileInfo/ProfileInfo")
);
const DailyAttendance = dynamic(
  () =>
    import(
      "@/views/dashboard/attendanceDashboard/DailyAttendance/DailyAttendance"
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
const Sidebar = dynamic(
  () => import("@/views/dashboard/attendanceDashboard/Sidebar/Sidebar")
);
const ProfileSidebar = dynamic(
  () =>
    import(
      "@/views/dashboard/attendanceDashboard/ProfileSidebar/ProfileSidebar"
    )
);
const TimelineData = dynamic(
  () =>
    import("@/views/dashboard/attendanceDashboard/TimelineData/TimelineData")
);
const CountDownClock = dynamic(
  () =>
    import(
      "@/views/dashboard/attendanceDashboard/CountDownClock/CountDownClock"
    )
);
const TimeChart = dynamic(
  () => import("@/views/dashboard/attendanceDashboard/Timechart/TimeChart")
);
const OnTimeLatePunch = dynamic(
  () =>
    import(
      "@/views/dashboard/attendanceDashboard/OnTimeLatePunch/OnTimeLatePunch"
    )
);

function AttendanceDashBoard() {
  const todaysDate = moment().format("ddd, MMM Do YYYY");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProfileSidebarOpen, setProfileSidebarOpen] = useState(false);
  const [showQRCodeScanner, setShowQRCodeScanner] = useState(false);
  const qrCodeScannerValue = useRef<any>();
  const handleToggleSidebar = () =>
    setSidebarOpen(isSidebarOpen === false ? true : false);
  const handleToggleProfileSidebar = () =>
    setProfileSidebarOpen(isProfileSidebarOpen === false ? true : false);

  const { isLoading: isNotificationLoading, data } =
    useFetchNotificationsQuery();
  const formattedData = data?.map((item: IUserNotification) => ({
    ...item,
    message: item.message,
  }));
  const checkTheme = useAppSelector((state) => state.theme.darkMode)

  useEffect(() => {
    const checkCamera = async () => {
      try {
        if (await navigator.mediaDevices.getUserMedia({ video: true })) {
          return "camera detected";
        }
      } catch (err) {
        qrCodeScannerValue.current.style.display = "none"; // uncomment for hiding qr scanner in desktop
        console.log("err", err);
        return "err";
      }
    };
    checkCamera();
  }, []);

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
                  <Skeleton variant="rounded" width={24} height={24} />
                  <Skeleton variant="rounded" width={164} height={40} />
                </Box>
              ) : (
                <div className={styles.headerMainDiv}>
                  <div style={{ display: isLoading ? "none" : "flex", color: checkTheme ? "gray" : "white", backgroundColor: checkTheme ? "#213555" : "#02A4EF", borderRadius: "50px", height: "38px", width: "40px", alignItems: "flex-end" }}>
                    <h4 style={{ paddingLeft: "8px" }}>
                      <CalendarTodayIcon />
                    </h4>
                  </div>
                  <div>
                    <Button
                      className={styles.todaysDateButton}
                      style={{
                        marginLeft: "10px",
                        marginBottom: "10px",
                        borderRadius: "20px",
                        color: checkTheme ? "steelblue" : "white",
                        fontWeight: "bold",
                        backgroundColor: checkTheme ? "#213555" : "#02A4EF",
                      }}
                      variant="contained"
                      disabled
                    >
                      {todaysDate}
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.maindivHeadersub}>
              <div
                className={styles.QRCodeScannerMain}
                ref={qrCodeScannerValue}
              >
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
                </Box>
              ) : (
                <>
                  <div className={styles.bellIcon} style={{ backgroundColor: checkTheme ? "#213555" : "#02A4EF" }}>
                    <Icon
                      component={NotificationsIcon}
                      fontSize="large"
                      color="inherit"
                      onClick={handleToggleSidebar}
                    />
                    {isNotificationLoading ? (
                      <Badge className={styles.badge} />
                    ) : (
                      <Badge
                        badgeContent={formattedData?.length}
                        className={styles.badge}
                      />
                    )}
                  </div>
                  <div className={`${styles.profileIcon} ${checkTheme ? styles.darkProfileIcon : styles.lightProfileIcon}`}>
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
                <Skeleton variant="text" animation="wave" width={1010} />
              </Box>
            ) : (
              <DailyAttendance />
            )}
          </div>
          <div className={styles.addTimeOffButton}>
            {isLoading ? (
              <Box sx={{ alignItems: "center" }}>
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={250}
                  height={40}
                />
              </Box>
            ) : (
              <Link href={"/reports"}>
                <div>
                  <Button
                    style={{
                      margin: "10px 0",
                      borderRadius: "30px",
                      backgroundColor: checkTheme ? "#00092c" : "#02A4EF",
                    }}
                    variant="contained"
                  >
                    Go to Detailed Report &nbsp;{" "}
                    <EastIcon />{" "}
                  </Button>
                </div>
              </Link>
            )}
            {isLoading ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={120}
                  height={40}
                />
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={120}
                  height={40}
                />
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={120}
                  height={40}
                />
              </Box>
            ) : (
              <div>
                <PunchInOutButton />
                <AddTimeOffButton />
                <AddOvertimeButton />
              </div>
            )}
          </div>
          <div className={styles.dailyAttendanceBreakDown}>
            {isLoading ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={370}
                  height={320}
                />
              </Box>
            ) : (
              <div className={styles.timelineFormatMainDiv}>
                <Box
                  sx={{
                    width: "max-content",
                    height: "max-content",
                    backgroundColor: checkTheme ? "#213555" : "white",
                    color: checkTheme ? "white" : "black",
                    "&:hover": {
                      backgroundColor: checkTheme ? "#141E46" : "",
                      color: checkTheme ? "white" : "black",
                    },
                    borderRadius: "5%",
                  }}
                >
                  <TimelineData />
                </Box>
              </div>
            )}
            <div className={styles.subDailyAttendanceBreakDown}>
              <div className={styles.subDailyAttendanceBreakDownSubDiv}>
                <div className={styles.countDownMainDiv}>
                  {isLoading ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        width={315}
                        height={140}
                      />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: "315px",
                        height: "140px",
                        backgroundColor: checkTheme ? "#00092C" : "#2F2F2F",
                        color: "white",
                        padding: "5px",
                        "&:hover": {
                          backgroundColor: checkTheme ? "#141E46" : "white",
                          color: checkTheme ? "white" : "black",
                        },
                        borderRadius: "10px",
                        // boxShadow: "5px 5px 5px #bdbdbd",
                      }}
                    >
                      <div className={styles.countDownSubDiv}>
                        <CountDownClock />
                      </div>
                    </Box>
                  )}
                </div>
                <div className={styles.ontimeLatePunchDiv}>
                  <OnTimeLatePunch />
                </div>
              </div>
              <div className={styles.statusDiv}>
                {isLoading ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      width={555}
                      height={190}
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: "max-content",
                      height: "max-content",
                      backgroundColor: checkTheme ? "#213555" : "white",
                      color: checkTheme ? "white" : "",
                      padding: "5px",
                      borderRadius: "10px",
                      // boxShadow: "5px 5px 5px #bdbdbd",
                    }}
                  >
                    <TimeChart />
                  </Box>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.profileInfo}>
          {/* <Divider orientation="vertical" flexItem className={styles.Divider} /> */}
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
