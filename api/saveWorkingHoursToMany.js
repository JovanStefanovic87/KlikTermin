import axios from 'axios';
const API_URL = process.env.API_URL;

export const saveWorkingHoursToMany = workingHoursData => {
	return axios.post(`${API_URL}/api/saveWorkingHoursToMany`, {
		workingHoursData,
	});
};
