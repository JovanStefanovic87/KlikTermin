import axios from 'axios'
const API_URL = process.env.API_URL

export const deleteAppointment = (appointmentId) => {
  return axios.post(`${API_URL}/api/deleteAppointment`, {
    appointmentId,
  })
}
