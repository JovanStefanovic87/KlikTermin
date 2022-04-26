import axios from 'axios'
const API_URL = process.env.API_URL

export const saveContact = contactData => {
	return axios.post(`${API_URL}/api/saveContact`, {
		contactData,
	})
}
