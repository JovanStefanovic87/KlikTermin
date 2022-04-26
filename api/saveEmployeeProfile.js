import axios from 'axios';

export const saveEmployeeProfile = userData => {
	return axios.post('http://localhost:3000/api/saveEmployeeProfile', {
		userData,
	});
};
