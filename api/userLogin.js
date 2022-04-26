import axios from 'axios'
const API_URL = process.env.API_URL

export const userLogin = (userData) => {
  return axios.post(`${API_URL}/api/login`, {
    userData,
  })
}
