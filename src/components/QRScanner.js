import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import './QRScanner.css';

const QRScanner = ({ onScan, isPaused, showManualInput }) => {
  const [manualInput, setManualInput] = useState('');
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    if (showManualInput) {
      // Stop scanner when manual input is shown
      if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
        html5QrCodeRef.current.stop().catch(err => console.error('Stop error:', err));
      }
      return;
    }

    // Initialize scanner
    const initScanner = async () => {
      try {
        html5QrCodeRef.current = new Html5Qrcode("reader");
        
        const devices = await Html5Qrcode.getCameras();
        if (devices && devices.length) {
          const cameraId = devices[devices.length - 1].id;
          
          await html5QrCodeRef.current.start(
            cameraId,
            {
              fps: 20,
              qrbox: function(viewfinderWidth, viewfinderHeight) {
                let minEdge = Math.min(viewfinderWidth, viewfinderHeight);
                let qrboxSize = Math.floor(minEdge * 0.8);
                return {
                  width: qrboxSize,
                  height: qrboxSize
                };
              },
              aspectRatio: 1.0,
              disableFlip: false
            },
            (decodedText, decodedResult) => {
              if (!isPaused) {
                onScan(decodedText);
              }
            },
            (errorMessage) => {
              // Ignore scan failures
            }
          );
        }
      } catch (err) {
        console.error('Scanner initialization error:', err);
      }
    };

    initScanner();

    return () => {
      if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
        html5QrCodeRef.current.stop().catch(err => console.error('Cleanup error:', err));
      }
    };
  }, [showManualInput]);

  useEffect(() => {
    if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
      if (isPaused) {
        html5QrCodeRef.current.pause();
      } else {
        html5QrCodeRef.current.resume();
      }
    }
  }, [isPaused]);

  const handleManualSubmit = () => {
    if (manualInput.trim()) {
      onScan(manualInput.trim());
      setManualInput('');
    }
  };

  if (showManualInput) {
    return (
      <div className="manual-input-section">
        <label htmlFor="manual-qr">أدخل رمز QR يدوياً:</label>
        <input
          type="text"
          id="manual-qr"
          value={manualInput}
          onChange={(e) => setManualInput(e.target.value)}
          placeholder="مثال: ABCC0743MJ1E0KCP"
          onKeyPress={(e) => e.key === 'Enter' && handleManualSubmit()}
        />
        <button className="button button-primary" onClick={handleManualSubmit}>
          ✅ تحقق من الرمز
        </button>
      </div>
    );
  }

  return (
    <div id="reader" ref={scannerRef}></div>
  );
};

export default QRScanner;
