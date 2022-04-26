import axios from 'axios'
const API_URL = process.env.API_URL

export const addNewServiceToMany = (serviceData, token) => {
  return axios.post(`${API_URL}/api/addNewServiceToMany`, {
    token,
    serviceData,
  })
}
