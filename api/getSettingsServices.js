import axios from 'axios';
const API_URL = process.env.API_URL;

export const getSettingsServices = () => {
	return axios.post(`${API_URL}/api/getSettingsServices`);
};
