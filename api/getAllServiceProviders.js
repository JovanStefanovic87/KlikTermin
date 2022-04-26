import axios from 'axios';
const API_URL = process.env.API_URL;

export const getAllServiceProviders = () => {
	return axios.get(`${API_URL}/api/getAllServiceProviders`);
};
