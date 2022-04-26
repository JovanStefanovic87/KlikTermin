import axios from 'axios'
const API_URL = process.env.API_URL

export const addNewService = (serviceData, employee) => {
  return axios.post(`${API_URL}/api/addNewService`, {
    employee,
    serviceData,
  })
}
