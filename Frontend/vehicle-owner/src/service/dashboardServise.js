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