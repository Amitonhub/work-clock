"use client"
import React from 'react'
import styles from"./dashboard.module.css"
import {AttendanceDashBoard} from '@/views/dashboard/attendanceDashboard'
import Divider from '@mui/material/Divider'
import { RootState, useAppSelector } from '@/redux/store'

const Dashboard = () => {
  // const userData = (useAppSelector((state) => state.authReducer.userInfo))   // trial for redux selector

  return (<div className={styles.mainDiv}>
    {/* <h1>{userData?.email}</h1> */}
  <div className={styles.header}>Time & Attendance</div>
  <Divider variant="middle" className={styles.Divider}/>
    {/*  */}
    <AttendanceDashBoard/>
    </div>
  )
}

export default Dashboard