import axios from 'axios';
const API_URL = process.env.API_URL;

export const getCompanyGuideStatus = () => {
	return axios.post(`${API_URL}/api/getCompanyGuideStatus`);
};
