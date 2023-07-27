'use client'
import React from "react";
import styles from './style.module.scss'
import { QrCode } from "../dashboard/attendanceDashboard/qrCode";

function Qr() {
  return <>
    <div className={styles.container}>
      <h1 className={styles.qrHeading}>Scan Qr with Work-Clock</h1>
      <div className={styles.qr}>
        <QrCode />
      </div>
    </div>
  </>;
}

export default Qr;
