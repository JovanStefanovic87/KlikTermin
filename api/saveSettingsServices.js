import axios from 'axios';
const API_URL = process.env.API_URL;

export const saveSettingsServices = settingsData => {
	return axios.post(`${API_URL}/api/saveSettingsServices`, {
		settingsData,
	});
};
