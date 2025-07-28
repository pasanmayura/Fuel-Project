import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/vehicle-service/api/vehicles'; 

/**
 * Get user details service
 * @param {*} token - JWT token for authentication
 */
export const getUserDetails = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${API_BASE_URL}/users/me`, config);
  return response.data;
};

/**
 * Get quota details service
 * @param {string} vehicleNumber - The vehicle number of the user
 */
export const getQuotaDetails = async (vehicleNumber, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${API_BASE_URL}/${vehicleNumber}/quota`, config);
  return response.data;
};

/**
 * Get QR code for the vehicle
 * @param {string} vehicleNumber - The vehicle number of the user
 * @param {*} token - JWT token for authentication
 */
export const getQRCode = async (vehicleNumber, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'arraybuffer', // To handle binary data
  };
  try {
    const response = await axios.get(`${API_BASE_URL}/qr/${vehicleNumber}`, config);
    console.log('QR Code Response:', response); // Debugging line to check the response
    const base64Image = btoa(
      new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    return `data:image/png;base64,${base64Image}`;
  } catch (error) {
    console.error('Error fetching QR code:', error);
    throw error;
  }
}