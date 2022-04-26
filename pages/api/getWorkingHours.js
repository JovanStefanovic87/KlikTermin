//REFAKTORISANO
import { fetchJson } from '../../api/fetchJson'
import cookie from 'cookie'

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || '')
  const employeeId = req.body.employeeId
  const selectedMondayFormated = req.body.selectedMondayFormated
  const response = await fetchJson(
    `settings/getWorkingHours?employeeId=${employeeId}&dateOfMonday=${selectedMondayFormated}`,
    'get',
    cookies.token,
  )
  res.statusCode = response?.status ? response.status : 200
  res.json(response.data)
}
