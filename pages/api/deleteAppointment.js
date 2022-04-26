//REFAKTORISANO
import { fetchJson } from '../../api/fetchJson'
import cookie from 'cookie'

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || '')
  const appointmentId = req.body.appointmentId
  const response = await fetchJson(
    `appointments/deleteAppointment?appointmentid=${appointmentId}`,
    'post',
    cookies.token,
  )
  res.statusCode = response?.status ? response.status : 200
  res.json(response.data)
}
