"use client"
import React from 'react'
import styles from"./dashboard.module.css"
import {AttendanceDashBoard} from '@/views/dashboard/attendanceDashboard'
import Divider from '@mui/material/Divider'
import { RootState, useAppSelector } from '@/redux/store'

const Dashboard = () => {

  return (<div className={styles.mainDiv}>
  <div className={styles.header}>Time & Attendance</div>
  <Divider variant="middle" className={styles.Divider}/>
    {/*  */}
    <AttendanceDashBoard/>
    </div>
  )
}

export default Dashboard