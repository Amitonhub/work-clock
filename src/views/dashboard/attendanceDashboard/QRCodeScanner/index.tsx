'use client'
import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import Link from "next/link";

function QrScanner() {
    const [scanResult, setScanResult] = useState()

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
            aspectRatio: 1.00,
            showTorchButtonIfSupported: true
        }, false)
        scanner.render(success, error)
    
        function success(result: any) {
            scanner.clear()
            setScanResult(result)
        }
    
        function error(err: any) {
            console.warn(err)
        }
    }, [])

    return <>
    <h1>Qr Scanner</h1>
    {scanResult
    ? <div>Success: <Link href={`/${scanResult}`}>{scanResult}</Link></div>
    : <div id="reader"></div>
    }
    </>;
}

export default QrScanner;
