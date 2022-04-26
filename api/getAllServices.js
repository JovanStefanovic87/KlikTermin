import axios from 'axios';
const API_URL = process.env.API_URL;

export const getAllServices = () => {
	return axios.post(`${API_URL}/api/getAllServices`);
};
