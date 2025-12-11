import axios from 'axios';

export const switchQR = async (qrCode, apiUrl) => {
  try {
    const response = await axios.post(`${apiUrl}/api/tickets/switch-qr`, {
      qrCode
    });
    return response.data;
  } catch (error) {
    console.error('Switch QR Error:', error);
    throw error;
  }
};

export const verifySecondaryQR = async (qrCode, apiUrl) => {
  try {
    const response = await axios.post(`${apiUrl}/api/tickets/verify-secondary-qr`, {
      qrCode
    });
    return response.data;
  } catch (error) {
    console.error('Verify Secondary QR Error:', error);
    throw error;
  }
};
