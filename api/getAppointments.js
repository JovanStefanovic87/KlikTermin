import axios from 'axios'
const API_URL = process.env.API_URL

export const getAppointments = (employeeId, dateOfMonday) => {
  return axios.post(`${API_URL}/api/getAppointments`, {
    employeeId,
    dateOfMonday,
  })
}
