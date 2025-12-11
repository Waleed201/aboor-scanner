import React, { useState, useEffect } from 'react';
import './App.css';
import QRScanner from './components/QRScanner';
import StatusCard from './components/StatusCard';
import TicketInfo from './components/TicketInfo';
import StepIndicator from './components/StepIndicator';
import ConfigSection from './components/ConfigSection';
import { switchQR, verifySecondaryQR } from './services/api';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [scannedQR1, setScannedQR1] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [status, setStatus] = useState({ show: false, type: '', icon: '', message: '', details: '' });
  const [instruction, setInstruction] = useState('📱 اطلب من المستخدم إظهار رمز التذكرة');
  const [countdown, setCountdown] = useState(null);
  const [scannedQRCode, setScannedQRCode] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [apiUrl, setApiUrl] = useState(process.env.REACT_APP_API_URL || 'https://aboor-backend.onrender.com');

  const showStatus = (type, icon, message, details) => {
    setStatus({ show: true, type, icon, message, details });
  };

  const handleFirstScan = async (qrCode) => {
    setCurrentStep(1);
    showStatus('waiting', '⏳', 'جاري التحقق من الرمز الأول...', '');
    
    // Extract QR code from JSON if needed
    let qrString = qrCode;
    try {
      const parsed = JSON.parse(qrCode);
      if (parsed.qrCode) {
        qrString = parsed.qrCode;
      }
    } catch (e) {
      // Not JSON, use as is
    }
    
    setScannedQR1(qrString);
    
    try {
      const result = await switchQR(qrString, apiUrl);
      
      if (result.success) {
        setTicketData(result.data);
        showStatus('success', '✅', 'تم التحقق من الرمز الأول!', 'انتظر تحديث التطبيق...');
        setCurrentStep(2);
        startCountdown();
      } else {
        showStatus('error', '❌', 'فشل التحقق', result.message || 'رمز غير صالح');
        setTimeout(() => {
          setIsPaused(false);
        }, 3000);
      }
    } catch (error) {
      console.error('API Error:', error);
      const errorMessage = error.message || 'تأكد من تشغيل الخادم';
      showStatus('error', '❌', 'خطأ في الاتصال', errorMessage);
      setTimeout(() => {
        setIsPaused(false);
      }, 3000);
    }
  };

  const startCountdown = () => {
    setInstruction('⏳ انتظر تحديث التطبيق ثم اطلب الرمز الجديد');
    
    let count = 3;
    setCountdown(count);
    
    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(interval);
        setCountdown(null);
        setInstruction('👉 اطلب من المستخدم إظهار الرمز الجديد (QR Code 2)');
        setCurrentStep(3);
        showStatus('waiting', '📱', 'جاهز للمسح الثاني', 'اطلب إظهار الرمز الجديد');
        setIsPaused(false);
      }
    }, 1000);
  };

  const handleSecondScan = async (qrCode) => {
    setCurrentStep(3);
    showStatus('waiting', '⏳', 'جاري التحقق من الرمز الثاني...', '');
    
    // Extract QR code from JSON if needed
    let qrString = qrCode;
    try {
      const parsed = JSON.parse(qrCode);
      if (parsed.qrCode) {
        qrString = parsed.qrCode;
      }
    } catch (e) {
      // Not JSON, use as is
    }
    
    // Check if same as first QR (screenshot detection!)
    if (qrString === scannedQR1) {
      showStatus('error', '🚨', 'احتيال! لقطة شاشة محتملة', 'الرمز لم يتغير - تنبيه الأمن');
      return;
    }
    
    try {
      const result = await verifySecondaryQR(qrString, apiUrl);
      
      if (result.success) {
        showStatus('success', '🎉', 'تم السماح بالدخول!', `مرحباً ${result.data.user?.name || 'بك'}`);
        setTicketData(prev => ({ ...prev, ...result.data }));
        setInstruction('✅ تم التحقق بنجاح - يمكن للمستخدم الدخول');
      } else {
        showStatus('error', '❌', 'فشل التحقق', result.message || 'رمز غير صالح');
      }
    } catch (error) {
      console.error('API Error:', error);
      const errorMessage = error.message || 'تأكد من تشغيل الخادم';
      showStatus('error', '❌', 'خطأ في الاتصال', errorMessage);
    }
  };

  const handleScan = (qrCode) => {
    setScannedQRCode(qrCode);
    setIsPaused(true);
    
    if (currentStep === 1) {
      handleFirstScan(qrCode);
    } else if (currentStep === 3) {
      handleSecondScan(qrCode);
    }
  };

  const resetScanner = () => {
    setCurrentStep(1);
    setScannedQR1(null);
    setTicketData(null);
    setStatus({ show: false, type: '', icon: '', message: '', details: '' });
    setInstruction('📱 اطلب من المستخدم إظهار رمز التذكرة');
    setCountdown(null);
    setScannedQRCode('');
    setIsPaused(false);
  };

  const toggleManualInput = () => {
    setShowManualInput(!showManualInput);
    setIsPaused(!showManualInput);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>🎫 Aboor Scanner</h1>
        <p className="subtitle">نظام التحقق من التذاكر - Anti-Screenshot Security</p>
      </div>

      <ConfigSection apiUrl={apiUrl} setApiUrl={setApiUrl} />

      <StepIndicator currentStep={currentStep} />

      <div className="instruction">{instruction}</div>

      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <button 
          className="button button-secondary" 
          onClick={toggleManualInput}
          style={{ padding: '10px 20px', fontSize: '14px' }}
        >
          {showManualInput ? '📷 استخدام الكاميرا' : '⌨️ إدخال يدوي'}
        </button>
      </div>

      <QRScanner 
        onScan={handleScan}
        isPaused={isPaused}
        showManualInput={showManualInput}
      />

      <div className="scanning-tips">
        <h4>💡 نصائح للمسح الناجح:</h4>
        <ul>
          <li>أمسك الهاتف بثبات على بعد 15-30 سم</li>
          <li>تأكد من وجود إضاءة كافية</li>
          <li>اجعل الرمز داخل المربع بالكامل</li>
          <li>انتظر ثانية واحدة للتركيز التلقائي</li>
          <li>إذا فشل المسح، استخدم الإدخال اليدوي</li>
        </ul>
      </div>

      <StatusCard status={status} />

      {countdown !== null && (
        <div className="countdown">{countdown}</div>
      )}

      {scannedQRCode && (
        <div className="qr-display">{scannedQRCode}</div>
      )}

      <TicketInfo ticketData={ticketData} />

      {(status.type === 'success' || status.type === 'error') && currentStep === 3 && (
        <button className="button button-secondary" onClick={resetScanner}>
          🔄 فحص تذكرة جديدة
        </button>
      )}
    </div>
  );
}

export default App;
