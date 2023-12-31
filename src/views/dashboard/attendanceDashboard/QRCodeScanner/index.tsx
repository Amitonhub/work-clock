'use client'
import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { ToastError, ToastSuccess } from "@/utils/showToastAlerts";
import styles from './style.module.scss'
import { useAttendanceMutation } from "@/redux/services/attendanceApi";
import { AttendanceTypes } from "@/views/dashboard/types/attendanceType";
import Loader from "@/components/Loader/Loader";
import { useCreateNotificationMutation } from "@/redux/services/notificationApi";
import { useAppSelector } from "@/redux/store";

interface QrCodeScannerProps {
  setShowQRCodeScanner: React.Dispatch<React.SetStateAction<boolean>>
}

function QrScanner(props: QrCodeScannerProps) {
    const user = useAppSelector((state) => state.user.UserData);
    const [attendanceAction, {data, isLoading, isSuccess, isError }] = useAttendanceMutation();
    const [notificationAction] = useCreateNotificationMutation();
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
    
        async function success(result: any) {
            await attendanceAction(AttendanceTypes.punchIn)
            scanner.clear()
            setScanResult(result)
        }
        async function notification() {
            await notificationAction({
                message : `punched-in successfully at ${new Date()}`,
                user_id : user.id,
                starred : false
            })
        }
        if(isSuccess){
            props.setShowQRCodeScanner(false)
            notification()
            ToastSuccess('Punched In')
        }
        if(isError){
            props.setShowQRCodeScanner(false)
            ToastError('You have already punched today.')
        }
        if(isLoading){
            <Loader/>
        }
    
        function error(err: any) {
            console.warn(err)
        }
    }, [isError, isSuccess, attendanceAction, data])

    return <>
    <h3 className={styles.qrHeading}>Scan Qr to Punch In </h3>
    {scanResult
    ? <></>
    : <div id="reader" className={styles.qrScanner}></div>
    }
    </>;
}

export default QrScanner;
