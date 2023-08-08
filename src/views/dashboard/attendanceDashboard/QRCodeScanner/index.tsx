'use client'
import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import Link from "next/link";
import styles from './style.module.scss'
import { ToastError, ToastSuccess } from "@/utils/showToastAlerts";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { getUserLocation } from "@/utils/getUserLocation";
import distanceLimit from "@/utils/distanceLimit";
import { getServerSession } from "@/utils/getServerSession";

interface QrCodeScannerProps {
    setShowQRCodeScanner: React.Dispatch<React.SetStateAction<boolean>>
}

function QrScanner(props: QrCodeScannerProps) {
    const [scanResult, setScanResult] = useState()
    const targetLatitude = 21.183556;
    const targetLongitude = 72.782972;
    const distanceThreshold = 1;

   

    // uncomment if part for the coordinates Validation
    // const distance = distanceLimit(latitude, longitude, targetLatitude, targetLongitude);
    // if (distance >= distanceThreshold) {
    //     console.log("you are in good distance")
    // }else{
    //     console.log('you are out of distance')
    // }

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

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, error);
              } else {
                console.log("Geolocation not supported");
              }
              
              function success(position: any) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
              }
              
              function error() {
                console.log("Unable to retrieve your location");
              }


            const { latitude, longitude } = await getUserLocation();
            console.log(latitude, longitude)
            scanner.clear()
            console.log(result)
            setScanResult(result)
            let globalToken = 'token';
            const getAccessToken = (async () => {
              const res = await getServerSession()
              globalToken = res
              return globalToken
            })
            await getAccessToken()
                try {
                    const response = await axios.post(`${BASE_URL}/attendance`, {
                        "punchType": "punch-in"
                    }, {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${globalToken}`
                        }
                    });
                    const data = response.data;
                    console.log(data)
                    ToastSuccess('Punched In')
                    props.setShowQRCodeScanner(false)
                } catch (err) {
                    ToastError('You have already punched today.')
                    console.log("punch err", err)
                }
            }

        function error(err: any) {
            console.warn(err)
        }
    })

    return <>
        <h1>Qr Scanner</h1>
        {scanResult
            ? props.setShowQRCodeScanner(false)
            : <div id="reader" className={styles.qrScanner}></div>
        }
    </>;
}

export default QrScanner;
