import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/station-service/api/employees';

export const registerEmployee = async (employeeData) => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    throw new Error('User is not authenticated');
  }

  // Decode the JWT token to extract stationId
  const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
  const stationId = payload.stationId;

  // Include stationId in the request payload
  const data = {
    ...employeeData,
    stationId,
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Send the POST request to register the employee
  const response = await axios.post(`${API_BASE_URL}/register`, data, config);
  return response.data;
};