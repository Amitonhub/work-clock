import React from "react";
import styles from "./Logout.module.css";
import LogoutIcon from "@mui/icons-material/Logout";
import Icon from "@mui/material/Icon";
import { useRouter } from "next/navigation";
import { getServerSession } from "@/utils/getServerSession";
import { ToastSuccess } from "@/utils/showToastAlerts";
import axios from "axios";
import { BASE_URL } from "@/constants";

function Logout() {
  const router = useRouter();

  const LogoutButton = async() => {
    try {
      let globalToken = 'token';
      const getAccessToken = (async () => {
        const res = await getServerSession()
        globalToken = res
        return globalToken
      })
      await getAccessToken()
      const response = await axios.get(`${BASE_URL}/users/logout`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${globalToken}`
        }
      });
      const data = response.data;
      ToastSuccess('Logged Out Successfully')
      router.push('/login')
    } catch (err) {
      console.log("logout error", err)
    }
  }
    
  return (
    <>
      <div className={styles.logoutMainDiv}>
        <Icon
          component={LogoutIcon}
          color="inherit"
          onClick={LogoutButton}
          className={styles.logoutIcon}
        />
      </div>
    </>
  );
}

export default Logout;