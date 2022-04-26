import axios from 'axios';
const API_URL = process.env.API_URL;

export const saveServicesToManyEmployees = serviceData => {
	return axios.post(`${API_URL}/api/saveServicesToManyEmployees`, {
		serviceData,
	});
};
