'use client'
import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import Link from "next/link";
import { ToastError, ToastSuccess } from "@/utils/showToastAlerts";
import styles from './style.module.scss'

interface QrCodeScannerProps {
  setShowQRCodeScanner: React.Dispatch<React.SetStateAction<boolean>>
}

function QrScanner(props: QrCodeScannerProps) {
    const [scanResult, setScanResult] = useState()

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
            aspectRatio: 1.333334,
            showTorchButtonIfSupported: true
        }, false)
        scanner.render(success, error)
    
        function success(result: any) {
            scanner.clear()
            setScanResult(result)
            ToastSuccess('Punched In')
            props.setShowQRCodeScanner(false)
        }
    
        function error(err: any) {
            console.warn(err)
            ToastError('Error in Punched In')
            props.setShowQRCodeScanner(false)
        }
    })

    return <>
    <h3 className={styles.qrHeading}>Scan Qr to Punch In </h3>
    {scanResult
    ? <div>Success: <Link href={`/${scanResult}`}>{scanResult}</Link></div>
    : <div id="reader" className={styles.qrScanner}></div>
    }
    </>;
}

export default QrScanner;
