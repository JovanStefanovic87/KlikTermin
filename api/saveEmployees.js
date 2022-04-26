import axios from 'axios';
const API_URL = process.env.API_URL;

export const saveEmployees = userData => {
	return axios.post(`${API_URL}/api/saveEmployees`, {
		userData,
	});
};
