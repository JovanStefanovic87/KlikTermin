import axios from 'axios'
const API_URL = process.env.API_URL

export const clientRegistration = (clientData, userId) => {
  return axios.post(`${API_URL}/api/clientRegistration`, {
    clientData,
    userId,
  })
}
