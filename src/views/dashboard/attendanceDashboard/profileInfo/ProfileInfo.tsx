"use client";
import { useEffect, useState } from "react";
import styles from "./profileInfo.module.css";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Icon } from "@mui/material";
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
  const user = useAppSelector((state)=> state.user.UserData)
  const dispatch = useDispatch()
  const { isLoading: isUserInfoLoading, isFetching, data, error, isSuccess } = useUserInfoQuery(null);
  
  useEffect(() => {
    if(isSuccess){
      dispatch(userData(data as unknown as IUserType))
    }
    if(isUserInfoLoading || isFetching){
      <Loader/>
    }
    
  }, [data])

  const name = user && user?.firstname + ' ' + user.lastname;
  const designation = user && user?.designation;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    });
    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.profileInfo}>
        <div className={styles.avatar}>
        {isLoading ? (
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "5px"}}>
            <Skeleton variant="circular" width={80} height={80} />
          </Box>
          ) : (
          <Avatar sx={{ width: 80, height: 80, fontSize: 40 }}>
            {name && name[0]}
          </Avatar>
        )}
        </div> 
        <div className={styles.info}>
        {isLoading ? (
          <>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px", justifyContent: "center" }}>
            <Skeleton variant="rectangular" width={180} height={40}/>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center"  }}>
          <Skeleton variant="rectangular" width={100} height={20}/>
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
        <h4 className={styles.timestatusHeading}>Time Status</h4>
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
              <h5 className={styles.statusHeadingDiv}>234</h5>
            </div>
            <div className={styles.inactiveStatus}>
              <div className={styles.timeStatusHeading}>
                <span
                  className={styles.coloredCircle}
                  style={{ backgroundColor: "#FB896B" }}
                />
                <p className={styles.paragraphMain}>Inactive</p>
              </div>
              <h5 className={styles.statusHeadingDiv}>35</h5>
            </div>
            <div className={styles.overTimeStatus}>
              <div className={styles.timeStatusHeading}>
                <span
                  className={styles.coloredCircle}
                  style={{ backgroundColor: "#6956E5" }}
                />
                <p className={styles.paragraphMain}>OverTime</p>
              </div>
              <h5 className={styles.statusHeadingDiv}>4</h5>
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
      {/* <div className={styles.timeInfo}>
      {isLoading ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: "30px" }}>
            <Skeleton variant="circular" width={36} height={36} />
            <Skeleton variant="rectangular" width={250} height={45} />
          </Box>
          ) : (
          <>
            <strong className={styles.timeInfoHeaderMain}>
              <Icon 
              component={AccessTimeIcon}
              fontSize="large"
              color="inherit"/>
              &nbsp; &nbsp; &nbsp;{" "}
              <span className={styles.timeInfoHeader}>180.00 Total Hrs </span>
            </strong>
          </>
        )}
      </div>
      <div className={styles.timeInfoSubMain}>
      {isLoading ? (
          <Box sx={{ display: "flex", alignItems: "center", gap : "150px"}}>
            <Skeleton variant="rectangular" width={75} height={60} />
            <Skeleton variant="rectangular" width={75} height={60} />
          </Box>
          ) : (
          <>
            <div className={styles.timeInfoSub}>
              <span className={styles.timeInfoSubHead}>40 Hrs</span>
              <span className={styles.timeInfoSubInterval}>Regular </span>
            </div>
            <div className={styles.timeInfoSub}>
              <span className={styles.timeInfoSubHead}>10 Hrs</span>
              <span className={styles.timeInfoSubInterval}>OverTime </span>
            </div>
          </>
        )}
      </div>
      <div className={styles.timeInfoSubMain}>
      {isLoading ? (
          <Box sx={{ display: "flex", alignItems: "center", gap : "150px"}}>
            <Skeleton variant="rectangular" width={75} height={60} />
            <Skeleton variant="rectangular" width={75} height={60} />
          </Box>
          ) : (
          <>
            <div className={styles.timeInfoSub}>
              <span className={styles.timeInfoSubHead}>04 Hrs</span>
              <span className={styles.timeInfoSubInterval}>Holiday </span>
            </div>
            <div className={styles.timeInfoSub}>
              <span className={styles.timeInfoSubHead}>10 Hrs</span>
              <span className={styles.timeInfoSubInterval}>PTO </span>
            </div>
          </>
        )}
      </div> */}
    </div>
  );
}

export default ProfileInfo;
