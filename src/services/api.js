import axios from 'axios';

// Configure axios defaults
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Helper function to detect QR code type based on prefix
export const detectQRType = (qrCode) => {
  if (!qrCode || typeof qrCode !== 'string') {
    return null;
  }
  
  // QR Code 1 starts with '1', QR Code 2 starts with '2'
  if (qrCode.startsWith('1')) {
    return 'qr1';
  } else if (qrCode.startsWith('2')) {
    return 'qr2';
  }
  
  return null; // Unknown type
};

// NEW: Verify QR Code 1 specifically
export const verifyQR1 = async (qrCode, apiUrl) => {
  try {
    console.log('✅ Verifying QR Code 1:', { qrCode, apiUrl });
    
    const response = await axios.post(
      `${apiUrl}/api/tickets/verify-qr1`, 
      { qrCode },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }
    );
    
    console.log('✅ Verify QR1 Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Verify QR1 Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      qrCode: qrCode
    });
    
    if (error.response?.data) {
      throw new Error(error.response.data.message || error.response.data.error || 'Failed to verify QR Code 1');
    }
    throw error;
  }
};

// NEW: Verify QR Code 2 specifically
export const verifyQR2 = async (qrCode, apiUrl) => {
  try {
    console.log('✅ Verifying QR Code 2:', { qrCode, apiUrl });
    
    const response = await axios.post(
      `${apiUrl}/api/tickets/verify-qr2`, 
      { qrCode },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }
    );
    
    console.log('✅ Verify QR2 Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Verify QR2 Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      qrCode: qrCode
    });
    
    if (error.response?.data) {
      throw new Error(error.response.data.message || error.response.data.error || 'Failed to verify QR Code 2');
    }
    throw error;
  }
};

// LEGACY: Switch QR (accepts both codes)
export const switchQR = async (qrCode, apiUrl) => {
  try {
    console.log('🔄 Switching QR Code:', { qrCode, apiUrl });
    
    const response = await axios.post(
      `${apiUrl}/api/tickets/switch-qr`, 
      { qrCode },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      }
    );
    
    console.log('✅ Switch QR Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Switch QR Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      qrCode: qrCode
    });
    
    // Return more user-friendly error
    if (error.response?.data) {
      throw new Error(error.response.data.message || error.response.data.error || 'Failed to verify QR code');
    }
    throw error;
  }
};

// LEGACY: Verify Secondary QR (accepts both codes)
export const verifySecondaryQR = async (qrCode, apiUrl) => {
  try {
    console.log('🔍 Verifying Secondary QR Code:', { qrCode, apiUrl });
    
    const response = await axios.post(
      `${apiUrl}/api/tickets/verify-secondary-qr`, 
      { qrCode },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      }
    );
    
    console.log('✅ Verify Secondary QR Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Verify Secondary QR Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      qrCode: qrCode
    });
    
    // Return more user-friendly error
    if (error.response?.data) {
      throw new Error(error.response.data.message || error.response.data.error || 'Failed to verify secondary QR code');
    }
    throw error;
  }
};
