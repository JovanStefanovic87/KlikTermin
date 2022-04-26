import axios from 'axios';
const API_URL = process.env.API_URL;

export const getWorkingHours = (employeeId, selectedMondayFormated) => {
	return axios.post(`${API_URL}/api/getWorkingHours`, {
		employeeId,
		selectedMondayFormated,
	});
};
