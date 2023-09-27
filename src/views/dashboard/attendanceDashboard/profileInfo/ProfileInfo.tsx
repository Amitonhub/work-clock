"use client";
import { ReactNode, useEffect, useState } from "react";
import styles from "./profileInfo.module.scss";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { IUserType } from "../../types/userType";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { useUserInfoQuery } from "@/redux/services/authApi";
import { useAppSelector } from "@/redux/store";
import Loader from "@/components/Loader/Loader";
import { useDispatch } from "react-redux";
import { userData } from "@/redux/features/userSlice";
import Image from "next/image";

function ProfileInfo() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeCount, setActiveCount] = useState<ReactNode>(234)
  const [inactiveCount, setInactiveCount] = useState<ReactNode>(35)
  const [overtimeCount, setOvertimeCount] = useState<ReactNode>(4)
  const user = useAppSelector((state) => state.user.UserData);
  const dispatch = useDispatch();
  const {
    isLoading: isUserInfoLoading,
    isFetching,
    data,
    isSuccess,
  } = useUserInfoQuery(null);
  const [duration, setDuration] = useState("1");
  const checkTheme = useAppSelector((state) => state.theme.darkMode)

  const dropdownOptions = [
    { value: "1", label: "Week" },
    { value: "2", label: "Month" },
    { value: "3", label: "Quaterly" },
  ];
  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as string;
    setDuration(selectedValue);
  
    if (selectedValue === "1") {
      setActiveCount(234);
      setInactiveCount(35);
      setOvertimeCount(4);
    } else if (selectedValue === "2") {
      setActiveCount(1757);
      setInactiveCount(67);
      setOvertimeCount(90);
    } else if (selectedValue === "3") {
      setActiveCount(6134);
      setInactiveCount(453);
      setOvertimeCount(120);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(userData(data as unknown as IUserType));
    }
    if (isUserInfoLoading || isFetching) {
      <Loader />;
    }
  }, [data]);

  const name = user && user?.firstname + " " + user.lastname;
  const designation = user && user?.designation;

  const getInitials = (name: string) => {
    const nameArray = name.split(" ");
    const initials = nameArray.map((name) => name[0]);
    return initials.join("");
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
    <div className={`${styles.container} ${checkTheme ? styles.darkContainer : ""}`}>
      <div className={styles.profileInfo}>
        <div className={styles.avatar}>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <Skeleton variant="circular" width={80} height={80} />
            </Box>
          ) : (
            <Avatar sx={{ width: 80, height: 80, fontSize: 40 }}>
              {name && getInitials(name)}
            </Avatar>
          )}
        </div>
        <div className={styles.info}>
          {isLoading ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  justifyContent: "center",
                }}
              >
                <Skeleton variant="rounded" width={180} height={40} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Skeleton variant="rounded" width={100} height={20} />
              </Box>
            </>
          ) : (
            <>
              <h1 className={styles.name}>{name}</h1>
              <p className={styles.designation}>{designation}</p>
            </>
          )}
        </div>
      </div>
      <Divider variant="middle" className={styles.Divider} />
      <div className={styles.timeStatusMainDiv}>
        <div className={styles.profileInfoHeaderMain}>
          <h4 className={styles.timestatusHeading}>Time Status</h4>
          <div className={styles.dropdownMenuDiv}>
            <FormControl variant="standard" fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={duration}
                label="Duration"
                onChange={handleChange}
                color="secondary"
                style={{color: checkTheme ? "white" : ""}}
              >
                {dropdownOptions.map((option) => (
                  <MenuItem className={styles.menuItems} key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        {/* date slot */}
        <div className={styles.timeStatusSubMaindiv}>
          <div className={styles.timeStatusActivityDiv}>
            <div className={styles.activeStatus}>
              <div className={styles.timeStatusHeading}>
                <span
                  className={styles.coloredCircle}
                  style={{ backgroundColor: "#F8C07F" }}
                />
                <p className={styles.paragraphMain}>Active</p>
              </div>
              <h5 className={styles.statusHeadingDiv}>{activeCount}</h5>
            </div>
            <div className={styles.inactiveStatus}>
              <div className={styles.timeStatusHeading}>
                <span
                  className={styles.coloredCircle}
                  style={{ backgroundColor: "#FB896B" }}
                />
                <p className={styles.paragraphMain}>Inactive</p>
              </div>
              <h5 className={styles.statusHeadingDiv}>{inactiveCount}</h5>
            </div>
            <div className={styles.overTimeStatus}>
              <div className={styles.timeStatusHeading}>
                <span
                  className={styles.coloredCircle}
                  style={{ backgroundColor: "#6956E5" }}
                />
                <p className={styles.paragraphMain}>OverTime</p>
              </div>
              <h5 className={styles.statusHeadingDiv}>{overtimeCount}</h5>
            </div>
          </div>
          <div className={styles.timeStatusImageDiv}>
            <Image
              src="/status.png"
              width={215}
              height={215}
              alt="Time Status"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
