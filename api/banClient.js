import axios from 'axios'
const API_URL = process.env.API_URL

export const banClient = (clientId) => {
  return axios.post(`${API_URL}/api/banClient`, {
    clientId,
  })
}
