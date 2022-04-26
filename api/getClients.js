import axios from 'axios'
const API_URL = process.env.API_URL

export const getClients = (deleted) => {
  return axios.post(`${API_URL}/api/getClients`, {
    deleted,
  })
}
