import React, { useState, useRef } from "react";
import QrScanner from 'react-qr-scanner';

interface QRCodeScannerProps {
  onScan: (data: string | null) => void;
  delay?: number; 
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScan, delay = 300 }) => {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  const handleScan = (data: string | null) => {
    if (data) {
      setScannedData(data);
      onScan(data);
    }
  };

  const handleError = (error: Error) => {
    console.error(error);
  };

  return (
    <div>
      <QrScanner
        ref={(scanner: QrScanner | null) => (scannerRef.current = scanner)}
        delay={delay}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      {scannedData && <p>Scanned Data: {scannedData}</p>}
    </div>
  );
};

export default QRCodeScanner;
