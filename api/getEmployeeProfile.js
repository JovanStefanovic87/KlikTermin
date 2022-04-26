import axios from 'axios';

export const getEmployeeProfile = () => {
	return axios.post('http://localhost:3000/api/getEmployeeProfile');
};