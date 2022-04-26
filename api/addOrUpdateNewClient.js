import axios from 'axios'
const API_URL = process.env.API_URL

export const addOrUpdateNewClient = (clientData) => {
  return axios.post(`${API_URL}/api/addOrUpdateNewClient`, {
    clientData,
  })
}
