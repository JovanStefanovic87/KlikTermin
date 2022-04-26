import axios from 'axios'
const API_URL = process.env.API_URL

export const getAllEmployees = (serviceProviderId) => {
  return axios.post(`${API_URL}/api/getAllEmployeesByServiceProvider`, {
    serviceProviderId,
  })
}
