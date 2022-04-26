import axios from 'axios';
const API_URL = process.env.API_URL;

export const addNewEmployee = (token, employeeData, serviceProviderId) => {
	return axios.post(`${API_URL}/api/addNewEmployee`, {
		token,
		employeeData,
		serviceProviderId,
	});
};
