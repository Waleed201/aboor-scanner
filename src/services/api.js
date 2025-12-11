import axios from 'axios';

// Configure axios defaults
axios.defaults.headers.common['Content-Type'] = 'application/json';

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
