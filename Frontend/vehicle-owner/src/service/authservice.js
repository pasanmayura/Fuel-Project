import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/vehicle-service/api/vehicles'; 

/**
 * Login service
 * @param {Object} credentials - The login credentials (username and password)
 * @returns {Promise} - The API response
 */
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error.response?.data || 'An error occurred during login';
  }
};

/**
 * Signup service
 * @param {Object} userData - The signup data
 * @returns {Promise} - The API response
 */
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    console.log('Signup successful:', response); 
    return response.data;
  } catch (error) {
    console.error('Signup failed:', error);
    console.log('Error Response:', error.response);
    throw error.response?.data || 'An error occurred during signup';
  }
};