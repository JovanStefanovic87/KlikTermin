import axios from 'axios'
const API_URL = process.env.API_URL

export const deleteService = (serviceId) => {
  return axios.post(`${API_URL}/api/deleteService`, {
    serviceId,
  })
}
