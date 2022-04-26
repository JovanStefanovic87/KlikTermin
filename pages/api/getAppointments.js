import { fetchJson } from '../../api/fetchJson'
import cookie from 'cookie'

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || '')
  const dateOfMonday = req.body.dateOfMonday
  const employeeId = req.body.employeeId
  const response = await fetchJson(
    `appointments/getAppointments?employeeId=${employeeId}&dateOfMonday=${dateOfMonday}`,
    'get',
    cookies.token,
  )
  res.statusCode = response?.status ? response.status : 200
  res.json(response.data)
}
