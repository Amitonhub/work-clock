declare module 'react-qr-scanner' {
    interface QrScannerProps {
      delay?: number;
      onError?: (error: Error) => void;
      onScan: (data: string | null) => void;
      style?: React.CSSProperties;
    }
  
    class QrScanner extends React.Component<QrScannerProps> {}
    export default QrScanner;
  }