import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/station-service/api/stations'; 

// Get user details
export const getUserDetails = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(`${API_BASE_URL}/users/me`, config);
    return response.data;
};