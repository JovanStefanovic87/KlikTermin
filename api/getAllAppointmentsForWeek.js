import axios from 'axios'
const API_URL = process.env.API_URL

export const getAllAppointmentsForWeek = (dateOfMonday) => {
  return axios.post(`${API_URL}/api/getAppointments`, {
    dateOfMonday,
  })
}
